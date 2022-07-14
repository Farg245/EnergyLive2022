FROM node
WORKDIR /app/microservice07
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7007
CMD ["npm","start"]