<script lang="ts">
  import { css } from "styled-system/css";
  import type { CurrencyCode } from "../types";
  import { toast } from "../libs";

  export let value: number;
  export let currency: CurrencyCode;

  const formatter = new Intl.NumberFormat("ka-GE", {
    style: "currency",
    useGrouping: false,
    currencyDisplay: "narrowSymbol",
    currency,
  });

  $: [valueStr, currencyStr] = formatter
    .formatToParts(value)
    .reduce<[string, string]>(
      ([val, cur], part) => {
        if (part.type === "currency") {
          cur += part.value;
        } else if (part.type !== "literal") {
          val += part.value;
        }
        return [val, cur];
      },
      ["", ""]
    );

  const onCopy = () => {
    navigator.clipboard.writeText(value.toFixed(2));
    toast("Copied");
  };
</script>

<button
  title="Copy to clipboard"
  class={css({
    px: 1,
    py: 0.5,
    rounded: "sm",
    cursor: "pointer",
    _hover: {
      bg: "slate.200",
    },
    _active: {
      bg: "slate.300",
    },
  })}
  on:click={onCopy}
>
  <span class={css({ fontFamily: "mono" })}>
    {valueStr}
  </span>
  <span
    class={css({
      color: "slate.400",
    })}
  >
    {currencyStr}
  </span>
</button>
