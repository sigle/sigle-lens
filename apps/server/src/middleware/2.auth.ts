import { createUserData, validateLensToken } from "~/utils/auth";

export interface AuthenticatedUser {
  userId: string;
  profileId: string;
}

interface LensCacheToken {
  evmAddress: string;
  lensId: string;
  whitelisted: boolean;
  date: number;
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

  const identityToken = event.headers
    .get("authorization")
    ?.replace("Bearer ", "");

  if (!identityToken) {
    throw createError({
      status: 401,
      message: "Unauthorized",
    });
  }

  let evmAddress: string;
  let lensId: string;
  let whitelisted: boolean;
  let cachedData =
    await useStorage("lens").getItem<LensCacheToken>(identityToken);

  // Clear the cache after 10 minutes
  if (cachedData && Date.now() - cachedData.date > 600000) {
    await useStorage("lens").removeItem(identityToken);
    cachedData = null;
  }

  if (cachedData) {
    evmAddress = cachedData.evmAddress;
    lensId = cachedData.lensId;
    whitelisted = cachedData.whitelisted;
  } else {
    const data = await validateLensToken(identityToken);
    evmAddress = data.evmAddress;
    lensId = data.lensId;

    const { profile } = await createUserData(event, {
      evmAddress,
      lensId,
    });
    whitelisted = profile.whitelisted;

    await useStorage("lens").setItem<LensCacheToken>(identityToken, {
      evmAddress,
      lensId,
      whitelisted: profile.whitelisted,
      date: Date.now(),
    });
  }

  /**
   * Only allows requests from whitelisted profiles.
   * Allow all requests to the /api/profile endpoint so the profile can be fetched.
   */
  if (event.path !== "/api/profile" && !whitelisted) {
    throw createError({
      status: 401,
      message: "Profile is not whitelisted",
    });
  }

  // Inject the user id so it can be used in subsequent requests.
  event.context.user = {
    userId: evmAddress,
    profileId: lensId,
  } satisfies AuthenticatedUser;
});
