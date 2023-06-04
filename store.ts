import { atom } from "jotai";

//create new atom for Kudo
interface KudoAtom {
    sender: string;
    receiver: string[];
    message: string[];
    gif: any;
}

export const kudoAtom = atom<KudoAtom>({
    sender: "Siran",
    receiver: [],
    message: [],
    gif: null,
})