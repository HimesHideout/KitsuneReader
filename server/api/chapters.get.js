import { MongoClient } from "mongodb"

export default defineEventHandler(async (event) => {
  let chapters = []

  const uri = process.env.MONGODB_URI
  const client = new MongoClient(uri)

  try {
    const db = client.db("kitsune-reader")
    const collection = db.collection("chapters")
    const options = { sort: { chapter_number: 1 } }
    const cursor = await collection.find({}, options)
    chapters = await cursor.toArray()
  } finally {
    await client.close()
  }

  return chapters
})
