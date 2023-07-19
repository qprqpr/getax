import { defineRecipe } from "@pandacss/dev";

export default defineRecipe({
  name: "card",
  description: "The styles for the Card component",
  base: {
    p: 4,
    bg: "slate.50",
    border: "2px solid",
    borderColor: "slate.100",
    rounded: "md",
  },
});