export interface OrderData {
  id: string
  itemName: string
  destination: string
  origin?: string
  route?: string
  estimatedTime?: number
  status?: string
}

export type OrderFormData = Pick<OrderData, 'itemName' | 'destination'>
