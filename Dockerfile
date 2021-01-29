FROM sandrokeil/typescript:latest

COPY . .

EXPOSE 80
EXPOSE 443


RUN npm install
RUN npm run tsc

WORKDIR /dist/

ENTRYPOINT ["node", "index.js"]