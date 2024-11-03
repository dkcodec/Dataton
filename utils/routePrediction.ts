import * as tf from '@tensorflow/tfjs'

// Функция для предсказания времени по каждому сегменту маршрута
async function predictSegmentTime(features: number[]): Promise<number> {
  const model = tf.sequential()
  model.add(
    tf.layers.dense({
      units: 50,
      activation: 'relu',
      inputShape: [features.length],
    })
  )
  model.add(tf.layers.dense({ units: 1, activation: 'linear' }))
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' })

  // Создаем тензор из данных сегмента
  const input = tf.tensor([features])
  const prediction = model.predict(input) as tf.Tensor
  return prediction.dataSync()[0]
}

// Основная функция для предсказания времени мультимаршрута
export async function predictRouteTimeForMultimodalRoute(routeData: {
  legs: { features: number[] }[]
}): Promise<number> {
  let totalTime = 0

  // Проходим по каждому сегменту и предсказываем время для каждого
  for (const leg of routeData.legs) {
    const segmentTime = await predictSegmentTime(leg.features)
    totalTime += segmentTime
  }

  return totalTime
}

function calculateCost(distance: number, transportType: string): number {
  const ratePerKm = transportType === 'автомобиль' ? 5 : 10 // Стоимость за км
  return distance * ratePerKm
}

function calculateCO2Emissions(
  distance: number,
  transportType: string
): number {
  const emissionFactor = transportType === 'автомобиль' ? 0.12 : 0.08 // кг CO2 за км
  return distance * emissionFactor
}
