import { MongoClient } from "mongodb"

export const useMongoDB = () => {
    const uri = process.env.MONGODB_URI
    const client = new MongoClient(uri)
    const db = client.db("kitsune-reader")
    const chapters = db.collection("chapters")
    const pages = db.collection("pages")
    const effects = db.collection("effects")
    const users = db.collection("users")
    const messages = db.collection("messages")
    return {client, db, chapters, pages, effects, users, messages}
}