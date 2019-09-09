#FROM nginx:1.17
FROM mhart/alpine-node:12.10.0

RUN apk add --update nginx
RUN rm -rf /var/cache/apk/*
RUN mkdir -p /run/nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/src/app
COPY . .
COPY .env.full .env
RUN npm i && npm run build
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]

#WORKDIR /usr/src/app
#COPY . .

#RUN apk update && apk upgrade && apk add git && apk add python && apk add make && apk add g++ && npm i

#WORKDIR /usr/src/app
#COPY . .

#RUN apk update && apk upgrade && apk add git && apk add python && apk add make && apk add g++ && npm i

EXPOSE 8080

#CMD ["npm", "start"]
