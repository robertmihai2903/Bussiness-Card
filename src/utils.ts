import {ref, uploadBytes} from "firebase/storage";
import {db, storage} from "./App";
import {Product} from "./control-state";
import {useContext} from "react";
import {ManageProductContext} from "./contexts";
import {Preview} from "./Pages/admin";
import {doc, updateDoc} from "firebase/firestore";
import {notify} from "./Pages/login-page";

export const onChangeWrapper = (key: any) => {
    return (e: any) => {
        key.onChange(e.target.value)
    }
}

export function useUploadFile(filename: string, fileID?: keyof Product) {
    const productId = getProductIdFromURL()
    const {setProductState} = useContext(ManageProductContext)

    return async (e: any) => {
        const tempDoc = e.target.files[0]
        if (tempDoc !== null) {
            const documentRef = ref(storage, `documents/${productId}/${filename}`)
            console.log('start')
            uploadBytes(documentRef, tempDoc).then((data) => {
                console.log(data)
                if (fileID) {
                    setProductState((prev: Product) => ({...prev, [fileID]: true}))
                }
            })
            console.log('document uploaded')
        }
    }
}

export function useSetPreview(preview: Preview) {
    const {setProductState} = useContext(ManageProductContext)
    const productId = getProductIdFromURL()

    return async () => {
        setProductState((prev: Product) => ({...prev, preview: preview}))
        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {preview: preview})
            notify('Changed the public page.')
        }
    }
}


export const getProductIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('product_id')
    return productId
}