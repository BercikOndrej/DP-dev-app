FROM node:22-alpine

ENV VITE_SERVER_DOMAIN=http://localhost:3000
ENV VITE_FOOD_TAX=70
ENV VITE_TINY_MCE_API_KEY=eve2j4b29gzcantaajx1veui0chr2r9fi5v6cuaq00j1flhz

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 5173

EXPOSE 80

CMD ["npm", "run", "dev", "--", "--host"]