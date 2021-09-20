# file-processor
File Processor is responsible for handeling read , write and update for files and its contents.

### Prerequisite :
For DB and MQ, I've added a docker-compose file.
  - Postgress DB
  - RbbitMQ
  - Protoc (if want to add new messages)
  - Nodejs 14+
  - Typescript compiler (TSC)

### How to start the service :
- Feed the .env variable and start all the above mentioned services.
-  clone this repo and `cd file-processor`
- `npm install`
- `npm run start:dev`
- The service will be running in http://127.0.0.1:3001 and the corresponding swagger doc is in http://127.0.0.1:3001/api


### Tests :
To run test `npm run test`
