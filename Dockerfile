FROM node:lts

COPY . .

EXPOSE 80
EXPOSE 443

ARG TOKEN

RUN npm install
RUN npm install typescript -g
RUN npm install ts-node -g

ENV token=${TOKEN}

ENTRYPOINT ts-node index.ts ${token}