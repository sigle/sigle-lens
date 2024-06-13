ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base

ENV APP_NAME="server"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm
RUN pnpm install turbo --global

FROM base AS builder
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=@sigle/$APP_NAME --docker

# Get the required runtime dependencies
FROM base AS prod-deps
WORKDIR /app
COPY --from=builder /app/out/full/ .
RUN cat package.json
WORKDIR /app/apps/$APP_NAME
RUN node scripts/docker-runtime-deps.mjs
RUN pnpm install --prod
run ls -la

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat python3 g++ make
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./patches ./patches
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=@sigle/$APP_NAME...


FROM base AS runner
WORKDIR /app/apps/$APP_NAME

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro

# Copy the built project
COPY --from=prod-deps /app/node_modules ../../node_modules
COPY --from=prod-deps /app/apps/$APP_NAME/node_modules ./node_modules
COPY --from=installer --chown=nitro:nodejs /app/apps/$APP_NAME/.output ./.output
COPY --from=installer --chown=nitro:nodejs /app/apps/$APP_NAME/package.json ./package.json
COPY ./apps/$APP_NAME/.env.testnet ./.env.testnet
COPY ./apps/$APP_NAME/migrations ./migrations
COPY ./apps/$APP_NAME/scripts ./scripts

USER nitro

CMD pnpm dotenvx run -- node ./scripts/drizzle-migrate.mjs && pnpm dotenvx run -- node .output/server/index.mjs
