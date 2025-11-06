import { hashPassword } from "../utils/bcrypt";

(async () => {
  const password = "admin123"; // your desired admin password
  const hashed = await hashPassword(password);
  console.log("Hashed password:", hashed);
})();
