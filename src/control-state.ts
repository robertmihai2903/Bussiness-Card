import {Preview} from "./Pages/admin";
import {useContext} from "react";
import {ManageProductContext} from "./contexts";

export const defaultProduct: Product = {
    name: '',
    activated: true,
    preview: Preview.BUSINESS_CARD,
    unlockcode: '',
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phoneNumber: '',
    country: '',
    address: '',
    address2: '',
    zipCode: '',
    city: '',
    linkedIn: '',
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    about: '',
    companyName: '',
    companyRegNumber: '',
    companyAddress: '',
    companyCity: '',
    companyCountry: '',
    companyPhoneNumber: '',
    companyAbout: '',
    customLink: '',
    filename1: '',
    filename2: '',
    filename3: '',
    cv: false,
    website: '',
    youtubeLink: '',
    publicPagePassword: '',
    publicPagePasswordActivated: false,
    color1: '#ffffff',
    color2: '#ffffff',
}

export interface Product {
    name: string
    activated: boolean,
    preview: Preview
    unlockcode: string,
    firstName: string,
    lastName: string,
    title: string,
    email: string,
    phoneNumber: string,
    country: string,
    address: string,
    address2: string,
    zipCode: string,
    city: string,
    linkedIn: string,
    instagram: string,
    facebook: string,
    youtube: string,
    tiktok: string,
    about: string
    companyName: string,
    companyRegNumber: string,
    companyAddress: string,
    companyCity: string,
    companyCountry: string,
    companyPhoneNumber: string,
    companyAbout: string,
    customLink: string,
    filename1: string,
    filename2: string,
    filename3: string,
    cv: boolean,
    website: string,
    youtubeLink: string
    publicPagePassword: string,
    publicPagePasswordActivated: boolean,
    color1: string,
    color2: string
}

export const useEditState = () => {
    const {productState: state, setProductState: setState, invalidFields} = useContext(ManageProductContext)

    return {
        name: {
            value: state.name,
            onChange: (name: string) => {
                setState((prev: Product) => ({...prev, name}))
            }
        },
        firstName: {
            value: state.firstName,
            onChange: (firstName: string) => {
                setState((prev: Product) => ({...prev, firstName}))
            }
        },
        lastName: {
            value: state.lastName,
            onChange: (lastName: string) => {
                setState((prev: Product) => ({...prev, lastName}))
            }
        },
        title: {
            value: state.title,
            onChange: (title: string) => {
                setState((prev: Product) => ({...prev, title}))
            }
        },
        address: {
            value: state.address,
            onChange: (address: string) => {
                setState((prev: Product) => ({...prev, address}))
            }
        },
        email: {
            value: state.email,
            onChange: (email: string) => {
                setState((prev: Product) => ({...prev, email}))
            }
        },
        phoneNumber: {
            value: state.phoneNumber,
            onChange: (phoneNumber: string) => {
                setState((prev: Product) => ({...prev, phoneNumber}))
            }
        },
        country: {
            value: state.country,
            onChange: (country: string) => {
                setState((prev: Product) => ({...prev, country}))
            }
        },
        address2: {
            value: state.address2,
            onChange: (address2: string) => {
                setState((prev: Product) => ({...prev, address2}))
            }
        },
        zipCode: {
            value: state.zipCode,
            onChange: (zipCode: string) => {
                setState((prev: Product) => ({...prev, zipCode}))
            }
        },
        city: {
            value: state.city,
            onChange: (city: string) => {
                setState((prev: Product) => ({...prev, city}))
            }
        },
        linkedIn: {
            value: state.linkedIn,
            onChange: (linkedIn: string) => {
                setState((prev: Product) => ({...prev, linkedIn}))
            }
        },
        instagram: {
            value: state.instagram,
            onChange: (instagram: string) => {
                setState((prev: Product) => ({...prev, instagram}))
            }
        },
        facebook: {
            value: state.facebook,
            onChange: (facebook: string) => {
                setState((prev: Product) => ({...prev, facebook}))
            }
        },
        tiktok: {
            value: state.tiktok,
            onChange: (tiktok: string) => {
                setState((prev: Product) => ({...prev, tiktok}))
            }
        },
        youtube: {
            value: state.youtube,
            onChange: (youtube: string) => {
                setState((prev: Product) => ({...prev, youtube}))
            }
        },
        about: {
            value: state.about,
            onChange: (about: string) => {
                setState((prev: Product) => ({...prev, about}))
            }
        },
        companyName: {
            value: state.companyName,
            onChange: (companyName: string) => {
                setState((prev: Product) => ({...prev, companyName}))
            }
        },
        companyRegNumber: {
            value: state.companyRegNumber,
            onChange: (companyRegNumber: string) => {
                setState((prev: Product) => ({...prev, companyRegNumber}))
            }
        },
        companyAddress: {
            value: state.companyAddress,
            onChange: (companyAddress: string) => {
                setState((prev: Product) => ({...prev, companyAddress}))
            }
        },
        companyCity: {
            value: state.companyCity,
            onChange: (companyCity: string) => {
                setState((prev: Product) => ({...prev, companyCity}))
            }
        },
        companyCountry: {
            value: state.companyCountry,
            onChange: (companyCountry: string) => {
                setState((prev: Product) => ({...prev, companyCountry}))
            }
        },
        companyPhoneNumber: {
            value: state.companyPhoneNumber,
            onChange: (companyPhoneNumber: string) => {
                setState((prev: Product) => ({...prev, companyPhoneNumber}))
            }
        },
        companyAbout: {
            value: state.companyAbout,
            onChange: (companyAbout: string) => {
                setState((prev: Product) => ({...prev, companyAbout}))
            }
        },

        customLink: {
            value: state.customLink,
            onChange: (customLink: string) => {
                setState((prev: Product) => ({...prev, customLink}))
            }
        },
        filename1: {
            value: state.filename1,
            onChange: (filename1: string) => {
                setState((prev: Product) => ({...prev, filename1}))
            }
        },
        filename2: {
            value: state.filename2,
            onChange: (filename2: string) => {
                setState((prev: Product) => ({...prev, filename2}))
            }
        },
        filename3: {
            value: state.filename3,
            onChange: (filename3: string) => {
                setState((prev: Product) => ({...prev, filename3}))
            }
        },
        website: {
            value: state.website,
            onChange: (website: string) => {
                setState((prev: Product) => ({...prev, website}))
            }
        },
        youtubeLink: {
            value: state?.youtubeLink,
            onChange: (youtubeLink: string) => {
                setState((prev: Product) => ({...prev, youtubeLink}))
            }
        },
        publicPagePassword: {
            value: state?.publicPagePassword,
            onChange: (publicPagePassword: string) => {
                setState((prev: Product) => ({...prev, publicPagePassword}))
            }
        },
        color1: {
            value: state?.color1,
            onChange: (color1: string) => {
                setState((prev: Product) => ({...prev, color1}))
            }
        },
        color2: {
            value: state?.color2,
            onChange: (color2: string) => {
                setState((prev: Product) => ({...prev, color2}))
            }
        }


    }
}
