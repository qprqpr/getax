<script lang="ts">
  import { css } from "styled-system/css";
  import { card } from "styled-system/recipes";
  import { divider, hstack, stack } from "styled-system/patterns";

  import Amount from "./Amount.svelte";

  export let title: string;
  export let badge: string;
  export let subtitle: string;
  export let value: number = 0;
</script>

<div class={card()}>
  <div class={stack()}>
    <div class={hstack({ justify: "space-between", alignItems: "start" })}>
      <div
        class={css({
          fontSize: "sm",
          fontWeight: "semibold",
        })}
      >
        {title}
      </div>
      <div
        class={css({
          fontSize: "xs",
          color: "slate.400",
        })}
      >
        {badge}
      </div>
    </div>
    <div
      class={css({
        fontSize: "xs",
        lineHeight: "tight",
        color: "slate.500",
      })}
    >
      {subtitle}
    </div>
    <div class={divider({ color: "slate.200" })} />
    <Amount {value} currency="GEL" />
  </div>
</div>
