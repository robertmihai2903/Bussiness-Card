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
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import './manage-devices.css'
import Logo from '../assets/flexpayz-logo.svg'
import AddDevice from '../assets/add-device.svg'
import ManageDevicesLogo from '../assets/manage-devices.svg'
import BackArrowIcon from "../assets/back_arrow_icon.svg";

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
                navigate('/app')
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
            const userRef = doc(db, "users", userId)
            updateDoc(userRef, {
                products: arrayUnion(newProduct.id)
            })
            // setUserProducts((prev: any) => [...prev, newProduct.id])
            navigate(`/manage-device?product_id=${newProduct.id}`)
        }
    }

    const [open, setOpen] = useState(false)
    const [showAddDevice, setShowAddDevice] = useState(false)
    const onLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/app')
        }).catch((error) => {
            console.log(error)
        });
    }


    const navigate = useNavigate()
    return (<div className={"page-devices"}>
        <div className={'header-devices'}>
            {showAddDevice && <img className={'back-button'} onClick={() => {
                setShowAddDevice(false)
            }} src={BackArrowIcon}/>}
            <img className={'logo-devices'} src={Logo} alt={'logo'}/>
            <button onClick={onLogout} className={'logout-button reset-button'}>Logout</button>
        </div>
        <div className={'main-devices'}>
            {!showAddDevice && <div className={'left-container-devices'}>
                <span className={'helpers'}>
Locate your stored devices within this section. Effortlessly update or alter previously stored information about your devices. This feature lets you maintain accurate and current details for all your devices with ease.</span>
                <div className={'button-manage-devices'} onClick={() => {
                    setOpen((prev: boolean) => !prev)
                }}>
                    <img className={'new-device-img'} src={ManageDevicesLogo}/> Manage Devices
                </div>
                {open && <div className={'manage-devices-selector'}>
                    {userProducts.map((id: string) => (<ProductButton id={id}/>))}
                </div>}
                <span className={'helpers'}>Begin by inputting the code provided in your package. Once done, proceed to enter your personal details. This step allows you to seamlessly set up your new device and make it uniquely yours.</span>
                <div className={'button-add-new-devices'} onClick={() => {
                    setShowAddDevice(true)
                }}>
                    <img className={'new-device-img'} src={AddDevice}/> Add new device
                </div>

            </div>}
            {showAddDevice && <div className={'left-container-devices'}>
                <input className={'add-device-input'} placeholder={'Enter unlock code'} value={newProductCode}
                       onChange={(e) => setNewProductCode(e.target.value.toUpperCase())}></input>
                <button className={'go-button-devices'} onClick={activateProduct}>Go</button>
            </div>}
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

    return (<div className={'product-devices'} onClick={openProduct}>{product.name}</div>)
}