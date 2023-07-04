interface Product {
  productId: string
  productName: string
  brand: string
  brandId: number
  linkText: string
  productReference: string
  categoryId: string
  productTitle: string
  metaTagDescription: string
  clusterHighlights: Record<string, string>
  productClusters: Record<string, string>
  searchableClusters: Record<string, string>
  categories: string[]
  categoriesIds: string[]
  link: string
  description: string
  items: Item[]
  itemMetadata: {
    items: CatalogMetadataItem[]
  }
  titleTag: string
  jsonSpecifications: string
}

interface Item {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: Array<{ Key: string; Value: string }>
  measurementUnit: string
  unitMultiplier: number
  modalType: any | null
  images: Array<{
    imageId: string
    imageLabel: string | null
    imageTag: string
    imageUrl: string
    imageText: string
  }>
  videos: Array<{
    videoUrl: string
  }>
  variations: string[]
  sellers: Seller[]
}

interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

interface CommertialOffer {
  DeliverySlaSamplesPerRegion: Record<
    string,
    { DeliverySlaPerTypes: any[]; Region: any | null }
  >
  Installments: Installment[]
  DiscountHighLight: any[]
  GiftSkuIds: string[]
  Teasers: any[]
  BuyTogether: any[]
  ItemMetadataAttachment: any[]
  Price: number
  PriceWithPriceTags: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  Tax: number
  DeliverySlaSamples: Array<{
    DeliverySlaPerTypes: any[]
    Region: any | null
  }>
  GetInfoErrorMessage: any | null
  CacheVersionUsedToCallCheckout: string
}

interface Installment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

// query parameters
interface SearchArgs {
  query: string | null
  category: string | null
  specificationFilters: string[] | null
  priceRange: string | null
  collection: string | null
  salesChannel: string | null
  orderBy: string | null
  from: number | null
  to: number | null
  map: string | null
  hideUnavailableItems: boolean | null
}

// autocomplete
interface CompleteItem {
  criteria: string | null
  href: string
  name: string
  thumbUrl: string | null
  thumb: string
  items: ProductItem[]
}

interface ProductItem {
  productId: string
  itemId: string
  name: string
  nameComplete: string
  imageUrl: string
}

// interface Product {
//   productId: string
//   productName: string
//   brand: string
//   brandId: number
//   brandImageUrl: string | null
//   linkText: string
//   productReference: string
//   productReferenceCode: string | null
//   categoryId: string
//   productTitle: string
//   metaTagDescription: string
//   releaseDate: string
//   clusterHighlights: Record<string, string>
//   productClusters: Record<string, string>
//   searchableClusters: Record<string, string>
//   categories: string[]
//   categoriesIds: string[]
//   link: string
//   description: string
//   items: Item[]
// }
//
// interface Item {
//   itemId: string
//   name: string
//   nameComplete: string
//   complementName: string
//   ean: string
//   referenceId: ReferenceId[]
//   measurementUnit: string
//   unitMultiplier: number
//   modalType: string | null
//   isKit: boolean
//   images: Image[]
//   // sellers: Seller[]
//   Videos: string[]
//   estimatedDateArrival: string
// }
//
// interface ReferenceId {
//   Key: string
//   Value: string
// }
//
// interface Image {
//   imageId: string
//   imageLabel: string | null
//   imageTag: string
//   imageUrl: string
//   imageText: string
//   imageLastModified: string
// }

// interface Seller {
//   sellerId: string
//   sellerName: string
//   addToCartLink: string
//   sellerDefault: boolean
//   commertialOffer: CommertialOffer
// }
//
// interface CommertialOffer {
//   DeliverySlaSamplesPerRegion: Record<string, DeliverySlaSample>
//   Installments: any[]
//   DiscountHighLight: any[]
//   GiftSkuIds: any[]
//   Teasers: any[]
//   PromotionTeasers: any[]
//   BuyTogether: any[]
//   ItemMetadataAttachment: any[]
//   Price: number
//   ListPrice: number
//   PriceWithoutDiscount: number
//   RewardValue: number
//   PriceValidUntil: string
//   AvailableQuantity: number
//   IsAvailable: boolean
//   Tax: number
//   DeliverySlaSamples: DeliverySlaSample[]
//   GetInfoErrorMessage: string | null
//   CacheVersionUsedToCallCheckout: string
//   PaymentOptions: PaymentOptions
// }
//
// interface DeliverySlaSample {
//   DeliverySlaPerTypes: any[]
//   Region: string | null
// }
//
// interface PaymentOptions {
//   installmentOptions: any[]; // Replace 'any' with appropriate type if available
//   paymentSystems: any[]; // Replace 'any' with appropriate type if available
//   payments: any[]; // Replace 'any' with appropriate type if available
//   giftCards: any[]; // Replace 'any' with appropriate type if available
//   giftCardMessages: any[]; // Replace 'any' with appropriate type if available
//   availableAccounts: any[]; // Replace 'any' with appropriate type if available
//   availableTokens: any[]; // Replace 'any' with appropriate type if available
// }
