import { getServerSession } from "#auth"
import { useMongoDB } from "~/server/utils/useMongoDB"

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return {success: false, error: "Not logged in"}
  }

  let page_number = parseInt(event.context.params.page)
  let page = await readBody(event)

  const { client, pages, chapters } = useMongoDB()
  
  try {
    const query = {page_number: page_number, chapter_number: page.chapter_number}
    const result = await pages.deleteOne(query)
    if (result.deletedCount === 1) {
      const filter = {chapter_number: page.chapter_number}
      const update = {$inc: {pages_count: -1}}
      await chapters.updateOne(filter, update)
      const updatePages = {$inc: {page_number: -1}}
      await pages.updateMany({chapter_number: page.chapter_number, page_number: {$gt: page_number}}, updatePages)
    }
    return {success: result.deletedCount === 1}
  } finally {
    client.close()
  }
})
