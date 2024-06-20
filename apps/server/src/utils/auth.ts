import { eq } from "drizzle-orm";
import type { H3Event } from "h3";
import * as jose from "jose";
import { db } from "~/db/db";
import { profiles, users } from "~/db/schema";
import { env } from "~/env";
import { lensClient } from "~/lib/lens";

interface LensJwtPayload {
  id?: string;
  evmAddress?: string;
  role?: "profile_identity";
}

/**
 * Validates the Lens token and returns the EVM address and Lens ID.
 */
export const validateLensToken = async (identityToken: string) => {
  const isTokenValid = await lensClient.authentication.verify({
    identityToken,
  });
  if (!isTokenValid) {
    throw createError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const decoded = jose.decodeJwt<LensJwtPayload>(identityToken);
  if (
    !decoded.id ||
    !decoded.evmAddress ||
    decoded.role !== "profile_identity"
  ) {
    throw createError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const evmAddress = decoded.evmAddress.toLowerCase();
  const lensId = decoded.id;

  return { evmAddress, lensId };
};

/**
 * Stores the user and profile data in the database if they don't already exist.
 */
export const createUserData = async (
  event: H3Event,
  {
    evmAddress,
    lensId,
  }: {
    evmAddress: string;
    lensId: string;
  },
) => {
  // Get or create the user and linked profile.
  const [user, profile] = await Promise.all([
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
        whitelisted: profiles.whitelisted,
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
        // Always whitelist profiles in development
        whitelisted: env.NODE_ENV === "development",
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

  return { user, profile };
};
