import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HotelAdminController::index
* @see app/Http/Controllers/Admin/HotelAdminController.php:17
* @route '/admin/hotels'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/hotels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::index
* @see app/Http/Controllers/Admin/HotelAdminController.php:17
* @route '/admin/hotels'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::index
* @see app/Http/Controllers/Admin/HotelAdminController.php:17
* @route '/admin/hotels'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::index
* @see app/Http/Controllers/Admin/HotelAdminController.php:17
* @route '/admin/hotels'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::create
* @see app/Http/Controllers/Admin/HotelAdminController.php:28
* @route '/admin/hotels/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/hotels/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::create
* @see app/Http/Controllers/Admin/HotelAdminController.php:28
* @route '/admin/hotels/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::create
* @see app/Http/Controllers/Admin/HotelAdminController.php:28
* @route '/admin/hotels/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::create
* @see app/Http/Controllers/Admin/HotelAdminController.php:28
* @route '/admin/hotels/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::store
* @see app/Http/Controllers/Admin/HotelAdminController.php:36
* @route '/admin/hotels'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/hotels',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::store
* @see app/Http/Controllers/Admin/HotelAdminController.php:36
* @route '/admin/hotels'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::store
* @see app/Http/Controllers/Admin/HotelAdminController.php:36
* @route '/admin/hotels'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::edit
* @see app/Http/Controllers/Admin/HotelAdminController.php:92
* @route '/admin/hotels/{hotel}/edit'
*/
export const edit = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/hotels/{hotel}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::edit
* @see app/Http/Controllers/Admin/HotelAdminController.php:92
* @route '/admin/hotels/{hotel}/edit'
*/
edit.url = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hotel: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { hotel: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            hotel: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        hotel: typeof args.hotel === 'object'
        ? args.hotel.id
        : args.hotel,
    }

    return edit.definition.url
            .replace('{hotel}', parsedArgs.hotel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::edit
* @see app/Http/Controllers/Admin/HotelAdminController.php:92
* @route '/admin/hotels/{hotel}/edit'
*/
edit.get = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::edit
* @see app/Http/Controllers/Admin/HotelAdminController.php:92
* @route '/admin/hotels/{hotel}/edit'
*/
edit.head = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::update
* @see app/Http/Controllers/Admin/HotelAdminController.php:102
* @route '/admin/hotels/{hotel}'
*/
export const update = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/hotels/{hotel}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::update
* @see app/Http/Controllers/Admin/HotelAdminController.php:102
* @route '/admin/hotels/{hotel}'
*/
update.url = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hotel: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { hotel: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            hotel: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        hotel: typeof args.hotel === 'object'
        ? args.hotel.id
        : args.hotel,
    }

    return update.definition.url
            .replace('{hotel}', parsedArgs.hotel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::update
* @see app/Http/Controllers/Admin/HotelAdminController.php:102
* @route '/admin/hotels/{hotel}'
*/
update.put = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::update
* @see app/Http/Controllers/Admin/HotelAdminController.php:102
* @route '/admin/hotels/{hotel}'
*/
update.patch = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::destroy
* @see app/Http/Controllers/Admin/HotelAdminController.php:158
* @route '/admin/hotels/{hotel}'
*/
export const destroy = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/hotels/{hotel}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::destroy
* @see app/Http/Controllers/Admin/HotelAdminController.php:158
* @route '/admin/hotels/{hotel}'
*/
destroy.url = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hotel: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { hotel: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            hotel: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        hotel: typeof args.hotel === 'object'
        ? args.hotel.id
        : args.hotel,
    }

    return destroy.definition.url
            .replace('{hotel}', parsedArgs.hotel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HotelAdminController::destroy
* @see app/Http/Controllers/Admin/HotelAdminController.php:158
* @route '/admin/hotels/{hotel}'
*/
destroy.delete = (args: { hotel: string | number | { id: string | number } } | [hotel: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const hotels = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default hotels