interface SkuService {
  id?: number
  typeId: number
  valueId: number
  skuId: number
  name: string
  text: string
  isActive: boolean
}

interface SkuServiceType {
  id?: number
  name: string
  isActive: boolean
  shownOnProductFront: boolean
  shownOnCart: boolean
  shownOnAttachmentFront: boolean
  shownOnFileUpload: boolean
  isGiftCard: boolean
  isRequired: boolean
}

interface SkuServiceValue {
  id?: number
  skuServiceTypeId: number
  name: string
  value: number
  cost: number
}

interface SkuServiceAssociation {
  id?: number
  skuServiceTypeId: number
  skuServiceValueId: number
  skuId: number
  name: string
  text: string
  isActive: boolean
}
