FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY .env ./
RUN npm run postinstall
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
