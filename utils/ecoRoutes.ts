import axios from 'axios'

interface Route {
  carbonEmissions: number
  distance: number
  duration: number
}

export async function getEcoFriendlyRoute(
  origin: string,
  destination: string
): Promise<Route | null> {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required')
  }

  const response = await axios.get(`/api/directions`, {
    params: {
      origin,
      destination,
    },
  })

  const routes = response.data.routes
  if (routes.length === 0) return null

  const ecoRoute = routes.reduce((bestRoute: Route, route: any) => {
    const carbonEmissions = calculateCarbonEmissions(
      route.legs[0].distance.value
    )
    if (!bestRoute || carbonEmissions < bestRoute.carbonEmissions) {
      return {
        carbonEmissions,
        distance: route.legs[0].distance.value,
        duration: route.legs[0].duration.value,
      }
    }
    return bestRoute
  }, {} as Route)

  return ecoRoute
}

function calculateCarbonEmissions(distance: number): number {
  const emissionFactor = 0.12 // kg CO2 per km (примерный показатель)
  return (distance / 1000) * emissionFactor
}
