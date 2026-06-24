import psycopg2

DATABASE_URL = "postgresql://neondb_owner:npg_5mFBKkrRPsX0@ep-small-base-atc5uef5-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

conn = psycopg2.connect(DATABASE_URL)

cursor = conn.cursor()

print("Connected to Neon successfully!")