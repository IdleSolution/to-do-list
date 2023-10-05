# TODO list

## Setup

<h2>Docker:</h2><br/>

* Set all required environment variables through .env (.example.env has everything that is necessarry)<br/>
* Run command:<br/>
```
    docker-compose up
```

<h2>Locally:</h2><br/>
Set all required environment variables through .env (.example.env has everything that is necessarry). Then:<br/>

* BACKEND:<br/>
You need a PostgreSQL database that is available locally. Then:<br/>

```
    npm install && npx prisma:generate && npx prisma:migration:run && npm run start:dev
```
* FRONTEND:
```
    npm install && npm run start
```

## Tests
* BACKEND:
```
    npm run test
```

* FRONTEND:
```
    npm run test
```

        