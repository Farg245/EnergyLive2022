FROM node
WORKDIR /app/microservice01
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7001
CMD ["npm","start"]