#!/bin/sh

cd /app
php artisan cache:clear
php artisan config:clear

php artisan migrate:refresh --seed
php artisan db:seed
php artisan passport:install --force
php artisan key:generate

php artisan serve
