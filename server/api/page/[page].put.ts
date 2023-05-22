import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return {success: false, error: "Not logged in"}
  }

  let body = await readBody(event)  
  const { client, pages } = useMongoDB()
  try {
    let query = {chapter_number: body.chapter_number, page_number: body.page_number}
    let update = {$set: {image: body.image, effects: body.effects}}
    await pages.updateOne(query, update)
    return {success: true}
  } finally {
    client.close()
  }
})