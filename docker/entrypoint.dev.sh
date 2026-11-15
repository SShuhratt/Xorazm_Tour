#!/bin/bash
set -e

cd /var/www

if [ ! -d vendor ] || [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction
fi

if [ ! -d node_modules ]; then
    npm install
fi

exec php-fpm -F
