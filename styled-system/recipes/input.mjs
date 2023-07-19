import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const inputFn = createRecipe('input', {}, [])

const variantKeys = []

function splitVariantProps(props) {
  return splitProps(props, variantKeys)
}

export const input = Object.assign(inputFn, {
  __recipe__: true,
  variantKeys,
  variantMap: {},
  splitVariantProps,
})