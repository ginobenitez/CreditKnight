FROM node:lts-slim 

WORKDIR /client/

COPY public/ /client/public
COPY src/ /client/src
COPY package.json /client/

RUN npm install
EXPOSE 3000

CMD ["npm", "start"]

