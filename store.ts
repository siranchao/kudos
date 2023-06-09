import { atom } from "jotai";

//create new atom for Kudo
interface KudoAtom {
    receiver: string[];
    message: string[];
    gif: any;
}

export const kudoAtom = atom<KudoAtom>({
    receiver: [],
    message: [],
    gif: null,
})