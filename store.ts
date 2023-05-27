import { atom } from "jotai";

//create new atom for Kudo
interface KudoAtom {
    gif: any;
    sender: string;
    receiver: string[];
    newMessage: string[];
}

export const kudoAtom = atom<KudoAtom>({
    gif: null,
    sender: "Siran",
    receiver: [],
    newMessage: [],
})