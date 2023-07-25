interface PromotionsDetail {
  idCalculatorConfiguration: string
  name: string
  beginDateUtc: string
  endDateUtc: string
  skusGift: SkusGift
  skus: Sku[]
  type: string
  sku1Detail: ProductDetail[]
  giftDetail: Product[]
}

interface SkusGift {
  gifts: Gift[]
}

interface Gift {
  id: string
  name: string
  quantity: string
}

interface Sku {
  id: string
  name: string
}
