import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import path from "path";
import fs from "fs";

const typeDefsString = `#graphql
type Artist {
  artist_name: String!
  songsMadeBy: [Song!]! @relationship(type: "MADE_BY", direction: IN)
}

type Genre {
  genre: String!
  songsHasGenre: [Song!]! @relationship(type: "HAS_GENRE", direction: IN)
}

type Song {
  acousticness: Float!
  age: Float!
  communication: Float!
  danceability: Float!
  dating: Float!
  energy: Float!
  family_gospel: Float!
  family_spiritual: Float!
  feelings: Float!
  hasGenreGenres: [Genre!]! @relationship(type: "HAS_GENRE", direction: OUT)
  id: BigInt!
  instrumentalness: String!
  len: BigInt!
  light_visual_perceptions: Float!
  like_girls: Float!
  loudness: Float!
  lyrics: String!
  madeByArtists: [Artist!]! @relationship(type: "MADE_BY", direction: OUT)
  movement_places: Float!
  music: Float!
  night_time: Float!
  obscene: Float!
  release_date: BigInt!
  romantic: Float!
  sadness: Float!
  shake_the_audience: Float!
  topic: String!
  track_name: String!
  valence: Float!
  violence: Float!
  world_life: Float!
}`;

const driver = neo4j.driver(
  "neo4j+s://7b3aeb69.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "I09dveAi5CoB3DRtw4uKKHbvLaJy1ZKs4bdQ6MTGIlU")
);

const neoSchema = new Neo4jGraphQL({ typeDefs: typeDefsString, driver });

const server = new ApolloServer({
  schema: await neoSchema.getSchema(),
});

const { url: serverUrl } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ req }),
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${serverUrl}`);
