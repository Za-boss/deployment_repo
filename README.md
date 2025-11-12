# Message log project
## To see the webapp go to http://144.38.200.232/

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

## Docker + Kubernetes Deployment

### How to build the docker images
cd server/

docker login

docker buildx build --platform linux/amd64 -t YOURDOCKERUSERNAME/student-backend:1.0.0 . --push

cd client/ 

docker buildx build --platform linux/amd64 -t YOURDOCKERUSERNAME/student-frontend:1.0.0 . --push
#

## How to deploy to kubernetes

### Create the name space
kubectl apply -f k8s/namespace.yaml

### Deploy backend
kubectl apply -f k8s/backend-deploy.yaml
kubectl apply -f k8s/backend-svc.yaml

### Deploy frontend
kubectl apply -f k8s/frontend-deploy.yaml
kubectl apply -f k8s/frontend-svc.yaml

### Points them to port 80
kubectl apply -f k8s/ingress.yaml

### Verify by running

kubectl -n student1 get pods

kubectl -n student1 get svc,ingress

#

## How to Run locally
### Backend
cd server

python3 -m venv venv && source venv/bin/activate

pip install -r requirements.txt

pip install gunicorn

python app.py

### Frontend

cd client

python3 -m http.server 8080

open http://localhost:8080
##