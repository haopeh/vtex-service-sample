interface LogisticPickupPoint {
  name: string
  address: LogisticAddress
  id: string
  description: string | null
  instructions: string
  formatted_address: string | null
  isActive: boolean
  distance: number
  seller: string
  businessHours: Array<{
    closingTime: string
    openingTime: string
    dayOfWeek: number
  }>
  tagsLabel: any[]
  pickupHolidays: any[]
}

interface LogisticAddress {
  country: { acronym: string; name: string }
  location: { latitude: number; longitude: number }
  postalCode: string
  city: string
  state: string
  neighborhood: string
  street: string
  number: string
  complement: string
  reference: string
}
