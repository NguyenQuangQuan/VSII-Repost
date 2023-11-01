# build environment
# FROM node:16-alpine as build
# WORKDIR /app
# COPY . .
# RUN yarn
# RUN yarn build

# production environment
FROM nginx:stable-alpine

COPY ./build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]