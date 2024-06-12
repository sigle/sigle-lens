import {
  allowedCurrencies,
  formatUSDollar,
  useCurrencyFiatPrice,
} from "@/lib/currencies";
import { nonNullable } from "@/lib/non-nullable";
import { useCurrencies } from "@lens-protocol/react-web";
import { Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useEffect } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import type { EditorPostFormData } from "../../EditorFormProvider";

export const CollectPrice = () => {
  const { data: currencies, loading } = useCurrencies();
  const { setValue, watch, register } = useFormContext<EditorPostFormData>();
  const watchCollectPrice = watch("collect.price");
  const watchCollectCurrency = watch("collect.currency");
  const { errors } = useFormState<EditorPostFormData>({
    name: ["collect.price", "collect.currency"],
  });
  const currencySymbol = currencies?.find(
    (currency) => currency.address === watchCollectCurrency,
  )?.symbol;
  const { data: currencyFiatPrice } = useCurrencyFiatPrice(currencySymbol);

  const filteredCurrencies = allowedCurrencies
    .map((allowedCurrency) =>
      currencies?.find(
        (currency) => currency.symbol === allowedCurrency.symbol,
      ),
    )
    .filter(nonNullable);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (filteredCurrencies.length > 0) {
      setValue("collect.currency", filteredCurrencies[0].address);
    }
  }, [loading]);

  return (
    <div>
      <label className="space-y-3">
        <Text as="p" size="3" weight="medium">
          Price
        </Text>
        <Flex gap="2">
          <TextField.Root
            className="w-full"
            placeholder="Free"
            type="number"
            {...register("collect.price")}
          />

          <Select.Root
            value={watchCollectCurrency}
            onValueChange={(value) => setValue("collect.currency", value)}
          >
            <Select.Trigger
              className="w-[160px]"
              placeholder={
                !watchCollectCurrency ? "Loading..." : "Select a currency"
              }
            />
            <Select.Content>
              {filteredCurrencies.map((currency) => (
                <Select.Item key={currency.address} value={currency.address}>
                  {currency.symbol}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
        {currencyFiatPrice && watchCollectPrice ? (
          <Text size="1" color="gray">
            ~
            {formatUSDollar.format(
              Number(watchCollectPrice) * Number(currencyFiatPrice),
            )}
          </Text>
        ) : null}
        {errors?.collect?.price && (
          <Text size="2" color="red">
            {errors.collect.price.message}
          </Text>
        )}
        {errors?.collect?.currency && (
          <Text size="2" color="red">
            {errors.collect.currency.message}
          </Text>
        )}
      </label>
    </div>
  );
};
