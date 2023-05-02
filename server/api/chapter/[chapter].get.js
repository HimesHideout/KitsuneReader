import { MongoClient } from "mongodb"

export default defineEventHandler(async (event) => {
  let result = {}

  const uri = process.env.MONGODB_URI
  const client = new MongoClient(uri)

  try {
    const db = client.db("kitsune-reader")
    const chapters = db.collection("chapters")
    const pages = db.collection("pages")
    const query = {chapter_number: parseInt(event.context.params.chapter)}
    const chapter_options = { projection: {_id: 0, title: 1, pages_count: 1} }
    const page_options = {sort: {page_number: 1}, projection: {_id: 0, chapter_number: 0}}
    const chapter = await chapters.findOne(query, chapter_options)
    if (chapter === null) {
      return null
    }
    const cursor = await pages.find(query, page_options)
    const pages_data = await cursor.toArray()
    result = {...chapter, pages: pages_data}
  } finally {
    await client.close()
  }

  return result
})
