FROM node:lts

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --also=dev

COPY tsconfig.json webpack.config.js index.html ./
COPY src ./src
COPY public ./public
COPY models ./models
RUN npm run build

FROM httpd:alpine
COPY --from=0 /usr/src/app/dist/* /usr/local/apache2/htdocs/
