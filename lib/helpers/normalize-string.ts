export function normalizeString(inputString: string) {
  const outputString = inputString.trim().replace(/\s+/g, "-").toLowerCase()
  return outputString
}
