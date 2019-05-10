import axios from 'axios'

export const fetchProviders = () => axios.get('http://svc.metrotransit.org/NexTrip/Providers?format=json')

export const fetchRoutes = () => axios.get('http://svc.metrotransit.org/NexTrip/Routes?format=json')

export const fetchDirections = (routeNumber = 0) => 
  axios.get(`http://svc.metrotransit.org/NexTrip/Directions/${routeNumber}?format=json`)

export const fetchStops = (routeNumber = 0, direction = 0) => 
  axios.get(`http://svc.metrotransit.org/NexTrip/Stops/${routeNumber}/${direction}?format=json`)

