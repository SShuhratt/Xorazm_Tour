import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface FestivalTranslation {
    id: number;
    festival_id: number;
    locale: 'en' | 'ru' | 'uz';
    title: string;
    description: string;
    event_season?: string | null;
    festival_type?: string | null;
    highlight?: string | null;
}

export interface Festival {
    id: number;
    city_id?: number | null;
    slug: string;
    status: boolean;
    longitude: string | null;
    latitude: string | null;
    video_url?: string | null;
    translations: FestivalTranslation[];
    main_image?: Image;
    images?: Image[];
}

export interface ImageTranslation {
    id: number;
    image_id: number;
    locale: 'en' | 'ru' | 'uz';
    alt: string;
}

export interface Image {
    id: number;
    path: string;
    url?: string;
    is_main: boolean;
    order: number;
    imageable_id: number;
    imageable_type: string;
    translations?: ImageTranslation[];
}

export interface HotelRoom {
    type: string;
    spec: string;
    price: string;
}

export interface HotelTranslation {
    id: number;
    hotel_id: number;
    locale: 'en' | 'ru' | 'uz';
    title: string;
    address: string;
    description: string;
    amenities?: string[] | null;
    rooms?: HotelRoom[] | null;
}

export interface Hotel {
    id: number;
    city_id?: number | null;
    slug: string;
    status: boolean;
    phone_number: string | null;
    stars?: number | null;
    price_from?: number | string | null;
    email?: string | null;
    longitude: string | null;
    latitude: string | null;
    instagram_link: string | null;
    telegram_link: string | null;
    translations: HotelTranslation[];
    main_image?: Image;
    images?: Image[];
}

export interface TransportTranslation {
    id: number;
    transport_id: number;
    locale: 'en' | 'ru' | 'uz';
    name: string;
    description: string;
}

export interface Transport {
    id: number;
    slug: string;
    status: boolean;
    capacity: number;
    height: string | null;
    width: string | null;
    length: string | null;
    translations: TransportTranslation[];
    main_image?: Image;
    images?: Image[];
}

export interface TourScheduleTranslation {
    id: number;
    tour_schedule_id: number;
    locale: 'en' | 'ru' | 'uz';
    title: string;
    description: string;
}

export interface TourSchedule {
    id: number;
    tour_id: number;
    day: number;
    time: string | null;
    translations: TourScheduleTranslation[];
    main_image?: Image | null;
    images?: Image[];
}

export interface TourPricingTier {
    group_size: string;
    price_per_person: number | string;
}

export interface TourTranslation {
    id: number;
    tour_id: number;
    locale: 'en' | 'ru' | 'uz';
    title: string;
    route: string;
    custom_transport?: string | null;
    duration: string | number;
    description: string;
    included?: string[] | null;
    not_included?: string[] | null;
    pricing_tiers?: TourPricingTier[] | null;
}

export interface Tour {
    id: number;
    slug: string;
    status: string;
    category?: 'cultural' | 'adventure' | 'premium' | string | null;
    cost: number;
    max_group_size?: number | null;
    single_supplement?: number | string | null;
    pricing_tiers?: TourPricingTier[] | null;
    translations: TourTranslation[];
    schedules?: TourSchedule[];
    main_image?: Image;
    images?: Image[];
    cities?: City[];
    transports?: Transport[];
    hotels?: Hotel[];
}

export interface DishTranslation {
    id: number;
    dish_id: number;
    locale: 'en' | 'ru' | 'uz';
    name: string;
    origin?: string | null;
    type?: string | null;
    short_description: string;
    description: string;
    history?: string | null;
    ingredients?: string[] | null;
}

export interface Dish {
    id: number;
    slug: string;
    status: boolean;
    origin_region?: string | null;
    category?: string | null;
    translations: DishTranslation[];
    main_image?: Image;
    images?: Image[];
}

export interface CityHighlight {
    id?: number;
    title: string;
    description: string;
    image: string;
    time?: string;
}

export interface PostTranslation {
    id: number;
    post_id: number;
    locale: 'en' | 'ru' | 'uz';
    title: string;
    description: string;
}

export interface Post {
    id: number;
    slug: string;
    status: boolean;
    source_link: string | null;
    translations: PostTranslation[];
    main_image?: Image;
    images?: Image[];
}

export interface CityTranslation {
    id: number;
    city_id: number;
    locale: 'en' | 'ru' | 'uz';
    name: string;
    description: string;
    era?: string | null;
    heritage_status?: string | null;
    recommended_time?: string | null;
    highlights?: CityHighlight[] | null;
}

export interface City {
    id: number;
    slug: string;
    status: boolean;
    longitude: string | null;
    latitude: string | null;
    translations: CityTranslation[];
    main_image?: Image;
    images?: Image[];
    tours?: Tour[];
}

import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface PageProps extends InertiaPageProps {
    locale: 'en' | 'ru' | 'uz';
    auth: Auth;
    flash?: {
        message?: string | null;
        success?: string | null;
        error?: string | null;
    };
}

