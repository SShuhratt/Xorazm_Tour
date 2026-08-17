import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LanguageController::switchMethod
* @see app/Http/Controllers/LanguageController.php:11
* @route '/language/{locale}'
*/
export const switchMethod = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: switchMethod.url(args, options),
    method: 'get',
})

switchMethod.definition = {
    methods: ["get","head"],
    url: '/language/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LanguageController::switchMethod
* @see app/Http/Controllers/LanguageController.php:11
* @route '/language/{locale}'
*/
switchMethod.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return switchMethod.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LanguageController::switchMethod
* @see app/Http/Controllers/LanguageController.php:11
* @route '/language/{locale}'
*/
switchMethod.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: switchMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LanguageController::switchMethod
* @see app/Http/Controllers/LanguageController.php:11
* @route '/language/{locale}'
*/
switchMethod.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: switchMethod.url(args, options),
    method: 'head',
})

const LanguageController = { switchMethod, switch: switchMethod }

export default LanguageController