from neo4j import GraphDatabase

class Neo4jService:

    def __init__(self, uri, user, password):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self._driver.close()

    def run_script(self):
        with self._driver.session() as session:
            session.execute_write(self._setup_constraints)
            session.execute_write(self._create_artists)
            session.execute_write(self._create_albums)
            session.execute_write(self._create_tracks)
            session.execute_write(self._create_tags_and_relations)

    @staticmethod
    def _setup_constraints(tx):
        queries = [
        "CREATE CONSTRAINT IF NOT EXISTS FOR (a:Artist) REQUIRE a.id IS UNIQUE",
        "CREATE CONSTRAINT IF NOT EXISTS FOR (a:Album) REQUIRE a.id IS UNIQUE",
        "CREATE CONSTRAINT IF NOT EXISTS FOR (t:Track) REQUIRE t.id IS UNIQUE",
        "CREATE CONSTRAINT IF NOT EXISTS FOR (t:Tag) REQUIRE t.id IS UNIQUE"
    ]
        for query in queries:
            tx.run(query)
#id: artist.id,
    @staticmethod
    def _create_artists(tx):
        query = """
            CALL apoc.load.json('file:///graph_optimized_data_v2.json') YIELD value AS data
            UNWIND data.artists AS artist
            MERGE (art:Artist {
                id: artist.id,
                artist_name: artist.name,
                listeners: artist.listeners,
                artist_bio: COALESCE(artist.artist_bio, "ARTIST BIO NOT AVAILABLE")
                })
        """
        tx.run(query)
        print("Artists data loaded and processed.")

            # WITH data
            # UNWIND data.album_tag_relations AS relation
            # MATCH (related_album:Album { id: relation.album_id })
            # MATCH (related_tag:Tag { id: relation.tag_id })
            # MERGE (related_album)-[:TAGGED]->(related_tag)
    @staticmethod
    def _create_albums(tx):
        query = """
            CALL apoc.load.json('file:///graph_optimized_data_v2.json') YIELD value AS data
            UNWIND data.albums AS album
            MERGE (alb:Album {
                id: album.id,
                album_title: album.name,
                album_art: COALESCE(album.coverart, "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"),
                summary: COALESCE(album.summary, "ALBUM SUMMARY NOT AVAILABLE")
            })

            WITH data
            UNWIND data.artist_album_relations AS relation
            MATCH (related_artist:Artist { id: relation.artist_id })
            MATCH (related_album:Album {id: relation.album_id})
            MERGE (related_artist)-[:CREATED_ALBUM]->(related_album)


            
        """
        tx.run(query)
        print("Albums data and their relations to artists processed.")
            # WITH alb, album
            # MATCH (related_artist:Artist { id: album.artist_id })
            # MERGE (related_artist)-[:CREATED]->(alb)



        #album_title: album.artist
#id: track.id, 
    @staticmethod
    def _create_tracks(tx):
        query = """
            CALL apoc.load.json('file:///graph_optimized_data_v2.json') YIELD value AS data
            UNWIND data.tracks AS track
            MERGE (trk:Track { 
                id: track.id, 
                track_title: track.name, 
                duration: track.duration, 
                rank: track.rank,
                cover_art: COALESCE(track.cover_art, "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png")
                  })
                """
        
        query2 = """
            CALL apoc.load.json('file:///graph_optimized_data_v2.json') YIELD value AS data
                WITH data
                UNWIND data.artist_track_relations AS relation
                MATCH (related_artist:Artist { id: relation.artist_id})
                MATCH (related_track:Track {id: relation.track_id})
                MERGE (related_artist)-[:CREATED_TRACK]->(related_track)
        """
        query3 = """
            CALL apoc.load.json('file:///graph_optimized_data_v2.json') YIELD value AS data
            WITH data
                UNWIND data.album_track_relations AS relation2
                MATCH (related_album:Album { id: relation2.album_id})
                MATCH (related_track:Track {id: relation2.track_id})
                MERGE (related_album)-[:HAS_TRACK]->(related_track)
        """
        print(" --- creating track nodes")
        tx.run(query)

        print(" --- artist-to-track relation created")
        tx.run(query2)


        print(" --- album-to-track relation created")
        tx.run(query3)
        print("Tracks data and their relations processed.")
            # WITH trk, track
            # MATCH (related_album:Album { id: track.album_id })
            # MERGE (related_album)-[:CONTAINS]->(trk)
            
            # WITH trk, related_album
            # MATCH (related_artist:Artist)-[:CREATED]->(related_album)
            # MERGE (related_artist)-[:PERFORMED]->(trk)
    @staticmethod
    def _create_tags_and_relations(tx):
        query = """
            CALL apoc.load.json('file:///graph_optimized_data_v2.json') YIELD value AS data
            UNWIND data.tags AS tag
            MERGE (tgg:Tag { id: tag.id, tag_name: tag.name })
           
            WITH data
            UNWIND data.album_tag_relations AS relation
            MATCH (related_album:Album { id: relation.album_id })
            MATCH (related_tag:Tag { id: relation.tag_id })
            MERGE (related_album)-[:HAS_TAG]->(related_tag)
        """
        tx.run(query)
        print("Tags data and their relations processed.")

# Create a connection to your Neo4j instance
neo4j_service = Neo4jService("bolt://localhost:7687", "neo4j", "passord123")  # adjust parameters accordingly

print("Starting data import...")
# Run the script
neo4j_service.run_script()
print("Data import completed.")

# Close the connection
neo4j_service.close()
print("Connection to Neo4j closed.")
