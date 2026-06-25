import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in .env file")

# Create connection
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

print("Connected to Neon successfully!")