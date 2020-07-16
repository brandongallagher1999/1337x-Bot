FROM node:latest

COPY . .

EXPOSE 80
EXPOSE 443

RUN npm build

ENTRYPOINT ["npm", "start"]