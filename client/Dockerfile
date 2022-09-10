FROM node:lts

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --also=dev

COPY . .
RUN npm run build

FROM httpd:alpine
COPY --from=0 /usr/src/app/dist/ /usr/local/apache2/htdocs/
