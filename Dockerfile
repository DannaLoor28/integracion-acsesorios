FROM node:24

WORKDIR /usr/src/app
RUN npm install -g http-server

COPY public ./public
COPY package*.json ./
COPY tests ./tests

EXPOSE 3010
CMD ["http-server", "public", "-p", "3010"]
