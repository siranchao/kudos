import { atom } from "jotai";


export const receiverAtom = atom<string[]>([]);

export const gifIdAtom  = atom<string>("");

export const newMessageAtom  = atom<string[]>([]);

export const senderAtom  = atom<string>("Siran");