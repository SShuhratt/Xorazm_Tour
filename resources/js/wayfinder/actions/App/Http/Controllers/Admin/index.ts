import DashboardAdminController from './DashboardAdminController'
import CityAdminController from './CityAdminController'
import TourAdminController from './TourAdminController'
import HotelAdminController from './HotelAdminController'
import FestivalAdminController from './FestivalAdminController'
import TransportAdminController from './TransportAdminController'
import PostAdminController from './PostAdminController'
import DishAdminController from './DishAdminController'
import ImageAdminController from './ImageAdminController'

const Admin = {
    DashboardAdminController: Object.assign(DashboardAdminController, DashboardAdminController),
    CityAdminController: Object.assign(CityAdminController, CityAdminController),
    TourAdminController: Object.assign(TourAdminController, TourAdminController),
    HotelAdminController: Object.assign(HotelAdminController, HotelAdminController),
    FestivalAdminController: Object.assign(FestivalAdminController, FestivalAdminController),
    TransportAdminController: Object.assign(TransportAdminController, TransportAdminController),
    PostAdminController: Object.assign(PostAdminController, PostAdminController),
    DishAdminController: Object.assign(DishAdminController, DishAdminController),
    ImageAdminController: Object.assign(ImageAdminController, ImageAdminController),
}

export default Admin