/* eslint-disable */
import type { ConditionalValue } from '../types'
import type { Pretty } from '../types/helpers'

type InputVariant = {
  
}

type InputVariantMap = {
  [key in keyof InputVariant]: Array<InputVariant[key]>
}

export type InputVariantProps = {
  [key in keyof InputVariant]?: ConditionalValue<InputVariant[key]>
}

interface InputRecipe {
  __type: InputVariantProps
  (props?: InputVariantProps): string
  variantMap: InputVariantMap
  variantKeys: Array<keyof InputVariant>
  splitVariantProps<Props extends InputVariantProps>(props: Props): [InputVariantProps, Pretty<Omit<Props, keyof InputVariantProps>>]
}

/** The styles for the Input component */
export declare const input: InputRecipe