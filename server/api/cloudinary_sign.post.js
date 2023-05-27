import { createHash } from "crypto"

export default defineEventHandler(async (event) => {
  let body = await readBody(event)

  let parameters = Object.keys(body).sort()
  let string_sign = parameters.reduce((string, key) => {
    return string + key + "=" + body[key] + "&"
  }, "")
  string_sign = string_sign.slice(0, -1) + process.env.CLOUDINARY_API_SECRET

  let signature = createHash("sha1").update(string_sign).digest("hex")
  return signature
})