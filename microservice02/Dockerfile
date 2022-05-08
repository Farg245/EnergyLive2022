FROM node
WORKDIR /app/microservice02
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7000
CMD ["npm","start"]