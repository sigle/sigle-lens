import { eq } from "drizzle-orm";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import { db } from "~/db/db";
import { profiles, users } from "~/db/schema";
import { lensClient } from "~/lib/lens";

interface LensJwtPayload extends JwtPayload {
  id?: string;
  evmAddress?: string;
}

export interface AuthenticatedUser {
  userId: string;
  profileId: string;
}

/**
 * Requires a valid Lens JWT token to be present in the Authorization header.
 * The token is verified against the Lens authentication service.
 * The address and lens profile id are extracted from the token and injected into the event context.
 */
export default defineEventHandler(async (event) => {
  // Only apply middleware for /api/** routes
  if (!event.path.startsWith("/api")) {
    return;
  }

  const accessToken = event.headers
    .get("authorization")
    ?.replace("Bearer ", "");

  if (!accessToken) {
    throw createError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const isTokenValid = await lensClient.authentication.verify(accessToken);
  if (!isTokenValid) {
    throw createError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const decoded = jwtDecode<LensJwtPayload>(accessToken);
  if (!decoded.id || !decoded.evmAddress) {
    throw createError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const evmAddress = decoded.evmAddress.toLowerCase();
  const lensId = decoded.id;

  // Get or create the user and linked profile.
  let [user, profile] = await Promise.all([
    db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.id, evmAddress))
      .then((rows) => rows[0]),
    db
      .select({
        id: profiles.id,
      })
      .from(profiles)
      .where(eq(profiles.id, lensId))
      .then((rows) => rows[0]),
  ]);

  if (!user) {
    const insertedUsers = await db
      .insert(users)
      .values({
        id: evmAddress,
      })
      .returning();

    event.context.$posthog.capture({
      distinctId: insertedUsers[0].id,
      event: "user created",
      properties: {
        address: evmAddress,
      },
    });
  }

  if (!profile) {
    const insertedProfiles = await db
      .insert(profiles)
      .values({
        id: lensId,
      })
      .returning();

    event.context.$posthog.capture({
      distinctId: insertedProfiles[0].id,
      event: "profile created",
      properties: {
        lensId: lensId,
      },
    });
  }

  // Inject the user id so it can be used in subsequent requests.
  event.context.user = {
    userId: evmAddress,
    profileId: lensId,
  } satisfies AuthenticatedUser;
});
