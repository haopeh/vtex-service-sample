interface ProductDetail {
  productId: number
  name: string
  salesChannel: string
  available: boolean
  displayMode: string
  dimensions: string[]
  dimensionsInputType: Record<string, string>
  dimensionsMap: Record<string, string[]>
  skus: SKU[]
}

interface SKU {
  sku: number
  skuname: string
  dimensions: Record<string, string>
  available: boolean
  availablequantity: number
  cacheVersionUsedToCallCheckout: string | null
  listPriceFormated: string
  listPrice: number
  taxFormated: string
  taxAsInt: number
  bestPriceFormated: string
  bestPrice: number
  spotPrice: number
  installments: number
  installmentsValue: number
  installmentsInsterestRate: number | null
  image: string
  sellerId: string
  measures: Measure
  unitMultiplier: number
  rewardValue: number

  services: []
}

interface Measure {
  cubicweight: number
  height: number
  length: number
  weight: number
  width: number
}
