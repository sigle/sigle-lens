import { zodResolver } from "@hookform/resolvers/zod";
import { useValidateHandle } from "@lens-protocol/react-web";
import { Button, Text, TextField } from "@radix-ui/themes";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const mintProfileSchema = z.object({
  username: z.string().min(5).max(26),
});

type MintProfileFormData = z.infer<typeof mintProfileSchema>;

interface MintProfileChooseHandleFormProps {
  onSelectHandle: (handle: string) => void;
}

export const MintProfileChooseHandleForm = ({
  onSelectHandle,
}: MintProfileChooseHandleFormProps) => {
  const { execute: validateHandle, loading: isValidating } =
    useValidateHandle();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isLoading, errors },
  } = useForm<MintProfileFormData>({
    resolver: zodResolver(mintProfileSchema),
  });

  const onSubmit = handleSubmit(async (formValues) => {
    const result = await validateHandle({ localName: formValues.username });

    if (result.isFailure()) {
      setError("username", {
        type: "manual",
        message: result.error.message,
      });
      return;
    }

    onSelectHandle(formValues.username);
  });

  return (
    <form className="mt-5" onSubmit={onSubmit}>
      <TextField.Root
        variant="soft"
        color={errors.username ? "red" : "gray"}
        size="3"
        placeholder="Mint your handle"
        autoComplete="off"
        {...register("username")}
      >
        <TextField.Slot>
          <IconSearch size={16} />
        </TextField.Slot>
      </TextField.Root>
      {errors.username && (
        <Text as="div" size="2" color="red" mt="2">
          {errors.username.message}
        </Text>
      )}

      <div className="mt-4 flex justify-end gap-3">
        <Button type="submit" loading={isLoading || isValidating}>
          Mint <IconArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
};
