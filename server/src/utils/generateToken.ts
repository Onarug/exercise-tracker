import jwt, { SignOptions } from "jsonwebtoken"
import { Response, Request } from "express"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET Not Found")
}

const generateToken = (userId: string, res: Response) => {
  const payload = { id: userId }

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
  }

  const token = jwt.sign(payload, JWT_SECRET, options)

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })

  return token
}


export { generateToken }