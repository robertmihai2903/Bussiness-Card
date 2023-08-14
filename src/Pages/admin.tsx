import {ConfigInput} from "../components/config-input";
import {Button, Checkbox, Input} from "@mui/material";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../contexts";
import {doc, setDoc, addDoc, collection, query, where, getDocs, updateDoc} from "firebase/firestore"
import './admin.css'
import {notify} from "./login-page";
import {db} from "../App";

export enum Preview {
    BUSINESS_CARD = 'business_card',
    CUSTOM_LINK = 'custom_link',
    UPLOAD_FILE = 'upload_file',
    UPLOAD_VIDEO = "upload_video"
}

const random_hex_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return n.slice(0, 6).toLocaleUpperCase();
};

export function AdminPage() {
    const [orderedProducts, setOrderedProducts] = useState(0)
    const [products, setProducts] = useState<any[]>([])
    const {db} = useContext(MainContext)

    const createProducts = async () => {

        for (let i = 0; i < orderedProducts; i++) {
            const hexCode = random_hex_code()
            addDoc(collection(db, 'products'), {
                activated: false,
                unlockCode: hexCode,
                name: "New Product",
                preview: Preview.BUSINESS_CARD,
                processed: false
            }).then((data) => {
                setProducts((prev) => [...prev, {
                    id: data.id, activated: false,
                    unlockCode: hexCode,
                    name: "New Product",
                    preview: Preview.BUSINESS_CARD,
                    processed: false
                }])
            })
        }
        notify(`You created ${orderedProducts} products.`)

    }



    useEffect(() => {
        (async () => {
            const q = query(collection(db, "products"), where("activated", "==", false));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log('doc', doc.data())
                setProducts((prev: any) => [...prev, {id: doc.id, ...doc.data()}])
            });
        })()
console.log(products)
    }, [])

    return (<div className={"page"}>
        <div className={"modal"}>
            <Input value={orderedProducts} type={'number'} onChange={(e: any) => {
                setOrderedProducts(e.target.value)
            }}/>
            <Button onClick={createProducts}>get products</Button>
            <div className={"admin-products"}>
                {products.map((product) => (<Product key={`product-${product.id}`} product={product}/>

            ))}
            </div>
        </div>


    </div>)
}


const Product = ({product}: any) => {
    const copyLink = (productId: string) => {
        navigator.clipboard.writeText(`https://flexpayz.com/show-product?product_id=${productId}`)
    }
    const [processed, setProcessed] = useState(false)

    useEffect(() => {
        setProcessed(product.processed)
        console.log(product.processed, '222')
    }, []);

    const onProcessedProduct = async (e: any) => {
        if (product.id) {
            const productRef = doc(db, 'products', product.id)
            console.log(e.target.checked, 'here22')
            await updateDoc(productRef, {processed: e.target.checked})
            console.log(e.target.checked, 'here')
            setProcessed((prevState: boolean) => !prevState)
        }
    }

    return (<div>
        <span>{product.id}</span>
        <br/>
        <span>{product.unlockCode}</span>
        <Button onClick={() => {
            copyLink(product.id)
        }}>Link</Button>
        <Checkbox checked={processed} onChange={onProcessedProduct}/>
        <br/>
        <br/>
    </div>)
}