/* eslint-disable */
import type { ConditionalValue } from '../types'
import type { Pretty } from '../types/helpers'

type CardVariant = {
  
}

type CardVariantMap = {
  [key in keyof CardVariant]: Array<CardVariant[key]>
}

export type CardVariantProps = {
  [key in keyof CardVariant]?: ConditionalValue<CardVariant[key]>
}

interface CardRecipe {
  __type: CardVariantProps
  (props?: CardVariantProps): string
  variantMap: CardVariantMap
  variantKeys: Array<keyof CardVariant>
  splitVariantProps<Props extends CardVariantProps>(props: Props): [CardVariantProps, Pretty<Omit<Props, keyof CardVariantProps>>]
}

/** The styles for the Card component */
export declare const card: CardRecipe