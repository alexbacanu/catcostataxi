import { createHash } from "crypto";

export default function hashPair(from: string, to: string) {
  const secret = "ensure-swimming-unmasked";

  const hashedPair = createHash("sha256")
    .update(from + to + secret)
    .digest("hex")
    .slice(0, 8);

  return hashedPair;
}
