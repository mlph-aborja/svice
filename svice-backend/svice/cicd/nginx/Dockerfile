FROM nginx

ADD ./cicd/nginx/site.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /app/public
ADD ./public/ /app/public/
