FROM node
WORKDIR /app/microservice05
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7004
CMD ["npm","start"]