import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ImageAdminController::upload
* @see app/Http/Controllers/Admin/ImageAdminController.php:15
* @route '/admin/images/upload'
*/
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/admin/images/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ImageAdminController::upload
* @see app/Http/Controllers/Admin/ImageAdminController.php:15
* @route '/admin/images/upload'
*/
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImageAdminController::upload
* @see app/Http/Controllers/Admin/ImageAdminController.php:15
* @route '/admin/images/upload'
*/
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ImageAdminController::destroy
* @see app/Http/Controllers/Admin/ImageAdminController.php:53
* @route '/admin/images/{image}'
*/
export const destroy = (args: { image: string | number | { id: string | number } } | [image: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/images/{image}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ImageAdminController::destroy
* @see app/Http/Controllers/Admin/ImageAdminController.php:53
* @route '/admin/images/{image}'
*/
destroy.url = (args: { image: string | number | { id: string | number } } | [image: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { image: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { image: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            image: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        image: typeof args.image === 'object'
        ? args.image.id
        : args.image,
    }

    return destroy.definition.url
            .replace('{image}', parsedArgs.image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImageAdminController::destroy
* @see app/Http/Controllers/Admin/ImageAdminController.php:53
* @route '/admin/images/{image}'
*/
destroy.delete = (args: { image: string | number | { id: string | number } } | [image: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ImageAdminController::setMain
* @see app/Http/Controllers/Admin/ImageAdminController.php:68
* @route '/admin/images/{image}/set-main'
*/
export const setMain = (args: { image: string | number | { id: string | number } } | [image: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setMain.url(args, options),
    method: 'post',
})

setMain.definition = {
    methods: ["post"],
    url: '/admin/images/{image}/set-main',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ImageAdminController::setMain
* @see app/Http/Controllers/Admin/ImageAdminController.php:68
* @route '/admin/images/{image}/set-main'
*/
setMain.url = (args: { image: string | number | { id: string | number } } | [image: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { image: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { image: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            image: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        image: typeof args.image === 'object'
        ? args.image.id
        : args.image,
    }

    return setMain.definition.url
            .replace('{image}', parsedArgs.image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImageAdminController::setMain
* @see app/Http/Controllers/Admin/ImageAdminController.php:68
* @route '/admin/images/{image}/set-main'
*/
setMain.post = (args: { image: string | number | { id: string | number } } | [image: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setMain.url(args, options),
    method: 'post',
})

const images = {
    upload: Object.assign(upload, upload),
    destroy: Object.assign(destroy, destroy),
    setMain: Object.assign(setMain, setMain),
}

export default images