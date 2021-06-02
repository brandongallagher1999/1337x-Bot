FROM node:latest

COPY . .

EXPOSE 80
EXPOSE 443


RUN npm install
RUN npm install typescript -g
RUN tsc

WORKDIR /dist/

ENTRYPOINT ["node", "index.js"]