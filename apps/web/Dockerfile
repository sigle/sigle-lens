ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base

ENV APP_NAME="web"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV DO_NOT_TRACK 1
RUN corepack enable pnpm
RUN pnpm install turbo --global


FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=@sigle/$APP_NAME --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=@sigle/$APP_NAME...


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer /app/apps/$APP_NAME/next.config.mjs .
COPY --from=installer /app/apps/$APP_NAME/package.json .
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/static ./apps/$APP_NAME/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/$APP_NAME/public ./apps/$APP_NAME/public

USER nextjs

CMD node apps/$APP_NAME/server.js
