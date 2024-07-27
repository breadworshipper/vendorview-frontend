import { atom } from "jotai";

export interface vendor {
    name: string,
    tag: string,
}

interface currentSelectedVendor extends vendor {
}

export const currentSelectedVendorAtom = atom<currentSelectedVendor | null>(null)