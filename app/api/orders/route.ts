import { NextResponse } from 'next/server'
import { logisticsBlockchain } from '../../../utils/blockchain'
import { OrderData } from '../../../utils/types'

export async function POST(request: Request) {
  const orderData: OrderData = await request.json()
  logisticsBlockchain.addBlock(orderData)
  return NextResponse.json({
    message: 'Order created and added to blockchain',
    orderData,
  })
}
