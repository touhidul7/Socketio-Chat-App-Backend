#Sample Dockerfile for NodeJS Apps

FROM node:20

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3002

CMD [ "node", "index.js" ]