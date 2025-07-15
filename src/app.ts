import fastify from 'fastify'
import cookie from '@fastify/cookie'
// import crypto from 'node:crypto'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] ${request.url}`)
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.get('/hello', async (request, reply) => {
  return reply.status(200).send({
    message: 'Hello World!',
  })
})
