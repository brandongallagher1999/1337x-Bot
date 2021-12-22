#Version Locking Node
FROM node:17.3

COPY . .

EXPOSE 80
EXPOSE 443

RUN yarn install
RUN yarn global add typescript
RUN yarn global add ts-node
RUN chmod 755 docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD [$token]