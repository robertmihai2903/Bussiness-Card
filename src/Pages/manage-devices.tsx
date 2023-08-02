import {ConfigInput} from "../components/config-input";
import {Button, Input} from "@mui/material";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    arrayUnion,
    getDoc
} from "firebase/firestore";
import {MainContext} from "../contexts";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export function ManageDevices() {
    const [newProductCode, setNewProductCode] = useState("")
    const [availableProducts, setAvailableProducts] = useState<any[]>([])
    const {db, state, setState} = useContext(MainContext)
    const [userProducts, setUserProducts] = useState<any>([])
    const [userId, setuserId] = useState("")

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setuserId(user.uid)
            } else {
                //navigate to login
            }
        });

        (async () => {

            const q = query(collection(db, "products"), where("activated", "==", false));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log('doc', doc.data())
                setAvailableProducts((prev: any) => [...prev, {id: doc.id, ...doc.data()}])
            });
        })()


    }, [])

    useEffect(() => {

        (async () => {
            if (userId) {

                const userRef = doc(db, "users", userId)
                console.log(userRef)
                console.log('ref', userId)
                const docSnap = await getDoc(userRef);
                if (docSnap) {
                    setUserProducts(docSnap.data()?.products)
                    console.log(userProducts)
                } else {
                    console.log('Error')
                }
            }
        })()
    }, [userId]);

    const activateProduct = () => {
        const newProduct = availableProducts.find((product) => product.unlockCode === newProductCode)
        if (newProduct && userId) {
            const newProductRef = doc(db, "products", newProduct.id);
            updateDoc(newProductRef, {activated: true})
            const userRef = doc(db, "users", state?.userId)
            updateDoc(userRef, {
                products: arrayUnion(newProduct.id)
            })
        }
    }


    const navigate = useNavigate()
    return (<div className={"page"}>
        <div className={"modal"}>
            <Button onClick={activateProduct}>Add device</Button>
            <Input value={newProductCode} onChange={(e) => setNewProductCode(e.target.value)}></Input>
            {userProducts.map((id: string) => (<ProductButton id={id}/>))}
        </div>


    </div>)
}

const ProductButton = ({id}: { id: string }) => {
    const {db, state, setState} = useContext(MainContext)
    const [product, setProduct] = useState<any>({})
    useEffect(() => {
        (async () => {
            const productRef = doc(db, "products", id)
            const docSnap = await getDoc(productRef);
            if (docSnap.exists()) {
                setProduct(docSnap.data())
            }
        })()

    }, []);
    const navigate = useNavigate()
    const openProduct = () => {
        navigate(`/manage-device?product_id=${id}`)
    }

    return (<Button onClick={openProduct}>{product.name}</Button>)
}