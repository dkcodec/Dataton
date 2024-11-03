'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getEcoFriendlyRoute } from '../utils/ecoRoutes'

interface FormData {
  origin: string
  destination: string
  itemName: string
}

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Проверьте, что data.origin и data.destination заполнены
      console.log('Origin:', data.origin, 'Destination:', data.destination)

      const ecoRoute = await getEcoFriendlyRoute(data.origin, data.destination)
      console.log('Eco-friendly route:', ecoRoute)
    } catch (error) {
      console.error('Error fetching eco-friendly route:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        placeholder='Origin'
        {...register('origin', { required: true })}
      />
      {errors.origin && <span>Origin is required</span>}

      <input
        type='text'
        placeholder='Destination'
        {...register('destination', { required: true })}
      />
      {errors.destination && <span>Destination is required</span>}

      <input
        type='text'
        placeholder='Item Name'
        {...register('itemName', { required: true })}
      />
      {errors.itemName && <span>Item Name is required</span>}

      <button type='submit'>Create Order</button>
    </form>
  )
}
