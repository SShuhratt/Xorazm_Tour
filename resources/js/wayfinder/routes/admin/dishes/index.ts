import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DishAdminController::index
* @see app/Http/Controllers/Admin/DishAdminController.php:16
* @route '/admin/dishes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dishes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DishAdminController::index
* @see app/Http/Controllers/Admin/DishAdminController.php:16
* @route '/admin/dishes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DishAdminController::index
* @see app/Http/Controllers/Admin/DishAdminController.php:16
* @route '/admin/dishes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::index
* @see app/Http/Controllers/Admin/DishAdminController.php:16
* @route '/admin/dishes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::create
* @see app/Http/Controllers/Admin/DishAdminController.php:27
* @route '/admin/dishes/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/dishes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DishAdminController::create
* @see app/Http/Controllers/Admin/DishAdminController.php:27
* @route '/admin/dishes/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DishAdminController::create
* @see app/Http/Controllers/Admin/DishAdminController.php:27
* @route '/admin/dishes/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::create
* @see app/Http/Controllers/Admin/DishAdminController.php:27
* @route '/admin/dishes/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::store
* @see app/Http/Controllers/Admin/DishAdminController.php:34
* @route '/admin/dishes'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/dishes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DishAdminController::store
* @see app/Http/Controllers/Admin/DishAdminController.php:34
* @route '/admin/dishes'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DishAdminController::store
* @see app/Http/Controllers/Admin/DishAdminController.php:34
* @route '/admin/dishes'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::edit
* @see app/Http/Controllers/Admin/DishAdminController.php:82
* @route '/admin/dishes/{dish}/edit'
*/
export const edit = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/dishes/{dish}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DishAdminController::edit
* @see app/Http/Controllers/Admin/DishAdminController.php:82
* @route '/admin/dishes/{dish}/edit'
*/
edit.url = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dish: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dish: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dish: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dish: typeof args.dish === 'object'
        ? args.dish.id
        : args.dish,
    }

    return edit.definition.url
            .replace('{dish}', parsedArgs.dish.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DishAdminController::edit
* @see app/Http/Controllers/Admin/DishAdminController.php:82
* @route '/admin/dishes/{dish}/edit'
*/
edit.get = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::edit
* @see app/Http/Controllers/Admin/DishAdminController.php:82
* @route '/admin/dishes/{dish}/edit'
*/
edit.head = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::update
* @see app/Http/Controllers/Admin/DishAdminController.php:91
* @route '/admin/dishes/{dish}'
*/
export const update = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/dishes/{dish}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\DishAdminController::update
* @see app/Http/Controllers/Admin/DishAdminController.php:91
* @route '/admin/dishes/{dish}'
*/
update.url = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dish: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dish: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dish: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dish: typeof args.dish === 'object'
        ? args.dish.id
        : args.dish,
    }

    return update.definition.url
            .replace('{dish}', parsedArgs.dish.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DishAdminController::update
* @see app/Http/Controllers/Admin/DishAdminController.php:91
* @route '/admin/dishes/{dish}'
*/
update.put = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::update
* @see app/Http/Controllers/Admin/DishAdminController.php:91
* @route '/admin/dishes/{dish}'
*/
update.patch = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\DishAdminController::destroy
* @see app/Http/Controllers/Admin/DishAdminController.php:139
* @route '/admin/dishes/{dish}'
*/
export const destroy = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/dishes/{dish}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\DishAdminController::destroy
* @see app/Http/Controllers/Admin/DishAdminController.php:139
* @route '/admin/dishes/{dish}'
*/
destroy.url = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dish: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dish: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dish: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dish: typeof args.dish === 'object'
        ? args.dish.id
        : args.dish,
    }

    return destroy.definition.url
            .replace('{dish}', parsedArgs.dish.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DishAdminController::destroy
* @see app/Http/Controllers/Admin/DishAdminController.php:139
* @route '/admin/dishes/{dish}'
*/
destroy.delete = (args: { dish: string | number | { id: string | number } } | [dish: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const dishes = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default dishes