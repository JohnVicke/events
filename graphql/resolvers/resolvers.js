import UserModel from "../../database/models/usermodel";
import argon2 from "argon2";

export const resolvers = {
  Query: {
    hello: () => "Hello world",
    users: async () => await UserModel.findAll(),
  },
  Mutation: {
    register: async (_, { username, password, email }, { req }) => {
      const exists = await UserModel.findOne({ where: { email: email } });
      if (exists) {
        return {
          errors: [
            {
              field: "email",
              message: "Email is already in use",
            },
          ],
        };
      }

      const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailExp.test(String(email).toLowerCase())) {
        return {
          errors: [
            {
              field: "email",
              message: "Email not valid",
            },
          ],
        };
      }

      // TODO: Add better validation for username & password, whitespace etc.
      if (username.length < 5) {
        return {
          errors: [
            {
              field: "username",
              message: "Username is too short",
            },
          ],
        };
      }

      if (password.length < 8) {
        return {
          errors: [
            {
              field: "password",
              message: "Password is too short",
            },
          ],
        };
      }

      const hashedPassword = await argon2.hash(password);

      // Add to database if it passes all tests
      const user = await UserModel.create({ username, password: hashedPassword, email });
      req.session.userId = user.id;
      return { user };
    },
    login: async (_, { usernameOrEmail, password }, { req }) => {
      const user = await UserModel.findOne(
        usernameOrEmail.includes("@") ? { where: { email: usernameOrEmail } } : { where: { username: usernameOrEmail } }
      );

      if (!user) {
        return {
          errors: [
            {
              field: "userNameOrEmail",
              message: "User does not exist",
            },
          ],
        };
      }

      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) {
        return {
          errors: [
            {
              field: "password",
              message: "Incorrect password",
            },
          ],
        };
      }
      req.session.userId = user.id;
      return { user };
    },
  },
};
