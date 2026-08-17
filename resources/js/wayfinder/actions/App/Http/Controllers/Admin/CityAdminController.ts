import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CityAdminController::index
* @see app/Http/Controllers/Admin/CityAdminController.php:16
* @route '/admin/cities'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/cities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CityAdminController::index
* @see app/Http/Controllers/Admin/CityAdminController.php:16
* @route '/admin/cities'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CityAdminController::index
* @see app/Http/Controllers/Admin/CityAdminController.php:16
* @route '/admin/cities'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::index
* @see app/Http/Controllers/Admin/CityAdminController.php:16
* @route '/admin/cities'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::create
* @see app/Http/Controllers/Admin/CityAdminController.php:27
* @route '/admin/cities/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/cities/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CityAdminController::create
* @see app/Http/Controllers/Admin/CityAdminController.php:27
* @route '/admin/cities/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CityAdminController::create
* @see app/Http/Controllers/Admin/CityAdminController.php:27
* @route '/admin/cities/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::create
* @see app/Http/Controllers/Admin/CityAdminController.php:27
* @route '/admin/cities/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::store
* @see app/Http/Controllers/Admin/CityAdminController.php:34
* @route '/admin/cities'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/cities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CityAdminController::store
* @see app/Http/Controllers/Admin/CityAdminController.php:34
* @route '/admin/cities'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CityAdminController::store
* @see app/Http/Controllers/Admin/CityAdminController.php:34
* @route '/admin/cities'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::edit
* @see app/Http/Controllers/Admin/CityAdminController.php:86
* @route '/admin/cities/{city}/edit'
*/
export const edit = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/cities/{city}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CityAdminController::edit
* @see app/Http/Controllers/Admin/CityAdminController.php:86
* @route '/admin/cities/{city}/edit'
*/
edit.url = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { city: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            city: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        city: typeof args.city === 'object'
        ? args.city.id
        : args.city,
    }

    return edit.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CityAdminController::edit
* @see app/Http/Controllers/Admin/CityAdminController.php:86
* @route '/admin/cities/{city}/edit'
*/
edit.get = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::edit
* @see app/Http/Controllers/Admin/CityAdminController.php:86
* @route '/admin/cities/{city}/edit'
*/
edit.head = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::update
* @see app/Http/Controllers/Admin/CityAdminController.php:95
* @route '/admin/cities/{city}'
*/
export const update = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/cities/{city}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CityAdminController::update
* @see app/Http/Controllers/Admin/CityAdminController.php:95
* @route '/admin/cities/{city}'
*/
update.url = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { city: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            city: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        city: typeof args.city === 'object'
        ? args.city.id
        : args.city,
    }

    return update.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CityAdminController::update
* @see app/Http/Controllers/Admin/CityAdminController.php:95
* @route '/admin/cities/{city}'
*/
update.put = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::update
* @see app/Http/Controllers/Admin/CityAdminController.php:95
* @route '/admin/cities/{city}'
*/
update.patch = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\CityAdminController::destroy
* @see app/Http/Controllers/Admin/CityAdminController.php:140
* @route '/admin/cities/{city}'
*/
export const destroy = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/cities/{city}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CityAdminController::destroy
* @see app/Http/Controllers/Admin/CityAdminController.php:140
* @route '/admin/cities/{city}'
*/
destroy.url = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { city: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            city: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        city: typeof args.city === 'object'
        ? args.city.id
        : args.city,
    }

    return destroy.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CityAdminController::destroy
* @see app/Http/Controllers/Admin/CityAdminController.php:140
* @route '/admin/cities/{city}'
*/
destroy.delete = (args: { city: string | number | { id: string | number } } | [city: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const CityAdminController = { index, create, store, edit, update, destroy }

export default CityAdminController