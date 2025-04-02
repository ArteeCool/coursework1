FROM node:22

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000

ENV MONGO_URI=mongodb+srv://artemgawrilyuk:GArtem2007@events.iyrnv0q.mongodb.net/?retryWrites=true&w=majority&appName=Events

EXPOSE 5000

CMD ["ts-node", "./backend/server.ts"]