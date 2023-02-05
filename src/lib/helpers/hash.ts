import { createHash } from "crypto"

export default function hashPair(from: string, to: string) {
  const secretSauce = process.env.SECRET_SAUCE
  const hashedPair = createHash("sha256")
    .update(from + to + secretSauce)
    .digest("hex")
    .slice(0, 8)

  return hashedPair
}
