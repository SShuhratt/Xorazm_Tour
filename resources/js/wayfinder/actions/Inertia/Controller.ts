import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/{locale}/about'
*/
const Controller091c7d9fd1e6e1516b1accefdfbd37fc = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller091c7d9fd1e6e1516b1accefdfbd37fc.url(args, options),
    method: 'get',
})

Controller091c7d9fd1e6e1516b1accefdfbd37fc.definition = {
    methods: ["get","head"],
    url: '/{locale}/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/{locale}/about'
*/
Controller091c7d9fd1e6e1516b1accefdfbd37fc.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    if (Array.isArray(args)) {
        args = {
            locale: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
    }

    return Controller091c7d9fd1e6e1516b1accefdfbd37fc.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/{locale}/about'
*/
Controller091c7d9fd1e6e1516b1accefdfbd37fc.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller091c7d9fd1e6e1516b1accefdfbd37fc.url(args, options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/{locale}/about'
*/
Controller091c7d9fd1e6e1516b1accefdfbd37fc.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller091c7d9fd1e6e1516b1accefdfbd37fc.url(args, options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/{locale}/contact'
*/
const Controller001ae4831e5f70604ca719e45250d4f0 = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller001ae4831e5f70604ca719e45250d4f0.url(args, options),
    method: 'get',
})

Controller001ae4831e5f70604ca719e45250d4f0.definition = {
    methods: ["get","head"],
    url: '/{locale}/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/{locale}/contact'
*/
Controller001ae4831e5f70604ca719e45250d4f0.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    if (Array.isArray(args)) {
        args = {
            locale: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
    }

    return Controller001ae4831e5f70604ca719e45250d4f0.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/{locale}/contact'
*/
Controller001ae4831e5f70604ca719e45250d4f0.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller001ae4831e5f70604ca719e45250d4f0.url(args, options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/{locale}/contact'
*/
Controller001ae4831e5f70604ca719e45250d4f0.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller001ae4831e5f70604ca719e45250d4f0.url(args, options),
    method: 'head',
})

const Controller = {
    '/{locale}/about': Controller091c7d9fd1e6e1516b1accefdfbd37fc,
    '/{locale}/contact': Controller001ae4831e5f70604ca719e45250d4f0,
}

export default Controller