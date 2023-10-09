export default defineEventHandler(async (event) => {
  const { client, anniversary } = useMongoDB()
  try {
    const options = { sort: {chapter_number: 1}, projection: {_id: 0}}
    const messages_cursor = await anniversary.find({}, options)
    const data = await messages_cursor.toArray()
    return data
  } finally {
    client.close()
  }
})
