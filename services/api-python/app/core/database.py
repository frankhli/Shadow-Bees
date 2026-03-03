import psycopg2
from psycopg2.extras import RealDictCursor
from app.core.config import settings

class Database:
    def __init__(self):
        self.conn = None
    
    def connect(self):
        if self.conn is None or self.conn.closed:
            self.conn = psycopg2.connect(
                settings.database_url,
                cursor_factory=RealDictCursor
            )
        return self.conn
    
    def query(self, sql, params=None):
        conn = self.connect()
        with conn.cursor() as cur:
            cur.execute(sql, params)
            return cur.fetchall()
    
    def query_one(self, sql, params=None):
        conn = self.connect()
        with conn.cursor() as cur:
            cur.execute(sql, params)
            return cur.fetchone()
    
    def execute(self, sql, params=None):
        conn = self.connect()
        with conn.cursor() as cur:
            cur.execute(sql, params)
            conn.commit()
            return cur.rowcount

db = Database()
