# Estágio 1: Build da aplicação Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build

# Estágio 2: Servir a aplicação com Nginx
FROM nginx:alpine
COPY --from=build /app/dist/portfolio-jonathan/browser /usr/share/nginx/html
EXPOSE 80
