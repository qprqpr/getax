<script lang="ts">
  import { IconDoorExit } from "@tabler/icons-svelte";
  import { hstack } from "styled-system/patterns";
  import { button } from "styled-system/recipes";
  import { css } from "styled-system/css";

  export let email: string = "";
  export let signOut: VoidFunction;
</script>

<div class={hstack()}>
  <p class={css({ fontSize: "sm" })}>{email}</p>
  <button
    class={button({ style: "secondary", variant: "icon" })}
    on:click={signOut}
  >
    <IconDoorExit size={16} />
  </button>
</div>
