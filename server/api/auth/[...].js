import CredentialsProvider from "next-auth/providers/credentials"
import { NuxtAuthHandler } from '#auth'
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt"

const uri = process.env.MONGODB_URI
const saltRounds = 10;

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: {label: "Username", type: "text", placeholder: "Username..."},
        password: {label: "Password", type: "password", placeholder: "Password..."}
      },
      async authorize (credentials) {
        if (credentials?.username === "" || credentials?.password === "") {
          console.error("Full credentials needed")
          return null
        }
        const client = new MongoClient(uri);
        const db = client.db("kitsune-reader")
        const users = db.collection("users")
        const query = {username: credentials?.username}
        const options = {projection: {_id: 0, username: 1, password: 1}}
        const user = await users.findOne(query, options)
        if (user === null) {
          client.close()
          console.error("Couldn't find username")
          return null
        }
        const match = await bcrypt.compare(credentials?.password, user.password)
        client.close()
        if (match) {
          return user
        } else {
          console.error("Invalid username or password")
          return null
        }
      }
    })
  ]
})
