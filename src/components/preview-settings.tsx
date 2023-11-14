import {Preview} from "../Pages/admin";
import PreviewLogo from "../assets/preview.svg";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {ManageProductContext} from "../contexts";
import {getProductIdFromURL, onChangeWrapper, useSetPreview} from "../utils";
import {Product, useEditState} from "../control-state";
import {Button, TextField} from "@mui/material";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../App";
import {notify} from "../Pages/login-page";
import BurgerMenuIcon from "../assets/burger-menu.svg"

export function PreviewSettings({setShowSection}: any) {
    const {productState, setProductState} = useContext(ManageProductContext)
    const {publicPagePassword} = useEditState()
    const [showPassword, setShowPassword] = useState(false)

    const productId = getProductIdFromURL()
    const navigate = useNavigate()

    const setPreviewBusiness = useSetPreview(Preview.BUSINESS_CARD)
    const setPreviewCustomLink = useSetPreview(Preview.CUSTOM_LINK)
    const setPreviewUploadFile = useSetPreview(Preview.UPLOAD_FILE)
    const setPreviewUploadVideo = useSetPreview(Preview.UPLOAD_VIDEO)
    const setPreviewUploadSongs = useSetPreview(Preview.UPLOAD_SONGS)

    useEffect(() => {
        setShowPassword(productState.publicPagePasswordActivated)
    }, [])

    const onSavePublicPage = async () => {
        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {publicPagePassword: productState.publicPagePassword})
            notify('Changed the public page password.')
        }
    }

    const onActivatePasswordPublicPage = async (e: any) => {
        setProductState((prev: Product) => ({...prev, publicPagePasswordActivated: e.target.checked}))
        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {publicPagePasswordActivated: e.target.checked})
            notify(`Public page password is ${e.target.checked ? 'activated' : 'deactivated'}.`)
        }
    }

    console.log('hello', productState?.publicPagePasswordActivated)

    return <div className={'preview-container'}>
        <div className={'check-show-text'}>Check to show on device</div>
        <div className={'checkbox-container'}>
            <div className={'left-checkbox-container'}>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.BUSINESS_CARD}
                           onChange={setPreviewBusiness}/>
                    <span>Business Card</span>
                </div>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.CUSTOM_LINK}
                           onChange={setPreviewCustomLink}/>
                    <span>Custom Link</span>
                </div>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.UPLOAD_FILE}
                           onChange={setPreviewUploadFile}/>
                    <span>Upload File</span>
                </div>
            </div>
            <div className={'right-checkbox-container'}>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.UPLOAD_VIDEO}
                           onChange={setPreviewUploadVideo}/>
                    <span>Upload Video</span>
                </div>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.UPLOAD_SONGS}
                           onChange={setPreviewUploadSongs}/>
                    <span>Upload Songs</span>
                </div>
                <div className={'preview-button'} onClick={() => {
                    navigate(`/show-product?product_id=${productId}`)
                }}><img className={'preview-logo'} src={PreviewLogo} alt={'preview'}/>Preview
                </div>
            </div>
        </div>
        <div className={'password-container'}>
            <TextField type={"password"} label={'Password'} value={publicPagePassword.value}
                       onChange={onChangeWrapper(publicPagePassword)}
                       variant={"outlined"} size={"small"} className={'password-input'} sx={{ input: { color: 'white' } }}/>
            <button className={'green-publish-button'} onClick={onSavePublicPage}>Save</button>
        </div>
        <div className={'burger-container'}>
            <div className={'password-checkbox-container'}>
                <input type={'checkbox'} checked={productState.publicPagePasswordActivated}
                       onChange={onActivatePasswordPublicPage}/>
                <span>Password on public page</span>
            </div>
            <img className={'burger-icon'} src={BurgerMenuIcon}
                 onClick={() => setShowSection((prev: boolean) => !prev)}/>

        </div>
    </div>

}