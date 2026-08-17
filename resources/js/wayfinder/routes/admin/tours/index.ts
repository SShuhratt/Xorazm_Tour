import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TourAdminController::index
* @see app/Http/Controllers/Admin/TourAdminController.php:21
* @route '/admin/tours'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tours',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TourAdminController::index
* @see app/Http/Controllers/Admin/TourAdminController.php:21
* @route '/admin/tours'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TourAdminController::index
* @see app/Http/Controllers/Admin/TourAdminController.php:21
* @route '/admin/tours'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::index
* @see app/Http/Controllers/Admin/TourAdminController.php:21
* @route '/admin/tours'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::create
* @see app/Http/Controllers/Admin/TourAdminController.php:32
* @route '/admin/tours/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/tours/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TourAdminController::create
* @see app/Http/Controllers/Admin/TourAdminController.php:32
* @route '/admin/tours/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TourAdminController::create
* @see app/Http/Controllers/Admin/TourAdminController.php:32
* @route '/admin/tours/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::create
* @see app/Http/Controllers/Admin/TourAdminController.php:32
* @route '/admin/tours/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::store
* @see app/Http/Controllers/Admin/TourAdminController.php:42
* @route '/admin/tours'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tours',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TourAdminController::store
* @see app/Http/Controllers/Admin/TourAdminController.php:42
* @route '/admin/tours'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TourAdminController::store
* @see app/Http/Controllers/Admin/TourAdminController.php:42
* @route '/admin/tours'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::edit
* @see app/Http/Controllers/Admin/TourAdminController.php:138
* @route '/admin/tours/{tour}/edit'
*/
export const edit = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/tours/{tour}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TourAdminController::edit
* @see app/Http/Controllers/Admin/TourAdminController.php:138
* @route '/admin/tours/{tour}/edit'
*/
edit.url = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tour: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tour: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tour: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tour: typeof args.tour === 'object'
        ? args.tour.id
        : args.tour,
    }

    return edit.definition.url
            .replace('{tour}', parsedArgs.tour.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TourAdminController::edit
* @see app/Http/Controllers/Admin/TourAdminController.php:138
* @route '/admin/tours/{tour}/edit'
*/
edit.get = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::edit
* @see app/Http/Controllers/Admin/TourAdminController.php:138
* @route '/admin/tours/{tour}/edit'
*/
edit.head = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::update
* @see app/Http/Controllers/Admin/TourAdminController.php:150
* @route '/admin/tours/{tour}'
*/
export const update = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/tours/{tour}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TourAdminController::update
* @see app/Http/Controllers/Admin/TourAdminController.php:150
* @route '/admin/tours/{tour}'
*/
update.url = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tour: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tour: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tour: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tour: typeof args.tour === 'object'
        ? args.tour.id
        : args.tour,
    }

    return update.definition.url
            .replace('{tour}', parsedArgs.tour.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TourAdminController::update
* @see app/Http/Controllers/Admin/TourAdminController.php:150
* @route '/admin/tours/{tour}'
*/
update.put = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::update
* @see app/Http/Controllers/Admin/TourAdminController.php:150
* @route '/admin/tours/{tour}'
*/
update.patch = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TourAdminController::destroy
* @see app/Http/Controllers/Admin/TourAdminController.php:247
* @route '/admin/tours/{tour}'
*/
export const destroy = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/tours/{tour}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TourAdminController::destroy
* @see app/Http/Controllers/Admin/TourAdminController.php:247
* @route '/admin/tours/{tour}'
*/
destroy.url = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tour: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tour: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tour: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tour: typeof args.tour === 'object'
        ? args.tour.id
        : args.tour,
    }

    return destroy.definition.url
            .replace('{tour}', parsedArgs.tour.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TourAdminController::destroy
* @see app/Http/Controllers/Admin/TourAdminController.php:247
* @route '/admin/tours/{tour}'
*/
destroy.delete = (args: { tour: string | number | { id: string | number } } | [tour: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const tours = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default tours