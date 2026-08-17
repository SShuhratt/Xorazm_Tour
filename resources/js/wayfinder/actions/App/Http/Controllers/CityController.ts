import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CityController::index
* @see app/Http/Controllers/CityController.php:10
* @route '/{locale}/cities'
*/
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/cities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::index
* @see app/Http/Controllers/CityController.php:10
* @route '/{locale}/cities'
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
* @see \App\Http\Controllers\CityController::index
* @see app/Http/Controllers/CityController.php:10
* @route '/{locale}/cities'
*/
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CityController::index
* @see app/Http/Controllers/CityController.php:10
* @route '/{locale}/cities'
*/
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CityController::show
* @see app/Http/Controllers/CityController.php:21
* @route '/{locale}/cities/{city}'
*/
export const show = (args: { locale: string | number, city: string | number | { slug: string | number } } | [locale: string | number, city: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/cities/{city}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::show
* @see app/Http/Controllers/CityController.php:21
* @route '/{locale}/cities/{city}'
*/
show.url = (args: { locale: string | number, city: string | number | { slug: string | number } } | [locale: string | number, city: string | number | { slug: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            locale: args[0],
            city: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
        city: typeof args.city === 'object'
        ? args.city.slug
        : args.city,
    }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::show
* @see app/Http/Controllers/CityController.php:21
* @route '/{locale}/cities/{city}'
*/
show.get = (args: { locale: string | number, city: string | number | { slug: string | number } } | [locale: string | number, city: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CityController::show
* @see app/Http/Controllers/CityController.php:21
* @route '/{locale}/cities/{city}'
*/
show.head = (args: { locale: string | number, city: string | number | { slug: string | number } } | [locale: string | number, city: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const CityController = { index, show }

export default CityController