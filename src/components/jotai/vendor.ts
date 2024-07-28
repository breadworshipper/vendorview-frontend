import { atom } from "jotai";

export interface vendor {
    id: number,
    name: string,
    tag: string,
    tagId: number,
}

export interface NearbyVendor extends vendor {
    distance: number,
    lat: number,
    lng: number
}

export interface VendorItem {
    id: number,
    price: number,
    image_base64: string,
    street_vendor_id: number,
    name: string,
    description: string,
}
export interface currentSelectedVendor extends vendor {
    menu: VendorItem[]
}

export const currentSelectedVendorAtom = atom<currentSelectedVendor | null>(null)