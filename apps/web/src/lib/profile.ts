import type { Profile, ProfilePictureSet } from "@lens-protocol/react-web";
import { resolveImageUrl } from "./resolve-image-url";

export const getProfileAvatarUrl = (
  profile: Profile,
  /**
   * The type of image to get. If not available, will fallback to raw.
   * Defaults to "optimized".
   */
  type: "optimized" | "thumbnail" | "raw" = "optimized",
): string => {
  const profileMetadata = profile.metadata;
  let profileAvatar: string | undefined;
  if (profileMetadata?.picture?.__typename === "ImageSet") {
    profileAvatar = resolveProfilePictureSet(profileMetadata.picture, type);
  } else if (profileMetadata?.picture?.__typename === "NftImage") {
    profileAvatar = resolveProfilePictureSet(
      profileMetadata.picture.image,
      type,
    );
  }
  if (profileAvatar) {
    profileAvatar = resolveImageUrl(profileAvatar);
  } else {
    profileAvatar = getBoringAvatarUrl(profile.id, type);
  }
  return profileAvatar;
};

const resolveProfilePictureSet = (
  profilePictureSet: ProfilePictureSet,
  type: "optimized" | "thumbnail" | "raw",
): string => {
  let profileAvatar: string;
  if (type === "optimized") {
    profileAvatar =
      profilePictureSet.optimized?.uri || profilePictureSet.raw.uri;
  } else if (type === "thumbnail") {
    profileAvatar =
      profilePictureSet.thumbnail?.uri ||
      profilePictureSet.optimized?.uri ||
      profilePictureSet.raw.uri;
  } else {
    profileAvatar = profilePictureSet.raw.uri;
  }
  return profileAvatar;
};

export const getProfileCoverUrl = (
  profile: Profile,
  /**
   * The type of image to get. If not available, will fallback to raw.
   * Defaults to "optimized".
   */ type: "optimized" | "raw" = "optimized",
): string => {
  const profileMetadata = profile.metadata;
  let profileCover: string | undefined;
  if (profileMetadata?.coverPicture?.__typename === "ImageSet") {
    if (type === "optimized") {
      profileCover = profileMetadata.coverPicture.optimized?.uri;
    } else if (type === "raw") {
      profileCover = profileMetadata.coverPicture.raw.uri;
    }
  }
  if (profileCover) {
    profileCover = resolveImageUrl(profileCover);
  } else {
    throw new Error("Profile cover not found");
  }
  return profileCover;
};

// TODO replace with Lens avatar
export const getBoringAvatarUrl = (
  text: string,
  type: "optimized" | "thumbnail" | "raw" = "optimized",
): string => {
  const size = type === "thumbnail" ? 40 : 120;
  return `https://source.boringavatars.com/marble/${size}/${text}?square&colors=6558FF,FF6E3C,B9F3DE,D0C9FF,FFDAAE`;
};

export const getProfileHandle = (profile: Profile): string => {
  return profile.handle
    ? `${profile.handle.namespace}/${profile.handle.localName}`
    : profile.id;
};
