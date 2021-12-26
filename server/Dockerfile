FROM node

RUN mkdir /app
WORKDIR /app
COPY ./ ./
RUN npm i -g typescript
RUN npm i
CMD [ "npm", "start" ]
