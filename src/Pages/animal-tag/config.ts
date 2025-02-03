import {Asset, EditContext} from "../../components/baby-journal-settings";

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}

interface Contact {
    name: string,
    phone: string,
    email: string,
    address: string,
}

interface ContactEditor {
    name: EditContext<string>;
    phone: EditContext<string>;
    email: EditContext<string>;
    address: EditContext<string>;
}

export interface AnimalTagConfig {
    photo: Asset[]
    name: string;
    breed: string;
    age: string;
    weight: string;
    color: string;
    gender: Gender;
    height: string;
    ownerMessage: string;
    contact: Contact
    isLost: boolean;
}

export interface AnimalTagHandler {
    photo: EditContext<Asset[]>
    name: EditContext<string>;
    breed: EditContext<string>;
    age: EditContext<string>;
    weight: EditContext<string>;
    color: EditContext<string>;
    gender: EditContext<Gender>
    height: EditContext<string>;
    ownerMessage: EditContext<string>;
    contact: ContactEditor;
    isLost: EditContext<boolean>;
}

const defaultContact: Contact = {
    name: "",
    phone: "",
    email: "",
    address: "",
}

export const defaultAnimalTagConfig: AnimalTagConfig = {
    photo: [],
    name: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    gender: Gender.MALE,
    height: "",
    ownerMessage: "",
    contact: defaultContact,
    isLost: false,
}

