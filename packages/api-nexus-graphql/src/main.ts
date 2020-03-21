import { server } from './server'

const port = process.env.PORT || 4000

server.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
)
