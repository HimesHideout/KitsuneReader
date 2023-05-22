import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return {success: false, error: "Not logged in"}
  }

  let body = await readBody(event)  
  const { client, chapters } = useMongoDB()
  try {
    let query = {chapter_number: body.chapter_number}
    let update = {$set: {title: body.title, cover: body.cover, type: body.type, type_number: body.type_number}}
    await chapters.updateOne(query, update)
    return {success: true}
  } finally {
    client.close()
  }
})