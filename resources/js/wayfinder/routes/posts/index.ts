import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PostController::index
* @see app/Http/Controllers/PostController.php:14
* @route '/{locale}/posts'
*/
export const index = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{locale}/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PostController::index
* @see app/Http/Controllers/PostController.php:14
* @route '/{locale}/posts'
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
* @see \App\Http\Controllers\PostController::index
* @see app/Http/Controllers/PostController.php:14
* @route '/{locale}/posts'
*/
index.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PostController::index
* @see app/Http/Controllers/PostController.php:14
* @route '/{locale}/posts'
*/
index.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:44
* @route '/{locale}/posts/{post}'
*/
export const show = (args: { locale: string | number, post: string | number | { slug: string | number } } | [locale: string | number, post: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{locale}/posts/{post}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:44
* @route '/{locale}/posts/{post}'
*/
show.url = (args: { locale: string | number, post: string | number | { slug: string | number } } | [locale: string | number, post: string | number | { slug: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            locale: args[0],
            post: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locale: args.locale,
        post: typeof args.post === 'object'
        ? args.post.slug
        : args.post,
    }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:44
* @route '/{locale}/posts/{post}'
*/
show.get = (args: { locale: string | number, post: string | number | { slug: string | number } } | [locale: string | number, post: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:44
* @route '/{locale}/posts/{post}'
*/
show.head = (args: { locale: string | number, post: string | number | { slug: string | number } } | [locale: string | number, post: string | number | { slug: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const posts = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default posts