FROM node:16-alpine
EXPOSE 3000

WORKDIR /app

COPY frontend/dist /app/frontend/dist
COPY backend /app/backend

WORKDIR /app/backend
RUN npm install
RUN chown -R node:node /app
RUN chmod 755 /app
USER node
CMD ["npx", "tsx", "index.ts"]
