import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from "next-auth/providers/credentials"


export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: {label: "Username", type: "text", placeholder: "Username..."},
        password: {label: "Password", type: "password", placeholder: "Password..."}
      },
      authorize (credentials) {
        //This will change once the database is connected.
        const user = {id : '1', name: "test", username: "test", password: "test2"}
        if (credentials.username === user.username && credentials.password === user.password) {
          return user
        } else {
          return null
        }
      }
    })
  ]
})
