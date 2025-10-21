# Message log project

**Message**

Attributes:

* Title (string)

* Message (string)

* Image link (string)


## Database schema:

```sql
CREATE TABLE messages (
            id INTEGER PRIMARY KEY,
            title TEXT,
            message TEXT,
            image TEXT
)
```

## REST endpoints:

Retrieve message collection | GET | /messages

Retrieve a single message | GET | /messages/{id}

Create a new message | POST | /messages

Update existing message | PUT | /messages{id}

Delete a message | DELETE | /messages{id}