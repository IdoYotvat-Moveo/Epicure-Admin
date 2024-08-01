export type CardType = {
    title: string;
    img: string;
    type?: string
    content?: Content
}

export type IconProps = {
    type: string
    img: string
}

export type Content = {
    type?: string
    chef?: string;
    rating?: number;
    icons?: IconProps[]
    ingredients?: string[]
    price?: number
}

export enum EiconMeaning {
    SPICY = "spicy",
    VEGAN = "vegan",
    VEGETERIAN = "vegeterian"
}

export type Dish = {
    _id?: string
    title: string
    image?: string
    ingredients: string[]
    price: number
    restaurant: string | null
    icons: EiconMeaning[] | null
    isActive: boolean
}


export type Restaurant = {
    _id?: string
    name: string
    chef?: Chef | string | null | undefined
    image: string
    rating: number
    dishes: string[]
    signatureDish?: string | undefined | null
    isPopular?: boolean
}

export type Chef = {
    _id?: string
    name: string
    bio: string
    image?: string
    restaurants?: Restaurant[] | string[]
    isChefOfTheWeek: boolean
}

export type Entity = Chef | Dish | Restaurant;
export type EntityType = 'chef' | 'restaurant' | 'dish'


export interface UpdatePayload<T> {
    id: string;
    data: T;
}
export interface AddPayload<T> {
    data: T;
}
export interface RemovePayload {
    id: string;
}


