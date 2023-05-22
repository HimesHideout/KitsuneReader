import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return {success: false, error: "Not logged in"}
  }

  let body = await readBody(event)
  
  const { client, chapters } = useMongoDB()
  try {
    for (let chapter of body) {
      let query = {chapter_number: chapter.chapter_number}
      let update = {$set: {title: chapter.title, cover: chapter.cover, type: chapter.type, type_number: chapter.type_number}}
      await chapters.updateOne(query, update)
    }
    return {success: true}
  } finally {
    client.close()
  }
})
