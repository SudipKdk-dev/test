# Stage 1: Build React Client
FROM node:20-alpine AS client-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build

# Stage 2: Express Server & Static Asset Serving
FROM node:20-alpine
WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

COPY server/ ./server/
COPY --from=client-builder /app/client/dist ./server/public

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server/index.js"]
