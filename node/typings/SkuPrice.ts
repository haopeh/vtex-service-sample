interface Price {
  tradePolicyId: string
  value: number
  listPrice: number
  minQuantity: number
  dateRange?: {
    from: string
    to: string
  }
}

interface SkuPrice {
  itemId: string
  listPrice: number
  costPrice: number
  markup: number
  basePrice: number
  fixedPrices: Price[]
}
