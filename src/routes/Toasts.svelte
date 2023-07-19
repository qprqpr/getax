<script>
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { css } from "styled-system/css";
  import { vstack } from "styled-system/patterns";
  import { toasts } from "../libs";
</script>

<div
  class={vstack({
    gap: 0,
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: "none",
  })}
>
  {#each $toasts as toast (toast.id)}
    <div
      animate:flip
      transition:fly={{ y: 10 }}
      class={css({
        py: 1,
        px: 3,
        mb: 1,
        rounded: "sm",
        fontSize: "sm",
        bg: "slate.800",
        color: "white",
      })}
    >
      {toast.message}
    </div>
  {/each}
</div>
