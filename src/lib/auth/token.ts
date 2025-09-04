import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";

export function generateSessionToken(): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));
  return encodeBase32LowerCaseNoPadding(randomBytes);
}
