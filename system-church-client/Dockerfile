FROM node:8.11-alpine as builder

RUN mkdir -p /tmp/banco-docentes

WORKDIR /tmp/banco-docentes/

COPY . ./

RUN npm install

RUN npm install --global @angular/cli

ARG build_env

RUN echo "ng build -c=${build_env}"

RUN ng build -c=${build_env}

FROM httpd:2.2.34-alpine

RUN mkdir -p /usr/local/apache2/htdocs/banco-docentes/

COPY --from=builder /tmp/banco-docentes/dist /usr/local/apache2/htdocs/banco-docentes/

EXPOSE 80

CMD ["httpd-foreground"]
