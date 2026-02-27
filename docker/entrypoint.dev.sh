#!/bin/bash
set -e

cd /var/www

composer install || true
npm install || true

exec php-fpm -F
