FROM node:18

WORKDIR /usr/app/front

EXPOSE 3000

COPY ./  ./

RUN npm ci

CMD ["npm", "run", "dev"]