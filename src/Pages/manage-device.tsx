import {useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {ManageProductContext} from "../contexts";
import {db} from "../App";
import './manager.css'
import {defaultProduct, Product} from "../control-state";
import {BusinessSettings} from "../components/business-settings";
import {CustomLinkSettings} from "../components/custom-link-settings";
import {UploadFileSettings} from "../components/upload-file-settings";
import {UploadVideoSettings} from "../components/upload-video-settings";
import {PreviewSettings} from "../components/preview-settings";
import Logo from '../assets/flexpayz-logo.svg'
import BackArrowIcon from '../assets/back_arrow_icon.svg'
import {useNavigate} from "react-router";

const enum Section {
    BUSINESS_CARD = 'business_card',
    CUSTOM_LINK = 'custom_link',
    UPLOAD_FILE = 'upload_file',
    UPLOAD_VIDEO = "upload_video"
}

export function ManageDevice() {
    const [productState, setProductState] = useState<Product>(defaultProduct)
    const [invalidFields, setInvalidFields] = useState(new Map<string, string>)

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
    const [showSection, setShowSection] = useState(Section.BUSINESS_CARD)
    const [showSectionSelector, setShowSectionSelector] = useState(true)


    return (<div className={"page-manager"}>
        <ManageProductContext.Provider value={{productState, setProductState, invalidFields}}>
            <div className={'manage-devices-header'}>
                <img className={'back-button'} onClick={() => {navigate('/manage-devices')}} src={BackArrowIcon}/>
                <img className={'manage-logo'} src={Logo}/>
            </div>
            <div className={'device-name'}>{productState.name}</div>
            <PreviewSettings setShowSection={setShowSectionSelector}/>
            {showSectionSelector && <div className={'header-selector'}>
                <div className={'business-card-header'} onClick={() => setShowSection(Section.BUSINESS_CARD)}>Business
                    Card
                </div>
                <div className={'custom-link-header'} onClick={() => setShowSection(Section.CUSTOM_LINK)}>Custom Link
                </div>
                <div className={'file-upload-header'} onClick={() => setShowSection(Section.UPLOAD_FILE)}>File Upload
                </div>
                <div className={'video-upload-header'} onClick={() => setShowSection(Section.UPLOAD_VIDEO)}>Video
                    Upload
                </div>
            </div>}
            {showSection === Section.BUSINESS_CARD && <BusinessSettings/>}
            {showSection === Section.CUSTOM_LINK && <CustomLinkSettings/>}
            {showSection === Section.UPLOAD_FILE && <UploadFileSettings/>}
            {showSection === Section.UPLOAD_VIDEO && <UploadVideoSettings/>}
        </ManageProductContext.Provider>
    </div>)
}
