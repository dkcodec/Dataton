import { NextResponse } from 'next/server'
import { logisticsBlockchain } from '../../../utils/blockchain'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const order = logisticsBlockchain.chain.find((block) => block.data.id === id)
  if (order) {
    return NextResponse.json(order.data)
  } else {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }
}
