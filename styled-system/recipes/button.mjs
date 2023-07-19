import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const buttonFn = createRecipe('button', {
  "style": "secondary",
  "variant": "text"
}, [])

const variantKeys = [
  "style",
  "variant"
]

function splitVariantProps(props) {
  return splitProps(props, variantKeys)
}

export const button = Object.assign(buttonFn, {
  __recipe__: true,
  variantKeys,
  variantMap: {
  "style": [
    "secondary",
    "primary"
  ],
  "variant": [
    "text",
    "icon"
  ]
},
  splitVariantProps,
})