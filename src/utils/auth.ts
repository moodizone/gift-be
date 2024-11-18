import jwt from "jsonwebtoken";

import {
  secret0,
  secret1,
  secret2,
  secret3,
  secret4,
  secretPosition,
} from "../configs";

const secrets = [secret0, secret1, secret2, secret3, secret4];

export function chooseSecretIndex(id: string) {
  // find first digit in id
  const digits = id.match(/\d/);
  // 0 as fallback
  const firstDigits = digits ? Number(digits[0]) : 0;
  // normalize in range of 0 to 4
  return firstDigits % secrets.length;
}
export function extractSecret(token: string) {
  const char = token.charAt(secretPosition);

  if (char) {
    const index = Number(char);
    const secret = secrets[index];

    if (secret) {
      return {
        secret,
        token: token.slice(0, secretPosition) + token.slice(secretPosition + 1),
      };
    }
  }

  return null;
}
export function generateAccessToken(id: string) {
  const index = chooseSecretIndex(id);
  const secret = secrets[index];
  const token = jwt.sign({ id }, secret, { expiresIn: "1d" });

  return (
    token.slice(0, secretPosition) + `${index}` + token.slice(secretPosition)
  );
}
