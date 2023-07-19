import { defineRecipe } from "@pandacss/dev";

export default defineRecipe({
  name: "input",
  description: "The styles for the Input component",
  base: {
    display: "block",
    h: 10,
    px: 3,
    w: "full",
    minW: 0,
    outline: 0,
    bg: "slate.100",
    fontSize: "sm",
    fontWeight: "medium",
    rounded: "md",
    border: "2px solid",
    borderColor: "transparent",
    color: "slate.900",
    transitionProperty: "all",
    transitionDuration: "100ms",
    _focus: {
      bg: "transparent !important",
      borderColor: "slate.600",
    },
    _hover: {
      bg: "slate.200",
      _disabled: {
        bg: "initial",
      },
    },
    _disabled: {
      opacity: 0.4,
      boxShadow: "none",
    },
  }
})