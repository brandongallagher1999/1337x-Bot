FROM node:latest

COPY . .

EXPOSE 80
EXPOSE 443

ARG TOKEN

RUN yarn install
RUN yarn global add typescript
RUN yarn global add ts-node

ENTRYPOINT ts-node index.ts ${TOKEN}}