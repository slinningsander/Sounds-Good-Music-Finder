import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import path from "path";
import fs from "fs";

const typeDefsString = `#graphql
type Album {
	album_art: String!
	album_title: String!
	artistsCreatedAlbum: [Artist!]! @relationship(type: "CREATED_ALBUM", direction: IN)
	hasTagTags: [Tag!]! @relationship(type: "HAS_TAG", direction: OUT)
	hasTrackTracks: [Track!]! @relationship(type: "HAS_TRACK", direction: OUT)
	id: String!
	summary: String!
}

type Artist {
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

type Track {
	albumsHasTrack: [Album!]! @relationship(type: "HAS_TRACK", direction: IN)
	artistsCreatedTrack: [Artist!]! @relationship(type: "CREATED_TRACK", direction: IN)
	cover_art: String!
	duration: BigInt!
	id: String!
	rank: BigInt!
	track_title: String!
}`;

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
