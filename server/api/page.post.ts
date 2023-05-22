import { useMongoDB } from "../utils/useMongoDB"
import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return {success: false, error: "Not logged in"}
  }
  
  let body = await readBody(event)
  
  const { client, pages, chapters } = useMongoDB()
  const result = await pages.insertOne(body)
  const filter = {chapter_number: body.chapter_number}
  await chapters.updateOne(filter, {$inc: {pages_count: 1}})
  client.close()
  return {success: result.acknowledged}
})
