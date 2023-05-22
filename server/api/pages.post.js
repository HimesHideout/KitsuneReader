import { useMongoDB } from "../utils/useMongoDB"
import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return {success: false, error: "Not logged in"}
  }

  let body = await readBody(event)
  
  const { client, pages, chapters } = useMongoDB()
  try {
    for (let page of body.pages) {
      let query = {chapter_number: page.chapter_number, page_number: page.page_number}
      let update = {$set: {image: page.image, effects: page.effects}}
      await pages.updateOne(query, update)
    }
    let query = {chapter_number: body.chapter_number}
    let update = {$set: {pages_count: body.pages.length}}
    await chapters.updateOne(query, update)
    return {success: true}
  } finally {
    client.close()
  }
})
