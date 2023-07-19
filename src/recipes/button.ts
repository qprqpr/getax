import { defineRecipe } from '@pandacss/dev'

export default defineRecipe({
  name: "button",
  description: 'The styles for the Button component',
  base: {
    display: "inline-block",
    cursor: "pointer",
    outline: "none",
    rounded: "md",
    transitionProperty: "colors",
    transitionDuration: "100ms",
    _disabled: {
      opacity: 0.4,
      boxShadow: "none",
    },
    _hover: {
      _disabled: {
        bg: "initial",
      },
    }
  },
  variants: {
    style: {
      secondary: {
        bg: "slate.100",
        color: "slate.800",
        _hover: {
          bg: "slate.200",
        },
        _active: {
          bg: "slate.300",
        },
      },
      primary: {
        bg: "slate.600",
        color: "white",
        _hover: {
          bg: "slate.700",
        },
        _active: {
          bg: "slate.800",
        },
      },
    },
    variant: {
      text: {
        px: 4,
        minH: 10,
        fontSize: "sm",
        lineHeight: "1.1",
        letterSpacing: "tight",
        fontWeight: "semibold",
        textAlign: "center",
      },
      icon: {
        w: 6,
        h: 6,
        rounded: "md",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
  defaultVariants: {
    style: "secondary",
    variant: "text",
  }
});