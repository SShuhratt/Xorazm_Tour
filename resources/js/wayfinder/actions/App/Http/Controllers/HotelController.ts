import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HotelController::index
* @see app/Http/Controllers/HotelController.php:10
* @route '/{locale}/hotels'
*/
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/hotels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HotelController::index
* @see app/Http/Controllers/HotelController.php:10
* @route '/{locale}/hotels'
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
* @see \App\Http\Controllers\HotelController::index
* @see app/Http/Controllers/HotelController.php:10
* @route '/{locale}/hotels'
*/
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HotelController::index
* @see app/Http/Controllers/HotelController.php:10
* @route '/{locale}/hotels'
*/
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HotelController::show
* @see app/Http/Controllers/HotelController.php:21
* @route '/{locale}/hotels/{hotel}'
*/
export const show = (args: { locale: string | number, hotel: string | number | { slug: string | number } } | [locale: string | number, hotel: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/hotels/{hotel}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HotelController::show
* @see app/Http/Controllers/HotelController.php:21
* @route '/{locale}/hotels/{hotel}'
*/
show.url = (args: { locale: string | number, hotel: string | number | { slug: string | number } } | [locale: string | number, hotel: string | number | { slug: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            locale: args[0],
            hotel: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
        hotel: typeof args.hotel === 'object'
        ? args.hotel.slug
        : args.hotel,
    }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{hotel}', parsedArgs.hotel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HotelController::show
* @see app/Http/Controllers/HotelController.php:21
* @route '/{locale}/hotels/{hotel}'
*/
show.get = (args: { locale: string | number, hotel: string | number | { slug: string | number } } | [locale: string | number, hotel: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HotelController::show
* @see app/Http/Controllers/HotelController.php:21
* @route '/{locale}/hotels/{hotel}'
*/
show.head = (args: { locale: string | number, hotel: string | number | { slug: string | number } } | [locale: string | number, hotel: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const HotelController = { index, show }

export default HotelController