FROM php:7.2-fpm

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get install -y \
    libfreetype6-dev \
    libwebp-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    nano \
    vim \
    zip \
    unzip \
    libgmp-dev \
    libldap2-dev \
    netcat \
    sqlite3 \
    cron \
    libsqlite3-dev && \
    docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-webp-dir=/usr/include/  --with-jpeg-dir=/usr/include/ && \
    docker-php-ext-install gd pdo pdo_mysql pdo_sqlite zip gmp bcmath pcntl ldap sysvmsg exif

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer
# to speed up the install process -> parallel download
RUN composer global require hirak/prestissimo

RUN mkdir -p /app
ADD . /app/

WORKDIR /app

RUN composer update
RUN composer install
RUN chmod -R a+w storage/ bootstrap/cache

RUN cp ./run.sh /tmp
RUN chmod +x /tmp/run.sh
ENTRYPOINT ["/tmp/run.sh"]
