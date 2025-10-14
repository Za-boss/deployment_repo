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
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY,
            name TEXT,
            message TEXT,
            image TEXT
        )
        """)
        return self
    
    def get_all_entries(self):
        self.cursor.execute("SELECT * FROM messages")
        rows = self.cursor.fetchall()
        retRows = []
        for row in rows:
            processed_row = dict_factory(self.cursor, row)
            retRows.append(processed_row)
        return retRows
    
    def delete_all_entries(self):
        self.cursor.execute("DELETE FROM messages")

    def retrieve_entry(self, entry_id):
        self.cursor.execute("SELECT * FROM messages WHERE id = ?", (entry_id,))
        result = self.cursor.fetchone()
        return dict_factory(self.cursor, result)
    
    def new_entry(self, entry):
        self.cursor.execute("INSERT INTO messages (name, message, image) VALUES (?, ?, ?)", (entry["name"], entry["message"], entry["image"]))

    def delete_entry(self, entry_id):
        self.cursor.execute("DELETE FROM messages WHERE id = ?", (entry_id,))

    def update_entry(self, entry_id, entry_data):
        self.cursor.execute("UPDATE messages SET name = ?, message = ?, image = ? WHERE id = ?", (entry_data['name'], entry_data['message'], entry_data['image'], entry_id))

    def __exit__(self, exc_type, exc_value, trace_back):
        self.connection.commit()
        self.connection.close()

    #the __enter__ and __exit__ dunders lets us use this manager in a with block

#Example Usage below

"""
with DBManager("serverdb.db") as db:
    print(db.get_all_entries())
    db.delete_all_entries()
    db.new_entry({"name": "bob", "message": "hi", "image" : "img34"})
    db.update_entry(1, {"name": "charles", "message" : "bob is dead", "image" : "img35"})
    print(db.retrieve_entry(1))
"""
        