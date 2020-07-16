FROM node:latest

COPY . .

RUN npm build

#ENTRYPOINT ["npm", "start"]