FROM node:lts-alpine3.17
WORKDIR /app
# COPY package.json .
# RUN npm install
COPY ./backend/. .
EXPOSE 8082
CMD ["npm", "run", "start"]

# docker build -t adomargon/thermomix_rest_server:0.11 .
# docker push adomargon/thermomix_rest_server:0.11
# docker start adomargon/thermomix_rest_server:0.11
