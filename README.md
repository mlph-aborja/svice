# Svice

## Requirements
    - PHP
    - Composer
    - Laravel
    - Node JS
    - MySQL

## Svice Backend Setup

- To install dependencies
    ```
    composer install
    ```
- Create .env file in root of /svice-backend/svice
- Copy content of env.example and paste to .env file
- In .env file, change
	- DB_DATABASE=svice
	- DB_USERNAME=YOUR_USERNAME_IN_DATABASE
	- DB_PASSWORD=YOUR_PASSWORD_IN_DATABASE
- Create a database schema named svice
- To migrate and create tables etc.
    ```
	php artisan migrate
    ```
- To create encryption keys to generate secure access token.
    ```
	php artisan passport:install
    ```
- To generate application key in .env file
	```
    php artisan key:generate
    ```
- To run application
	```
    php artisan serve
    ```
    
## Svice Frontend Setup

- To install dependencies
    ```
    npm install
    ```
- To run application
    ```
    npm start
    ```
