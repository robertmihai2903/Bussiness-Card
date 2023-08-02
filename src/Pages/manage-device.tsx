import {ConfigInput} from "../components/config-input";
import {Button, Input} from "@mui/material";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {MainContext} from "../contexts";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../App";


export interface Product {
    activated: boolean,
    name: string,
    adress: string,
    email: string,
    phoneNumber: string,
    unlockcode: string

}

const useEditState = (state: Product, setState: React.Dispatch<React.SetStateAction<Product>>, invalidFields: Map<string, string>) => {
    return {
        name: {
            value: state.name,
            onChange: (name: string) => {
                setState((prev: Product) => ({...prev, name}))
            }
        },
        adress: {
            value: state.adress,
            onChange: (adress: string) => {
                setState((prev: Product) => ({...prev, adress}))
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
    }
}

export function ManageDevice() {
    const [productState, setProductState] = useState<Product>({
        activated: true,
        name: "",
        adress: "",
        email: "",
        phoneNumber: "",
        unlockcode: ""
    })
    const [invalidFields, setInvalidFields] = useState(new Map<string, string>)
    const {db} = useContext(MainContext)
    const [imageURL, setImageURL] = useState("")

    const {name, email, adress, phoneNumber} = useEditState(productState, setProductState, invalidFields)
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('product_id')
    const imageRef = ref(storage, `images/${productId}`)
    getDownloadURL(imageRef)
        .then(url => {
            setImageURL(url)
            return Promise.resolve(true);
        })
        .catch(error => {
            if (error.code === 'storage/object-not-found') {
                return Promise.resolve(false);
            } else {
                return Promise.reject(error);
            }
        });

    useEffect(() => {
        (async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const productId = urlParams.get('product_id')
            if (productId) {
                const productRef = doc(db, 'products', productId)
                const docSnap = await getDoc(productRef);
                if (docSnap.exists()) {
                    setProductState({...docSnap.data() as Product})
                }
            }
        })()
    }, []);

    console.log(productState)
    const navigate = useNavigate()


    const saveProductData = async () => {

        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {...productState})
        }
    }
    const [imageUpload, setImageUpload] = useState(null)
    const [documentUpload, setDocumentUpload] = useState(null)
    const uploadImage = async (e: any) => {
        setImageUpload(e.target.files[0])
        if (imageUpload !== null) {
            const imageRef = ref(storage, `images/${productId}`)
            console.log('start')
            await uploadBytes(imageRef, imageUpload)
            console.log('image uploaded')
        }
    }

    const uploadDocument = async (e: any) => {
        const tempDoc = e.target.files[0]
        setDocumentUpload(tempDoc)
        if (tempDoc !== null) {
            const documentRef = ref(storage, `documents/${productId}`)
            console.log('start')
            uploadBytes(documentRef, tempDoc).then((data) => {
                console.log(data)
            })
            console.log('document uploaded')
        }
    }

    return (<div className={"page"}>
        <div className={"modal"}>
            <Button onClick={() => {navigate(`/show-product?product_id=${productId}`)}} >Preview</Button>
            <ConfigInput label={'name'} value={name.value} onChange={name.onChange}/>
            <ConfigInput label={"email"} value={email.value} onChange={email.onChange}/>
            <ConfigInput label={'adress'} value={adress.value} onChange={adress.onChange}/>
            <ConfigInput label={'phone number'} value={phoneNumber.value} onChange={phoneNumber.onChange}/>
            <Input type={'file'}  onChange={uploadImage}/>
            <img src={imageURL}/>
            <Input type={'file'} onChange={uploadDocument}/>
            <Button onClick={saveProductData}>Save</Button>

        </div>
    </div>)
}