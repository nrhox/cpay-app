FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY .env ./

COPY . .

RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 4137

CMD ["serve", "-s", "dist", "-l", "4137"]