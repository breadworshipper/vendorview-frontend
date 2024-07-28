import { atom } from "jotai";

interface currentUser {
  id: number;
  email: string;
  name: string;
  is_street_vendor: boolean;
}

export const userAtom = atom<currentUser | null>(null);
