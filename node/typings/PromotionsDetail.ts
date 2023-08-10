interface PromotionsDetail {
  idCalculatorConfiguration: string
  name: string
  beginDateUtc: string
  endDateUtc: string
  skusGift: SkusGift
  skus: Sku[]
  type: string
  skuDetail: ProductDetail[]
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
  imageUrl: string
  productId: string
  listPrice: string
}
interface SkuContext {
  Id: number
  ProductId: number
  NameComplete: string
  ComplementName: string
  ProductName: string
  ProductDescription: string
  ProductRefId: string
  TaxCode: string
  SkuName: string
  IsActive: boolean
  IsTransported: boolean
  IsInventoried: boolean
  IsGiftCardRecharge: boolean
  ImageUrl: string
  DetailUrl: string
  CSCIdentification: null | string
  BrandId: string
  BrandName: string
  IsBrandActive: boolean
  Dimension: {
    cubicweight: number
    height: number
    length: number
    weight: number
    width: number
  }
  RealDimension: {
    realCubicWeight: number
    realHeight: number
    realLength: number
    realWeight: number
    realWidth: number
  }
  ManufacturerCode: string
  IsKit: boolean
  KitItems: any[] // Change any[] to a more specific type if possible
  Services: Array<{
    Id: number
    ServiceTypeId: number
    Name: string
    IsFile: boolean
    IsGiftCard: boolean
    IsRequired: boolean
    Options: Array<{
      Id: number
      Name: string
      Description: string
      PriceName: string
      ListPrice: number
      Price: number
    }>
    Attachments: any[] // Change any[] to a more specific type if possible
  }>
  Categories: any[] // Change any[] to a more specific type if possible
  CategoriesFullPath: string[]
  Attachments: any[] // Change any[] to a more specific type if possible
  Collections: any[] // Change any[] to a more specific type if possible
  SkuSellers: Array<{
    SellerId: string
    StockKeepingUnitId: number
    SellerStockKeepingUnitId: string
    IsActive: boolean
    FreightCommissionPercentage: number
    ProductCommissionPercentage: number
  }>
  SalesChannels: number[]
  Images: Array<{
    ImageUrl: string
    ImageName: string
    FileId: number
  }>
  Videos: string[]
  SkuSpecifications: Array<{
    FieldId: number
    FieldName: string
    FieldValueIds: number[]
    FieldValues: string[]
    IsFilter: boolean
    FieldGroupId: number
    FieldGroupName: string
  }>
  ProductSpecifications: Array<{
    FieldId: number
    FieldName: string
    FieldValueIds: number[]
    FieldValues: string[]
    IsFilter: boolean
    FieldGroupId: number
    FieldGroupName: string
  }>
  ProductClustersIds: string
  PositionsInClusters: any // Change any to a more specific type if possible
  ProductClusterNames: any // Change any to a more specific type if possible
  ProductClusterHighlights: any // Change any to a more specific type if possible
  ProductCategoryIds: string
  IsDirectCategoryActive: boolean
  ProductGlobalCategoryId: number
  ProductCategories: { [key: string]: string }
  CommercialConditionId: number
  RewardValue: number
  AlternateIds: {
    RefId: string
  }
  AlternateIdValues: string[]
  EstimatedDateArrival: null | string
  MeasurementUnit: string
  UnitMultiplier: number
  InformationSource: string
  ModalType: null | string
  KeyWords: string
  ReleaseDate: string
  ProductIsVisible: boolean
  ShowIfNotAvailable: boolean
  IsProductActive: boolean
  ProductFinalScore: number
}
