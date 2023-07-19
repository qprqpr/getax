/* eslint-disable */
import type { ConditionalValue } from '../types'
import type { Pretty } from '../types/helpers'

type TableVariant = {
  
}

type TableVariantMap = {
  [key in keyof TableVariant]: Array<TableVariant[key]>
}

export type TableVariantProps = {
  [key in keyof TableVariant]?: ConditionalValue<TableVariant[key]>
}

interface TableRecipe {
  __type: TableVariantProps
  (props?: TableVariantProps): string
  variantMap: TableVariantMap
  variantKeys: Array<keyof TableVariant>
  splitVariantProps<Props extends TableVariantProps>(props: Props): [TableVariantProps, Pretty<Omit<Props, keyof TableVariantProps>>]
}

/** The styles for the Table component */
export declare const table: TableRecipe