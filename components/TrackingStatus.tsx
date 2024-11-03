'use client'
import axios from 'axios'
import { useState } from 'react'
import { OrderData } from '../utils/types'

export default function TrackingStatus() {
  const [orderId, setOrderId] = useState<string>('')
  const [status, setStatus] = useState<string | null>(null)

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`/api/tracking?id=${orderId}`)
      const order: OrderData = response.data
      setStatus(order.status || 'Status not available')
    } catch (error) {
      console.error('Order not found:', error)
      setStatus('Order not found')
    }
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Order ID'
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={fetchStatus}>Track Order</button>
      {status && <p>Status: {status}</p>}
    </div>
  )
}
