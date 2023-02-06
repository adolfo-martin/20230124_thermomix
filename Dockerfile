FROM node:lts-alpine3.17
WORKDIR /app
COPY ./backend/. .
EXPOSE 8082
CMD ["npm", "run", "start"]
