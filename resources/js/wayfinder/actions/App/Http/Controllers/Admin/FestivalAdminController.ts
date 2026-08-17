import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::index
* @see app/Http/Controllers/Admin/FestivalAdminController.php:17
* @route '/admin/festivals'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/festivals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::index
* @see app/Http/Controllers/Admin/FestivalAdminController.php:17
* @route '/admin/festivals'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::index
* @see app/Http/Controllers/Admin/FestivalAdminController.php:17
* @route '/admin/festivals'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::index
* @see app/Http/Controllers/Admin/FestivalAdminController.php:17
* @route '/admin/festivals'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::create
* @see app/Http/Controllers/Admin/FestivalAdminController.php:28
* @route '/admin/festivals/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/festivals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::create
* @see app/Http/Controllers/Admin/FestivalAdminController.php:28
* @route '/admin/festivals/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::create
* @see app/Http/Controllers/Admin/FestivalAdminController.php:28
* @route '/admin/festivals/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::create
* @see app/Http/Controllers/Admin/FestivalAdminController.php:28
* @route '/admin/festivals/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::store
* @see app/Http/Controllers/Admin/FestivalAdminController.php:36
* @route '/admin/festivals'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/festivals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::store
* @see app/Http/Controllers/Admin/FestivalAdminController.php:36
* @route '/admin/festivals'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::store
* @see app/Http/Controllers/Admin/FestivalAdminController.php:36
* @route '/admin/festivals'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::edit
* @see app/Http/Controllers/Admin/FestivalAdminController.php:85
* @route '/admin/festivals/{festival}/edit'
*/
export const edit = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/festivals/{festival}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::edit
* @see app/Http/Controllers/Admin/FestivalAdminController.php:85
* @route '/admin/festivals/{festival}/edit'
*/
edit.url = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { festival: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { festival: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            festival: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        festival: typeof args.festival === 'object'
        ? args.festival.id
        : args.festival,
    }

    return edit.definition.url
            .replace('{festival}', parsedArgs.festival.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::edit
* @see app/Http/Controllers/Admin/FestivalAdminController.php:85
* @route '/admin/festivals/{festival}/edit'
*/
edit.get = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::edit
* @see app/Http/Controllers/Admin/FestivalAdminController.php:85
* @route '/admin/festivals/{festival}/edit'
*/
edit.head = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::update
* @see app/Http/Controllers/Admin/FestivalAdminController.php:95
* @route '/admin/festivals/{festival}'
*/
export const update = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/festivals/{festival}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::update
* @see app/Http/Controllers/Admin/FestivalAdminController.php:95
* @route '/admin/festivals/{festival}'
*/
update.url = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { festival: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { festival: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            festival: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        festival: typeof args.festival === 'object'
        ? args.festival.id
        : args.festival,
    }

    return update.definition.url
            .replace('{festival}', parsedArgs.festival.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::update
* @see app/Http/Controllers/Admin/FestivalAdminController.php:95
* @route '/admin/festivals/{festival}'
*/
update.put = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::update
* @see app/Http/Controllers/Admin/FestivalAdminController.php:95
* @route '/admin/festivals/{festival}'
*/
update.patch = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::destroy
* @see app/Http/Controllers/Admin/FestivalAdminController.php:144
* @route '/admin/festivals/{festival}'
*/
export const destroy = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/festivals/{festival}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::destroy
* @see app/Http/Controllers/Admin/FestivalAdminController.php:144
* @route '/admin/festivals/{festival}'
*/
destroy.url = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { festival: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { festival: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            festival: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        festival: typeof args.festival === 'object'
        ? args.festival.id
        : args.festival,
    }

    return destroy.definition.url
            .replace('{festival}', parsedArgs.festival.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FestivalAdminController::destroy
* @see app/Http/Controllers/Admin/FestivalAdminController.php:144
* @route '/admin/festivals/{festival}'
*/
destroy.delete = (args: { festival: string | number | { id: string | number } } | [festival: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const FestivalAdminController = { index, create, store, edit, update, destroy }

export default FestivalAdminController