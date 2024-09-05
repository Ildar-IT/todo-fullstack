FROM node:18

WORKDIR /opt/app

COPY ./package*.json  ./

RUN npm ci

COPY ./ ./

EXPOSE 4000

CMD ["npm", "run", "start:dev"]