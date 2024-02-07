import {Preview} from "../Pages/admin";
import PreviewLogo from "../assets/preview.svg";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {ManageProductContext} from "../contexts";
import {getProductIdFromURL, onChangeWrapper, useSetPreview} from "../utils";
import {Product, useEditState, useProductInformation} from "../control-state";
import {Button, TextField} from "@mui/material";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../App";
import {notify} from "../Pages/login-page";
import BurgerMenuIcon from "../assets/burger-menu.svg"
import {SelectLanguage} from "../Pages/manage-device";

export function PreviewSettings() {
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

    return <div className={'preview-container'}>
        <div className={'check-show-text'}>CHECK TO SHOW ON DEVICE</div>
        <div className={'checkbox-container'}>
            <div className={'left-checkbox-container'}>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.BUSINESS_CARD}
                           onChange={setPreviewBusiness}/>
                    <span>BUSINESS CARD</span>
                </div>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.CUSTOM_LINK}
                           onChange={setPreviewCustomLink}/>
                    <span>CUSTOM LINK</span>
                </div>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.UPLOAD_FILE}
                           onChange={setPreviewUploadFile}/>
                    <span>UPLOAD FILES</span>
                </div>
            </div>
            <div className={'right-checkbox-container'}>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.UPLOAD_VIDEO}
                           onChange={setPreviewUploadVideo}/>
                    <span>UPLOAD VIDEO</span>
                </div>
                <div className={'preview-option'}>
                    <input type={'checkbox'} checked={productState.preview === Preview.UPLOAD_SONGS}
                           onChange={setPreviewUploadSongs}/>
                    <span>UPLOAD SONGS</span>
                </div>
            </div>
        </div>
        <h2 className={'pinline'}><span>PRIVACY & PASSWORD</span></h2>
        <div className={'explanation-text-preview'}>Secure the shared profile, PDF, video or songs with a password</div>
        <div className={'password-container'}>
            <TextField type={"password"} label={'Password'} value={publicPagePassword.value}
                       onChange={onChangeWrapper(publicPagePassword)}
                       variant={"outlined"} size={"small"} className={'password-input'} sx={{ input: { color: 'white' } }}/>
            <button className={'green-publish-button'} onClick={onSavePublicPage}>Save</button>
        </div>
        <div className={'password-checkbox-container'}>
            <input type={'checkbox'} checked={productState.publicPagePasswordActivated}
                   onChange={onActivatePasswordPublicPage}/>
            <span>Password on public page</span>
        </div>

        <h2 className={'pinline'}><span>PROFILE LANGUAGE</span></h2>
        <div className={'explanation-text-preview'}>Choose the language for the profile page</div>
        <SelectLanguage/>
    </div>

}