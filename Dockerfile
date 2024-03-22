FROM node:20-alpine
WORKDIR /digital-tcard-admin-frontend
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm","run", "start"]