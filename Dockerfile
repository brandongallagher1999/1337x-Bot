FROM node:lts

COPY . .

EXPOSE 80
EXPOSE 443

ARG TOKEN

ENV token=${TOKEN}

RUN npm install
RUN npm install typescript -g
RUN npm install ts-node -g

ENTRYPOINT ts-node index.ts ${token}