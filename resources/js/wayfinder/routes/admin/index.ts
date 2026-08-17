import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import cities from './cities'
import tours from './tours'
import hotels from './hotels'
import festivals from './festivals'
import transports from './transports'
import posts from './posts'
import dishes from './dishes'
import images from './images'
/**
* @see \App\Http\Controllers\Admin\DashboardAdminController::dashboard
* @see app/Http/Controllers/Admin/DashboardAdminController.php:18
* @route '/admin/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardAdminController::dashboard
* @see app/Http/Controllers/Admin/DashboardAdminController.php:18
* @route '/admin/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardAdminController::dashboard
* @see app/Http/Controllers/Admin/DashboardAdminController.php:18
* @route '/admin/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DashboardAdminController::dashboard
* @see app/Http/Controllers/Admin/DashboardAdminController.php:18
* @route '/admin/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const admin = {
    dashboard: Object.assign(dashboard, dashboard),
    cities: Object.assign(cities, cities),
    tours: Object.assign(tours, tours),
    hotels: Object.assign(hotels, hotels),
    festivals: Object.assign(festivals, festivals),
    transports: Object.assign(transports, transports),
    posts: Object.assign(posts, posts),
    dishes: Object.assign(dishes, dishes),
    images: Object.assign(images, images),
}

export default admin