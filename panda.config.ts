import { defineConfig } from "@pandacss/dev";

import card from "./src/recipes/card";
import input from "./src/recipes/input";
import table from "./src/recipes/table";
import button from "./src/recipes/button"

export default defineConfig({
  preflight: true,
  watch: true,
  separator: '-',
  outdir: "styled-system",
  include: ["./src/**/*.{js,ts,svelte}"],
  exclude: [],
  theme: {
    extend: {
      recipes: {
        card,
        input,
        button,
        table,
      },
      breakpoints: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
    }
  }
})