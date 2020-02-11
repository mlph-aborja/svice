#!/bin/sh

cd /app
php artisan cache:clear
php artisan config:clear

php artisan migrate:fresh --seed
php artisan passport:install --force
php artisan key:generate
php artisan serve
