import bcrypt from "bcryptjs";

const saltRounds = 10;

export async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, saltRounds);
}
// When bcrypt hashes a password, the resulting hash includes
// not just the hashed password but also metadata about how it was generated.
// This metadata is embedded in the hash itself,
// which allows bcrypt to later verify passwords correctly.
//
// for example:
//
// $2b$10$kVqJ8F1mP23NRIXt6UxTFOpmLK6Y.TpRI41wySzZyOhfs0ZGnQBkK
// $2b$ --> This indicates the algorithm version used by bcrypt.
// 10$ --> This is the cost factor or salt rounds.
// kVqJ8F1mP23NRIXt6UxTFO --> This is the salt (22 characters).
// pmLK6Y.TpRI41wySzZyOhfs0ZGnQBkK --> This is the hashed password itself.
export async function verifyPassword(
  enteredPassword: string,
  storedHashedPassword: string
) {
  return bcrypt.compare(enteredPassword, storedHashedPassword);
}
