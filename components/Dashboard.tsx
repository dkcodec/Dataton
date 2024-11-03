'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { OrderData } from '../utils/types'

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderData[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders')
      setOrders(response.data)
    }
    fetchOrders()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await axios.put('/api/orders', { id, status })
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status } : order))
    )
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <p>
            {order.itemName} - {order.status}
          </p>
          <button onClick={() => updateStatus(order.id, 'completed')}>
            Complete
          </button>
        </div>
      ))}
    </div>
  )
}
