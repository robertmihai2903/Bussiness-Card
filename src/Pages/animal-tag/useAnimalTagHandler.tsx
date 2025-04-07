import {createContext, useContext} from "react";
import {AnimalTagInformationContext} from "./useAnimalTagInformation";
import {AnimalTagHandler, Gender} from "./config";
import {Asset} from "../../components/baby-journal-settings";

export function useAnimalTagHandler(): AnimalTagHandler {
    const {state, setState} = useContext(AnimalTagInformationContext)
    return {
        photo: {
            value: state.photo,
            onChange: (photo: Asset[]) => setState(prev => ({...prev, photo}))
        },
        name: {
            value: state.name,
            onChange: (name: string) => setState(prev => ({...prev, name}))
        },
        breed: {
            value: state.breed,
            onChange: (breed: string) => setState(prev => ({...prev, breed}))
        },
        age: {
            value: state.age,
            onChange: (age: string) => setState(prev => ({...prev, age}))
        },
        weight: {
            value: state.weight,
            onChange: (weight: string) => setState(prev => ({...prev, weight}))
        },
        color: {
            value: state.color,
            onChange: (color: string) => setState(prev => ({...prev, color}))
        },
        gender: {
            value: state.gender,
            onChange: (gender: Gender) => setState(prev => ({...prev, gender}))
        },
        height: {
            value: state.height,
            onChange: (height: string) => setState(prev => ({...prev, height}))
        },
        ownerMessage: {
            value: state.ownerMessage,
            onChange: (ownerMessage: string) => setState(prev => ({...prev, ownerMessage}))
        },
        contact: {
            name: {
                value: state.contact.name,
                onChange: (name: string) => setState(prev => ({...prev, contact: {...prev.contact, name}}))
            },
            phone: {
                value: state.contact.phone,
                onChange: (phone: string) => setState(prev => ({...prev, contact: {...prev.contact, phone}}))
            },
            email: {
                value: state.contact.email,
                onChange: (email: string) => setState(prev => ({...prev, contact: {...prev.contact, email}}))
            },
            address: {
                value: state.contact.address,
                onChange: (address: string) => setState(prev => ({...prev, contact: {...prev.contact, address}}))
            },
        },
        isLost: {
            value: state.isLost,
            onChange: (isLost: boolean) => setState(prev => ({...prev, isLost}))
        }
    }
}

export const AnimalTagHandlerContext = createContext<AnimalTagHandler | null>(null)


export function AnimalTagHandlerContextProvider({children}: any) {
    const value = useAnimalTagHandler()
    if (!value) return null
    return <AnimalTagHandlerContext.Provider value={value}>
        {children}
    </AnimalTagHandlerContext.Provider>
}