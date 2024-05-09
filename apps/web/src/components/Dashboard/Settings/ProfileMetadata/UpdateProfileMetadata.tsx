import { zodResolver } from "@hookform/resolvers/zod";
import { Profile, useSetProfileMetadata } from "@lens-protocol/react-web";
import { Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  MetadataAttribute,
  MetadataAttributeType,
  profile as profileMetadata,
} from "@lens-protocol/metadata";
import { IconBrandX } from "@tabler/icons-react";
import { toast } from "sonner";
import { useProfileServicePostApiProfileUploadMetadata } from "@/__generated__/opanapi/queries";
import { UploadProfilePicture } from "./UploadProfilePicture";

const updateProfileMetadataSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  x: z.string().optional(),
  picture: z.string().optional(),
  coverPicture: z.string().optional(),
});

type UpdateProfileMetadataFormData = z.infer<
  typeof updateProfileMetadataSchema
>;

interface UpdateProfileMetadataProps {
  profile: Profile;
  setEditingProfileMetadata: (editing: boolean) => void;
}

export const UpdateProfileMetadata = ({
  profile,
  setEditingProfileMetadata,
}: UpdateProfileMetadataProps) => {
  const { mutateAsync: uploadMetadata } =
    useProfileServicePostApiProfileUploadMetadata({
      onError: (error: { message: string }) => {
        toast.error("Failed to upload metadata", {
          description: error.message,
        });
      },
    });
  const { execute: updateProfileMetadata } = useSetProfileMetadata();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileMetadataFormData>({
    resolver: zodResolver(updateProfileMetadataSchema),
    values: {
      name: profile.metadata?.displayName || undefined,
      bio: profile.metadata?.bio || undefined,
      picture:
        (profile.metadata?.picture?.__typename === "ImageSet" &&
          profile.metadata.picture.raw.uri) ||
        undefined,
      coverPicture:
        (profile.metadata?.coverPicture?.__typename === "ImageSet" &&
          profile.metadata.coverPicture.raw.uri) ||
        undefined,
      website:
        profile.metadata?.attributes?.find(
          (attribute) => attribute.key === "website"
        )?.value || undefined,
      x:
        profile.metadata?.attributes?.find((attribute) => attribute.key === "x")
          ?.value || undefined,
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    const attributes: MetadataAttribute[] = [];
    if (formValues.website) {
      attributes.push({
        type: MetadataAttributeType.STRING,
        key: "website",
        value: formValues.website,
      });
    }
    if (formValues.x) {
      attributes.push({
        type: MetadataAttributeType.STRING,
        key: "x",
        value: formValues.x,
      });
    }
    const metadata = profileMetadata({
      name: formValues.name || undefined,
      bio: formValues.bio || undefined,
      picture: formValues.picture || undefined,
      coverPicture: formValues.coverPicture || undefined,
      attributes: attributes.length ? attributes : undefined,
    });
    const uploadedMetadata = await uploadMetadata({
      requestBody: {
        metadata,
      },
    });
    const arweaveUrl = `ar://${uploadedMetadata.id}`;

    const resultUpdateProfileMetadata = await updateProfileMetadata({
      metadataURI: arweaveUrl,
    });
    if (resultUpdateProfileMetadata.isFailure()) {
      toast.error("Failed to update profile", {
        description: resultUpdateProfileMetadata.error.message,
      });
      return;
    }

    const completionResult =
      await resultUpdateProfileMetadata.value.waitForCompletion();
    if (completionResult.isFailure()) {
      toast.error("Failed to update profile", {
        description: completionResult.error.message,
      });
      return;
    }

    toast.message("Profile updated successfully");
    setEditingProfileMetadata(false);
  });

  const handleXChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let value = event.target.value;
    // If user pastes a full url, extract the username
    if (value.startsWith("http")) {
      value = value.split("/").pop() || "";
    }
    setValue("x", value, { shouldValidate: true });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <Text as="div" size="2">
            Name
          </Text>
          <TextField.Root placeholder="Your name" {...register("name")} />
          {errors.name && (
            <Text as="div" size="1" color="red" mt="1">
              {errors.name.message}
            </Text>
          )}
        </div>

        <div className="space-y-1">
          <Text as="div" size="2">
            Bio
          </Text>
          <TextArea
            placeholder="Describe yourself in a few words (supports markdown)"
            rows={3}
            {...register("bio")}
          />
          {errors.bio && (
            <Text as="div" size="1" color="red" mt="1">
              {errors.bio.message}
            </Text>
          )}
        </div>

        <div className="space-y-1">
          <Text as="div" size="2">
            Website
          </Text>
          <TextField.Root
            placeholder="https://sigle.io"
            {...register("website")}
          />
          {errors.website && (
            <Text as="div" size="1" color="red" mt="1">
              {errors.website.message}
            </Text>
          )}
        </div>

        <div className="space-y-1">
          <Text as="div" size="2" className="flex items-center gap-1">
            <IconBrandX height="16" width="16" /> (Twitter)
          </Text>
          <TextField.Root
            placeholder="username"
            {...register("x")}
            onChange={handleXChange}
          />
          {errors.x && (
            <Text as="div" size="1" color="red" mt="1">
              {errors.x.message}
            </Text>
          )}
        </div>
      </div>

      <UploadProfilePicture
        picture={getValues("picture")}
        setPicture={(value) =>
          setValue("picture", value, { shouldValidate: true })
        }
      />

      <Flex gap="3" justify="end">
        <Button
          variant="soft"
          color="gray"
          type="button"
          disabled={isSubmitting}
          onClick={() => setEditingProfileMetadata(false)}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Save
        </Button>
      </Flex>
    </form>
  );
};
