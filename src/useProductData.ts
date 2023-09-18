import VCard from "vcard-creator";
import {doc, updateDoc} from "firebase/firestore";
import {notify} from "./Pages/login-page";
import {ref, uploadBytes} from "firebase/storage";
import {db, storage} from "./App";
import {useContext} from "react";
import {ManageProductContext} from "./contexts";

export function useSaveProductData () {
    const {productState, setProductState} = useContext(ManageProductContext)
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('product_id')
    return async () => {
        const myVCard = new VCard()
        myVCard.addName(productState.lastName, productState.firstName)
        myVCard.addAddress(productState.address)
        myVCard.addCompany(productState.companyName)
        myVCard.addEmail(productState.email)
        myVCard.addJobtitle(productState.title)
        myVCard.addPhoneNumber(productState.phoneNumber)
        myVCard.addNote(productState.companyAbout)
        const blob = new Blob([myVCard.toString()], {type: "text/vcard"})
        const file = new File([blob], 'vCard.vcf', {type: "text/vcard"})

        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {...productState, activated: true})
            notify('Saved modifications')
        }
        const tempDoc = file
        console.log(tempDoc)
        if (tempDoc !== null) {
            const documentRef = ref(storage, `documents/${productId}/vCard`)
            console.log('start')
            uploadBytes(documentRef, tempDoc).then((data) => {
                console.log(data)
                // setProductState((prev: Product) => ({...prev, cv: true}))
            })
            console.log('document uploaded')
        }
    }
}