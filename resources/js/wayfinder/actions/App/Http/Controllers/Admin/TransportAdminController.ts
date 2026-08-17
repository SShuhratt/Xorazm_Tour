import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TransportAdminController::index
* @see app/Http/Controllers/Admin/TransportAdminController.php:16
* @route '/admin/transports'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/transports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::index
* @see app/Http/Controllers/Admin/TransportAdminController.php:16
* @route '/admin/transports'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::index
* @see app/Http/Controllers/Admin/TransportAdminController.php:16
* @route '/admin/transports'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::index
* @see app/Http/Controllers/Admin/TransportAdminController.php:16
* @route '/admin/transports'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::create
* @see app/Http/Controllers/Admin/TransportAdminController.php:27
* @route '/admin/transports/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/transports/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::create
* @see app/Http/Controllers/Admin/TransportAdminController.php:27
* @route '/admin/transports/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::create
* @see app/Http/Controllers/Admin/TransportAdminController.php:27
* @route '/admin/transports/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::create
* @see app/Http/Controllers/Admin/TransportAdminController.php:27
* @route '/admin/transports/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::store
* @see app/Http/Controllers/Admin/TransportAdminController.php:34
* @route '/admin/transports'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/transports',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::store
* @see app/Http/Controllers/Admin/TransportAdminController.php:34
* @route '/admin/transports'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::store
* @see app/Http/Controllers/Admin/TransportAdminController.php:34
* @route '/admin/transports'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::edit
* @see app/Http/Controllers/Admin/TransportAdminController.php:85
* @route '/admin/transports/{transport}/edit'
*/
export const edit = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/transports/{transport}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::edit
* @see app/Http/Controllers/Admin/TransportAdminController.php:85
* @route '/admin/transports/{transport}/edit'
*/
edit.url = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { transport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            transport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        transport: typeof args.transport === 'object'
        ? args.transport.id
        : args.transport,
    }

    return edit.definition.url
            .replace('{transport}', parsedArgs.transport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::edit
* @see app/Http/Controllers/Admin/TransportAdminController.php:85
* @route '/admin/transports/{transport}/edit'
*/
edit.get = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::edit
* @see app/Http/Controllers/Admin/TransportAdminController.php:85
* @route '/admin/transports/{transport}/edit'
*/
edit.head = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::update
* @see app/Http/Controllers/Admin/TransportAdminController.php:94
* @route '/admin/transports/{transport}'
*/
export const update = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/transports/{transport}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::update
* @see app/Http/Controllers/Admin/TransportAdminController.php:94
* @route '/admin/transports/{transport}'
*/
update.url = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { transport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            transport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        transport: typeof args.transport === 'object'
        ? args.transport.id
        : args.transport,
    }

    return update.definition.url
            .replace('{transport}', parsedArgs.transport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::update
* @see app/Http/Controllers/Admin/TransportAdminController.php:94
* @route '/admin/transports/{transport}'
*/
update.put = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::update
* @see app/Http/Controllers/Admin/TransportAdminController.php:94
* @route '/admin/transports/{transport}'
*/
update.patch = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::destroy
* @see app/Http/Controllers/Admin/TransportAdminController.php:145
* @route '/admin/transports/{transport}'
*/
export const destroy = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/transports/{transport}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::destroy
* @see app/Http/Controllers/Admin/TransportAdminController.php:145
* @route '/admin/transports/{transport}'
*/
destroy.url = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { transport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            transport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        transport: typeof args.transport === 'object'
        ? args.transport.id
        : args.transport,
    }

    return destroy.definition.url
            .replace('{transport}', parsedArgs.transport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransportAdminController::destroy
* @see app/Http/Controllers/Admin/TransportAdminController.php:145
* @route '/admin/transports/{transport}'
*/
destroy.delete = (args: { transport: string | number | { id: string | number } } | [transport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const TransportAdminController = { index, create, store, edit, update, destroy }

export default TransportAdminController