import { hash } from "argon2";
import UserModel from "../database/models/usermodel";

export const generateDB = async () => {
  const username = "virren";
  const password = "virren123";
  const email = "viktormalmedal@gmail.com";
  const hashedPassword = await hash(password);
  const user = await UserModel.create({ username, password: hashedPassword, email });
};
