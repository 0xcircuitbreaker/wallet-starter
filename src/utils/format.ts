/**
 * Get app URL from any link
 *
 * @param link Link to get the app url from
 */
export function getAppURL(link: string) {
  if (!link) return ""

  const url = new URL(link)

  return url.hostname
}

// possible types
type Types =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function"

/**
 * Check types of values
 */
export function checkTypes(...values: [any, Types | Types[]][]) {
  for (const [value, expectedType] of values) {
    const expectedTypes =
      typeof expectedType === "string" ? [expectedType] : expectedType

    if (!expectedTypes.includes(typeof value)) {
      throw new Error(
        `Type of value ${value} is not one of: ${expectedTypes.join(", ")}`
      )
    }
  }
}

/**
 * Beautify addresses
 *
 * @param address Address to beautify
 *
 * @returns Formatted address
 */
export function formatAddress(address: string, count = 13) {
  return (
    address.substring(0, count) +
    "..." +
    address.substring(address.length - count, address.length)
  )
}

/**
 * Returns if a string is a valid Arweave address or ID
 *
 * @param addr String to validate
 * @returns Valid address or not
 */
export const isAddress = (addr: string) => /[a-z0-9_-]{43}/i.test(addr)
