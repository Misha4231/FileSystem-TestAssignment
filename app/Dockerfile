FROM node:22-alpine AS build

ENV VITE_API_HOST="https://file-system-600177541931.europe-west1.run.app"

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build


FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]