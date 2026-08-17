import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DishController::index
* @see app/Http/Controllers/DishController.php:10
* @route '/{locale}/dishes'
*/
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/dishes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DishController::index
* @see app/Http/Controllers/DishController.php:10
* @route '/{locale}/dishes'
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
* @see \App\Http\Controllers\DishController::index
* @see app/Http/Controllers/DishController.php:10
* @route '/{locale}/dishes'
*/
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DishController::index
* @see app/Http/Controllers/DishController.php:10
* @route '/{locale}/dishes'
*/
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DishController::show
* @see app/Http/Controllers/DishController.php:22
* @route '/{locale}/dishes/{slug}'
*/
export const show = (args: { locale: string | number, slug: string | number } | [locale: string | number, slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/dishes/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DishController::show
* @see app/Http/Controllers/DishController.php:22
* @route '/{locale}/dishes/{slug}'
*/
show.url = (args: { locale: string | number, slug: string | number } | [locale: string | number, slug: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            locale: args[0],
            slug: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
        slug: args.slug,
    }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DishController::show
* @see app/Http/Controllers/DishController.php:22
* @route '/{locale}/dishes/{slug}'
*/
show.get = (args: { locale: string | number, slug: string | number } | [locale: string | number, slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DishController::show
* @see app/Http/Controllers/DishController.php:22
* @route '/{locale}/dishes/{slug}'
*/
show.head = (args: { locale: string | number, slug: string | number } | [locale: string | number, slug: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const dishes = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default dishes