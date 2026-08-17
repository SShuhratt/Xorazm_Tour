import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TransportController::index
* @see app/Http/Controllers/TransportController.php:11
* @route '/{locale}/transports'
*/
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/transports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransportController::index
* @see app/Http/Controllers/TransportController.php:11
* @route '/{locale}/transports'
*/
index.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransportController::index
* @see app/Http/Controllers/TransportController.php:11
* @route '/{locale}/transports'
*/
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TransportController::index
* @see app/Http/Controllers/TransportController.php:11
* @route '/{locale}/transports'
*/
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TransportController::show
* @see app/Http/Controllers/TransportController.php:22
* @route '/{locale}/transports/{transport}'
*/
export const show = (args: { locale: string | number, transport: string | number | { slug: string | number } } | [locale: string | number, transport: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/transports/{transport}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransportController::show
* @see app/Http/Controllers/TransportController.php:22
* @route '/{locale}/transports/{transport}'
*/
show.url = (args: { locale: string | number, transport: string | number | { slug: string | number } } | [locale: string | number, transport: string | number | { slug: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            locale: args[0],
            transport: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
        transport: typeof args.transport === 'object'
        ? args.transport.slug
        : args.transport,
    }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{transport}', parsedArgs.transport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransportController::show
* @see app/Http/Controllers/TransportController.php:22
* @route '/{locale}/transports/{transport}'
*/
show.get = (args: { locale: string | number, transport: string | number | { slug: string | number } } | [locale: string | number, transport: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TransportController::show
* @see app/Http/Controllers/TransportController.php:22
* @route '/{locale}/transports/{transport}'
*/
show.head = (args: { locale: string | number, transport: string | number | { slug: string | number } } | [locale: string | number, transport: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const transports = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default transports