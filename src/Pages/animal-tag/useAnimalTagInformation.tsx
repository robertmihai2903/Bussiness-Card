import {AnimalTagConfig, defaultAnimalTagConfig} from "./config";
import {createContext, useContext, useEffect, useState} from "react";
import {LoadingScreenContext} from "../../components/loading-sreen";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../App";
import {DB_COLLECTIONS} from "../../components/baby-journal-settings";

export interface AnimalTagInformation {
    state: AnimalTagConfig,
    setState: React.Dispatch<React.SetStateAction<AnimalTagConfig>>
    originalState: AnimalTagConfig,
    setOriginalState: React.Dispatch<React.SetStateAction<AnimalTagConfig>>
}

function useAnimalTagInformation(): AnimalTagInformation {
    const [state, setState] = useState<AnimalTagConfig>(defaultAnimalTagConfig)
    const [originalState, setOriginalState] = useState<AnimalTagConfig>(defaultAnimalTagConfig)

    const {setIsLoading} = useContext(LoadingScreenContext)

    useEffect(() => {
            (async () => {
                setIsLoading(true)
                const auth = getAuth();
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                    } else {
                        // navigate('/app')
                    }
                });

                const urlParams = new URLSearchParams(window.location.search)
                const productId = urlParams.get('product_id')
                if (productId) {
                    const productRef = doc(db, DB_COLLECTIONS.ANIMAL_TAG, productId)
                    const docSnap = await getDoc(productRef);
                    console.log(docSnap, docSnap.exists(), docSnap.data())
                    if (docSnap.exists()) {
                        setState((prev: AnimalTagConfig) => ({...prev, ...docSnap.data() as AnimalTagConfig}))
                        setOriginalState((prev: AnimalTagConfig) => ({...prev, ...docSnap.data() as AnimalTagConfig}))
                        setIsLoading(false)
                    }
                }
            })()
            // notify(`Don't forget to save after changes`)
        }, []
    );

    console.log("Animal tag state", state)

    return {state, setState, originalState, setOriginalState}
}

export const AnimalTagInformationContext = createContext<AnimalTagInformation>({
    state: defaultAnimalTagConfig,
    originalState: defaultAnimalTagConfig,
    setState: () => {
    },
    setOriginalState: () => {
    }
})

export function AnimalTagInformationContextProvider({children}: any) {
    const value = useAnimalTagInformation()
    if (!value) return null
    return <AnimalTagInformationContext.Provider value={value}>{children}</AnimalTagInformationContext.Provider>
}
