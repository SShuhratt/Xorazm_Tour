import LanguageController from './LanguageController'
import HomeController from './HomeController'
import TourController from './TourController'
import CityController from './CityController'
import FestivalController from './FestivalController'
import HotelController from './HotelController'
import TransportController from './TransportController'
import PostController from './PostController'
import DishController from './DishController'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    LanguageController: Object.assign(LanguageController, LanguageController),
    HomeController: Object.assign(HomeController, HomeController),
    TourController: Object.assign(TourController, TourController),
    CityController: Object.assign(CityController, CityController),
    FestivalController: Object.assign(FestivalController, FestivalController),
    HotelController: Object.assign(HotelController, HotelController),
    TransportController: Object.assign(TransportController, TransportController),
    PostController: Object.assign(PostController, PostController),
    DishController: Object.assign(DishController, DishController),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers