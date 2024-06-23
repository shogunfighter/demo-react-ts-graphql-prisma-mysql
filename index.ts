import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { TDataType } from "./schema/user/type";

const USER_DATA_RECORDS: TDataType[] = require("./mock/MOCK_DATA.json");

const { ruruHTML } = require("ruru/server");

const app = express();

const server = new ApolloServer({
  schema,
  introspection: true,
  context: { USER_DATA_RECORDS }, // Pass your user data records here
});

const PORT = process.env.PORT || 5000;

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

(async () => {
  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`Server running at http://localhost:${PORT}/graphql`)
  );
})();
