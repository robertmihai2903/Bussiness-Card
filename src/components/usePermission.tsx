import {createContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, doc, getDoc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../App";
import {DB_COLLECTIONS} from "./baby-journal-settings";

export function usePermission(): Permissions {
    const [permissions, setPermissions] = useState<Permissions>(defaultPermissions)

    useEffect(() => {
            (async () => {
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
                    const productRef = doc(db, DB_COLLECTIONS.PERMISSIONS, productId)
                    const docSnap = await getDoc(productRef);
                    console.log(docSnap, docSnap.exists(), docSnap.data())
                    if (docSnap.exists()) {
                        setPermissions((prev: Permissions) => ({...prev, ...docSnap.data() as Permissions}))
                    }
                }
            })()
            // notify(`Don't forget to save after changes`)
        }, []
    );
    return permissions
}

export interface Permissions {
    business_card: boolean,
    custom_link: boolean,
    upload_files: boolean,
    upload_video: boolean,
    upload_songs: boolean,
    baby_journal: boolean,
    adult_journal: boolean,
    animal_tag: boolean,
}

export const defaultPermissions: Permissions = {
    business_card: true,
    custom_link: true,
    upload_files: true,
    upload_video: true,
    upload_songs: true,
    baby_journal: true,
    adult_journal: true,
    animal_tag: true,
}
export const PermissionContext = createContext<Permissions>(defaultPermissions)

export function PermissionContextProvider({children}: { children: any }) {
    const value = usePermission()
    return <PermissionContext.Provider value={value}>
        {children}
    </PermissionContext.Provider>
}