FROM node:18

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

RUN npm cache clean --force && \
    npm install -g npm@latest && \
    npm install

COPY . .

ENV PORT $BACKEND_PORT

RUN npx prisma generate && npm run build

CMD [ "npm", "run", "start:migrate:prod" ]