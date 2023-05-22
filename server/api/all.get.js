import { MongoClient } from "mongodb"

export default defineEventHandler(async (event) => {
  let chapters = []

  const uri = process.env.MONGODB_URI
  const client = new MongoClient(uri)

  try {
    const db = client.db("kitsune-reader")
    const chapters_collection = db.collection("chapters")
    const pages_collection = db.collection("pages")
    const options = { sort: { chapter_number: 1 } }
    const pages_aggregate = [{
      $group: {
        _id: "$chapter_number",
        pages: {
          $push: "$$ROOT"
        }
      }
    }]
    const chapters_cursor = await chapters_collection.find({}, options)
    const pages_cursor = await pages_collection.aggregate(pages_aggregate)
    chapters = await chapters_cursor.toArray()
    let pages = await pages_cursor.toArray()
    for (let chapter of chapters) {
      chapter.pages = pages.find(page => page["_id"] === chapter.chapter_number)
      if (chapter.pages === undefined) {
        chapter.pages = []
      } else {
        chapter.pages = chapter.pages.pages
      }
      chapter.pages.sort((a, b) => a.page_number - b.page_number)
      for (let page of chapter.pages) {
        if (page.image === null) {
          page.image = `${page.page_number}.png`
        }
      }
    }
  } finally {
    await client.close()
  }

  return chapters
})
