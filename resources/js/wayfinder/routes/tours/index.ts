import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TourController::index
* @see app/Http/Controllers/TourController.php:10
* @route '/{locale}/tours'
*/
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/tours',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourController::index
* @see app/Http/Controllers/TourController.php:10
* @route '/{locale}/tours'
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
* @see \App\Http\Controllers\TourController::index
* @see app/Http/Controllers/TourController.php:10
* @route '/{locale}/tours'
*/
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourController::index
* @see app/Http/Controllers/TourController.php:10
* @route '/{locale}/tours'
*/
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourController::show
* @see app/Http/Controllers/TourController.php:22
* @route '/{locale}/tours/{tour}'
*/
export const show = (args: { locale: string | number, tour: string | number | { slug: string | number } } | [locale: string | number, tour: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/tours/{tour}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourController::show
* @see app/Http/Controllers/TourController.php:22
* @route '/{locale}/tours/{tour}'
*/
show.url = (args: { locale: string | number, tour: string | number | { slug: string | number } } | [locale: string | number, tour: string | number | { slug: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            locale: args[0],
            tour: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
        tour: typeof args.tour === 'object'
        ? args.tour.slug
        : args.tour,
    }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{tour}', parsedArgs.tour.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourController::show
* @see app/Http/Controllers/TourController.php:22
* @route '/{locale}/tours/{tour}'
*/
show.get = (args: { locale: string | number, tour: string | number | { slug: string | number } } | [locale: string | number, tour: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourController::show
* @see app/Http/Controllers/TourController.php:22
* @route '/{locale}/tours/{tour}'
*/
show.head = (args: { locale: string | number, tour: string | number | { slug: string | number } } | [locale: string | number, tour: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const tours = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default tours