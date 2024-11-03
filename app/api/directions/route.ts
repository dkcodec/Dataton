import axios from 'axios'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

interface Coordinates {
  lat: number
  lng: number
}

interface Route {
  distanceMeters: number
  duration: string
  fuelEfficiency: number
}

async function getEcoFriendlyRoute(
  origin: Coordinates,
  destination: Coordinates
): Promise<Route | null> {
  if (!GOOGLE_MAPS_API_KEY) throw new Error('Google Maps API key is not set')

  const response = await axios.post(
    `https://routes.googleapis.com/directions/v2:computeRoutes`,
    {
      origin: {
        location: { latLng: { latitude: origin.lat, longitude: origin.lng } },
      },
      destination: {
        location: {
          latLng: { latitude: destination.lat, longitude: destination.lng },
        },
      },
      travelMode: 'DRIVE',
      routeModifiers: { vehicleInfo: { emissionType: 'FUEL_EFFICIENT' } },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
      },
    }
  )

  const route = response.data.routes[0]
  if (!route) return null

  return {
    distanceMeters: route.distanceMeters,
    duration: route.duration,
    fuelEfficiency: route.fuelEfficiency,
  }
}

export async function getCoordinates(city: string): Promise<Coordinates> {
  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address: city,
        key: GOOGLE_MAPS_API_KEY,
      },
    }
  )

  const location = response.data.results[0].geometry.location
  return { lat: location.lat, lng: location.lng }
}

export async function fetchEcoFriendlyRoute(city1: string, city2: string) {
  const origin = await getCoordinates(city1)
  const destination = await getCoordinates(city2)

  const route = await getEcoFriendlyRoute(origin, destination)
  console.log('Eco-friendly route:', route)
}
