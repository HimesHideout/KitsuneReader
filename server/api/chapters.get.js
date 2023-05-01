import { MongoClient } from "mongodb"

export default defineEventHandler(async (event) => {
  /* let chapters = [
    {chapter_number: 1, title: "I've been pulling gacha for 30 minutes and maxed out my credit", cover: "/images/test/Test (1).png", pages_count: 3, type: "Chapter", type_number: 1},
    {chapter_number: 2, title: "Bocchi The Broke", cover: "/images/test/Test (2).png", pages_count: 4, type: "Chapter", type_number: 2},
    {chapter_number: 3, title: "Ranking of Tims", cover: "/images/test/Test (3).png", pages_count: 3, type: "Chapter", type_number: 3},
    {chapter_number: 4, title: "Violet Olive Garden", cover: "/images/test/Test (1).png", pages_count: 3, type: "Chapter", type_number: 4},
    {chapter_number: 5, title: "Odd Taxes", cover: "/images/test/Test (2).png", pages_count: 3, type: "Chapter", type_number: 5},
    {chapter_number: 6, title: "Card Captor Sudachi", cover: "/images/test/Test (3).png", pages_count: 3, type: "Chapter", type_number: 6},
    {chapter_number: 7, title: "Rune;Escape", cover: "/images/test/Test (1).png", pages_count: 3, type: "Extra", type_number: 1},
    {chapter_number: 8, title: "Love is Rawr", cover: "/images/test/Test (2).png", pages_count: 3, type: "Extra", type_number: 2},
    {chapter_number: 9, title: "A Tax on Titan", cover: "/images/test/Test (3).png", pages_count: 3, type: "Extra", type_number: 3},
  ] */

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
