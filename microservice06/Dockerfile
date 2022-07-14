FROM node
WORKDIR /app/microservice06
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7005
CMD ["npm","start"]