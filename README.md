# transport-fleet-manager-api

An API to manage Pilots, Ships and Transportations in the galaxy

## How to run the project:

- clone the repository
- run a simple mysql database (for example using xampp)
- create a database called `transport-fleet-manager`
- open the folder of the project
- run `npm install`
- try to create a .env based on this:

PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=8KvdsP_s8IecL_TMbpihXjfY7I7hqBJe
DRIVE_DISK=local
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB_NAME=transport-fleet-manager

- run `node ace migration:run` to create tables
- run `node ace serve --watch`

- open the collection on the folder /collections (you can use postman)

- you can now make requests based on the examples of the collection
