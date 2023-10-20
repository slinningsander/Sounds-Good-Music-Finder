import { toGraphQLTypeDefs } from "@neo4j/introspector";
import fs from "fs";
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  "neo4j+s://7b3aeb69.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "I09dveAi5CoB3DRtw4uKKHbvLaJy1ZKs4bdQ6MTGIlU")
);

const sessionFactory = () =>
  driver.session({ defaultAccessMode: neo4j.session.READ });

// We create a async function here until "top level await" has landed
// so we can use async/await
async function main() {
  const typeDefs = await toGraphQLTypeDefs(sessionFactory);
  fs.writeFileSync("schema.graphql", typeDefs);
  await driver.close();
}
main();
