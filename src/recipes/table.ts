import { defineRecipe } from "@pandacss/dev";

export default defineRecipe({
  name: "table",
  description: "The styles for the Table component",
  base: {
    w: "full",
    fontSize: "xs",
    fontWeight: "medium",
    borderCollapse: "collapse",
    '& tr': {
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderColor: "slate.200",
      h: 8,
      _hover: {
        bg: "slate.50",
      },
    },
    '& td': {
      px: 1,
    },
    '& td:first-child': {
      w: 28,
      bg: "slate.50",
      borderRight: "1px solid",
      borderColor: "slate.200",
    },
    '& td:last-child': {
      w: 8,
    }
  },
});