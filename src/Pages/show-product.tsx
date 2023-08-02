import {Button} from "@mui/material";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {Product} from "./manage-device";
import {MainContext} from "../contexts";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../App";
import {Preview} from "./admin";

export function ShowProduct() {
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product>({
        activated: true,
        name: "",
        adress: "",
        email: "",
        phoneNumber: "",
        unlockcode: "",
        preview: Preview.BUSINESS_CARD
    })
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('product_id')
    const {db} = useContext(MainContext)

    useEffect(() => {
        (async () => {
            if (productId) {
                const productRef = doc(db, 'products', productId)
                const docSnap = await getDoc(productRef);
                if (docSnap.exists()) {
                    if (!docSnap.data().activated) {
                        navigate('/app')
                    }
                    setProduct({...docSnap.data() as Product})
                } else {
                    navigate('/app')
                }
            }
        })()
    }, [])

    const downloadDocument = () => {
        const documentRef = ref(storage, `documents/${productId}` )
        getDownloadURL(documentRef)
            .then(url => {
                console.log(url);
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    const blob = xhr.response;
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${productId} - CV`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                };
                xhr.open('GET', url);
                xhr.send();
                return Promise.resolve(true);
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    return (<div className={"page"}>
        <div className={"modal"}>
            <div>{product.name}</div>
            <div>{product.adress}</div>
            <div>{product.email}</div>
            <div>{product.phoneNumber}</div>
            <Button onClick={downloadDocument}>Download Document</Button>
        </div>


    </div>)
}