import {ConfigInput} from "../components/config-input";
import {Button, Checkbox, Input} from "@mui/material";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../contexts";
import {doc, setDoc, addDoc, collection, query, where, getDocs, updateDoc, getDoc} from "firebase/firestore"
import './admin.css'
import {notify} from "./login-page";
import {db} from "../App";
import {DB_COLLECTIONS, DB_STORAGE} from "../components/baby-journal-settings";
import {defaultPermissions, Permissions} from "../components/usePermission";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export enum Preview {
    BUSINESS_CARD = 'business_card',
    CUSTOM_LINK = 'custom_link',
    UPLOAD_FILE = 'upload_file',
    UPLOAD_VIDEO = "upload_video",
    UPLOAD_SONGS = "upload-songs",
    BABY_JOURNAL = "baby-journal",
    ADULT_JOURNAL = "adult-journal"
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
                setDoc(doc(db, DB_COLLECTIONS.PERMISSIONS, data.id), defaultPermissions)
                setDoc(doc(db, DB_COLLECTIONS.ADULT_JOURNALS, data.id), {})
                setDoc(doc(db, DB_COLLECTIONS.BABY_JOURNALS, data.id), {})
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

    const [changePermissionsProduct, setChangePermissionsProduct] = useState<string>("")

    return (<div className={"page"}>
        <div className={"modal"}>
            <Input value={orderedProducts} type={'number'} onChange={(e: any) => {
                setOrderedProducts(e.target.value)
            }}/>
            <Button onClick={createProducts}>get products</Button>
            <div className={"admin-products"}>
                {products.map((product) => (<Product key={`product-${product.id}`} product={product}
                                                     onChangePermissions={setChangePermissionsProduct}/>

            ))}
            </div>
        </div>
        <ChangePermissionsModal product={changePermissionsProduct}/>


    </div>)
}

function ChangePermissionsModal({product}: { product: string }) {
    const [currentPermissions, setCurrentPermissions] = useState(defaultPermissions)
    useEffect(() => {
        (async () => {
            if (product) {
                const productRef = doc(db, DB_COLLECTIONS.PERMISSIONS, product)
                const docSnap = await getDoc(productRef);
                if (docSnap.exists()) {
                    setCurrentPermissions((prev: Permissions) => ({...prev, ...docSnap.data() as Permissions}))
                }
            }
        })()
    }, [product]);

    const onSave = async () => {
        const docRef = doc(db, DB_COLLECTIONS.PERMISSIONS, product)
        await updateDoc(docRef, {...currentPermissions})
    }

    return <div className={"permission-modal"}>
        <h1>Change Permissions</h1>
        <div>BUSINESS CARD <Checkbox checked={currentPermissions.business_card} onChange={() => {
            setCurrentPermissions((prev: Permissions) => ({...prev, business_card: !prev.business_card}))
        }}/></div>
        <div>CUSTOM LINK <Checkbox checked={currentPermissions.custom_link} onChange={() => {
            setCurrentPermissions((prev: Permissions) => ({...prev, custom_link: !prev.custom_link}))
        }}/></div>
        <div>UPLOAD FILES <Checkbox checked={currentPermissions.upload_files} onChange={() => {
            setCurrentPermissions((prev: Permissions) => ({...prev, upload_files: !prev.upload_files}))
        }}/></div>
        <div>UPLOAD VIDEO <Checkbox checked={currentPermissions.upload_video} onChange={() => {
            setCurrentPermissions((prev: Permissions) => ({...prev, upload_video: !prev.upload_video}))
        }}/></div>
        <div>UPLOAD SONGS <Checkbox checked={currentPermissions.upload_songs} onChange={() => {
            setCurrentPermissions((prev: Permissions) => ({...prev, upload_songs: !prev.upload_songs}))
        }}/></div>
        <div>BABY JOURNAL <Checkbox checked={currentPermissions.baby_journal} onChange={() => {
            setCurrentPermissions((prev: Permissions) => ({...prev, baby_journal: !prev.baby_journal}))
        }}/></div>
        <div>ADULT JOURNAL <Checkbox checked={currentPermissions.adult_journal} onChange={() => {
            setCurrentPermissions((prev: Permissions) => ({...prev, adult_journal: !prev.adult_journal}))
        }}/></div>
        <Button onClick={onSave}>SAVE PERMISSIONS</Button>
    </div>
}


const Product = ({product, onChangePermissions}: any) => {
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
        <Button onClick={() => {
            onChangePermissions(product.id)
        }}>PERMISSIONS</Button>
        <br/>
        <br/>

    </div>)
}