import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import path from "path";
import fs from "fs";

const typeDefsString = `#graphql
type Album @fulltext(indexes: [{ indexName: "AlbumTitle", fields: ["album_title"] }]){
	album_art: String!
	album_title: String!
	artistsCreatedAlbum: [Artist!]! @relationship(type: "CREATED_ALBUM", direction: IN)
	hasTagTags: [Tag!]! @relationship(type: "HAS_TAG", direction: OUT)
	hasTrackTracks: [Track!]! @relationship(type: "HAS_TRACK", direction: OUT)
	id: String!
	summary: String!
}

type Artist @fulltext(indexes: [{ indexName: "ArtistName", fields: ["artist_name"] }]){
	artist_bio: String!
	artist_name: String!
	createdAlbumAlbums: [Album!]! @relationship(type: "CREATED_ALBUM", direction: OUT)
	createdTrackTracks: [Track!]! @relationship(type: "CREATED_TRACK", direction: OUT)
	id: String!
	listeners: BigInt!
}

type Tag {
	albumsHasTag: [Album!]! @relationship(type: "HAS_TAG", direction: IN)
	id: String!
	tag_name: String!
}

type Track @fulltext(indexes: [{ indexName: "TrackTitle", fields: ["track_title"] }]){
	albumsHasTrack: [Album!]! @relationship(type: "HAS_TRACK", direction: IN)
	artistsCreatedTrack: [Artist!]! @relationship(type: "CREATED_TRACK", direction: IN)
	cover_art: String!
	duration: BigInt!
	id: String!
	rank: BigInt!
	track_title: String!
	comments: [Comment!]! @relationship(type: "COMMENTED_ON_TRACK", direction: IN)
}

type Comment {
	id: String
	text: String!
	commentedOnTrack: [Track!]! @relationship(type: "COMMENTED_ON_TRACK", direction: OUT)
  }`;

const initializeServer = async () => {
  const driver = neo4j.driver(
    "bolt://it2810-23.idi.ntnu.no:7687",
    neo4j.auth.basic("neo4j", "password")
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
};

initializeServer().catch((error) => {
  console.error("Error starting the server:", error);
});
