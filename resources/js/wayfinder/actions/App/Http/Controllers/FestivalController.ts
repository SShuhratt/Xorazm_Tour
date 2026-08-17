import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FestivalController::index
* @see app/Http/Controllers/FestivalController.php:10
* @route '/{locale}/festivals'
*/
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/festivals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FestivalController::index
* @see app/Http/Controllers/FestivalController.php:10
* @route '/{locale}/festivals'
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
* @see \App\Http\Controllers\FestivalController::index
* @see app/Http/Controllers/FestivalController.php:10
* @route '/{locale}/festivals'
*/
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FestivalController::index
* @see app/Http/Controllers/FestivalController.php:10
* @route '/{locale}/festivals'
*/
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FestivalController::show
* @see app/Http/Controllers/FestivalController.php:21
* @route '/{locale}/festivals/{festival}'
*/
export const show = (args: { locale: string | number, festival: string | number | { slug: string | number } } | [locale: string | number, festival: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/festivals/{festival}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FestivalController::show
* @see app/Http/Controllers/FestivalController.php:21
* @route '/{locale}/festivals/{festival}'
*/
show.url = (args: { locale: string | number, festival: string | number | { slug: string | number } } | [locale: string | number, festival: string | number | { slug: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            locale: args[0],
            festival: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
        festival: typeof args.festival === 'object'
        ? args.festival.slug
        : args.festival,
    }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{festival}', parsedArgs.festival.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FestivalController::show
* @see app/Http/Controllers/FestivalController.php:21
* @route '/{locale}/festivals/{festival}'
*/
show.get = (args: { locale: string | number, festival: string | number | { slug: string | number } } | [locale: string | number, festival: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FestivalController::show
* @see app/Http/Controllers/FestivalController.php:21
* @route '/{locale}/festivals/{festival}'
*/
show.head = (args: { locale: string | number, festival: string | number | { slug: string | number } } | [locale: string | number, festival: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const FestivalController = { index, show }

export default FestivalController