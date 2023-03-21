FROM node:erbium-alpine3.9
WORKDIR /usr/src/basic_service
COPY . /usr/src/basic_service
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]