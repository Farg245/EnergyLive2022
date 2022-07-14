FROM node
WORKDIR /app/microservice03
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7002
CMD ["npm","start"]