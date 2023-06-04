import { Event } from '@prisma/client'
import APIEvent from './apiEvent'

const eventService = new APIEvent<Event>('/events/api/')

export default eventService
