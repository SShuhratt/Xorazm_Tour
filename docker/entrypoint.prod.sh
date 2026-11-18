#!/usr/bin/env sh
set -eu

cd /var/www

php artisan config:cache
php artisan route:cache
php artisan view:cache

if [ "${1:-}" = "php-fpm" ]; then
    php artisan migrate --force
    if [ -n "${ADMIN_EMAIL:-}" ] && [ -n "${ADMIN_PASSWORD:-}" ]; then
        php artisan admin:ensure
    fi
fi

exec "$@"
