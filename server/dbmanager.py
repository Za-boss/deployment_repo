import sqlite3
from pathlib import Path

BASE = Path(__file__).parent

DB_FILE = BASE / "serverdb.db"

def dict_factory(cursor, row):
    fields = []

    for column in cursor.description:
        fields.append(column[0])

    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]
    return result_dict

class DBManager:
    def __init__(self, filename):
        self.connection = None
        self.cursor = None
        self.db_file = BASE / filename
    def __enter__(self):
        self.connection = sqlite3.connect(self.db_file)
        self.cursor = self.connection.cursor()
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS trails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            length INTEGER
        )
        """)
        return self
    def get_all_entries(self):
        self.cursor.execute("SELECT * FROM trails")
        rows = self.cursor.fetchall()
        retRows = []
        for row in rows:
            processed_row = dict_factory(self.cursor, row)
            retRows.append(processed_row)
        return retRows
    def new_entry(self, entry):
        self.cursor.execute("INSERT INTO trails (name, length) VALUES (?, ?)", (entry["name"], entry["length"]))
    def __exit__(self, exc_type, exc_value, trace_back):
        self.connection.commit()
        self.connection.close()
    #the __enter__ and __exit__ dunders lets us use this manager in a with block
#need to use this as follows: with (Dbclass()) as db: --code

with DBManager("serverdb.db") as db:
    print(db.get_all_entries())
    #manager.newEntry({"name": "trail1", "length" : 5000})

        