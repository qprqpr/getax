import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tableFn = createRecipe('table', {}, [])

const variantKeys = []

function splitVariantProps(props) {
  return splitProps(props, variantKeys)
}

export const table = Object.assign(tableFn, {
  __recipe__: true,
  variantKeys,
  variantMap: {},
  splitVariantProps,
})