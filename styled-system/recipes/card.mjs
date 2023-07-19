import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const cardFn = createRecipe('card', {}, [])

const variantKeys = []

function splitVariantProps(props) {
  return splitProps(props, variantKeys)
}

export const card = Object.assign(cardFn, {
  __recipe__: true,
  variantKeys,
  variantMap: {},
  splitVariantProps,
})