import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import db from "./database/database";
import { resolvers } from "./graphql/resolvers/resolvers";
import { typeDefs } from "./graphql/typedefs/typeDefs";
import { generateDB } from "./utils/generate";
import session from "express-session";

const { ApolloServer, gql } = require("apollo-server-express");

require("dotenv").config();

const main = async () => {
  // init database
  await db.sync({ force: true });
  generateDB();

  // Express settings
  const app = express();

  // session to keep user logged in, WILL USE LOCAL STORAGE INSTEAD
  let sess = {
    name: "qid",
    secret: "Test",
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    },
    saveUninitialized: false,
    resave: false,
  };

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
    sess.cookie.secure = true;
  }

  app.use(session(sess));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(cors());

  // Init appolloserver and settings
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app });

  // Lets start this bad boy
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  });

  app.use("/", (_, res) => {
    res.json({
      api: "Events v1 api",
      graphql: "Enabled",
    });
  });
};

main()
  .then(() => console.log("Main started..."))
  .catch((err) => {
    console.error(err);
  });
