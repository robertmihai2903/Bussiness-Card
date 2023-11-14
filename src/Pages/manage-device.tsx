import {useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {ManageProductContext} from "../contexts";
import {db} from "../App";
import './manager.css'
import {defaultProduct, Product, useEditState} from "../control-state";
import {BusinessSettings} from "../components/business-settings";
import {CustomLinkSettings} from "../components/custom-link-settings";
import {UploadFileSettings} from "../components/upload-file-settings";
import {UploadVideoSettings} from "../components/upload-video-settings";
import {PreviewSettings} from "../components/preview-settings";
import Logo from '../assets/flexpayz-logo.svg'
import BackArrowIcon from '../assets/back_arrow_icon.svg'
import {useNavigate} from "react-router";
import {Box, Modal, TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";
import {notify} from "./login-page";
import {useResetDevice, useSaveName} from "../useProductData";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {UploadSongsSettings} from "../components/upload-songs-settings";
import {SharedContacts} from "../components/shared-contacts";

const enum Section {
    BUSINESS_CARD = 'business_card',
    CUSTOM_LINK = 'custom_link',
    UPLOAD_FILE = 'upload_file',
    UPLOAD_VIDEO = "upload_video",
    UPLOAD_SONGS = "upload_songs",
    SHARED_CONTACTS = 'shared_contacts',
    PHOTO_GALLERY = 'photo_gallery'
}

function ResetProduct () {
    const [showModal, setShowModal] = useState(false)
    const onResetProduct = useResetDevice()
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleResetDevice =  async () =>{
        await onResetProduct()
        handleCloseModal()
        window.location.reload()
    }

    return(<div className={'reset-product-container'}>
        <button style={{marginBottom: '12px'}} className={'reset-button'} onClick={handleOpenModal}>Reset device</button>
        <Modal open={showModal} onClose={handleCloseModal}>
            <Box className={'inside-modal'}>
                <div className={'modal-text'}>Are you sure you want to reset device?</div>
                <div className={'modal-buttons'}>
                    <button className={'cancel-button'} onClick={handleCloseModal}>Cancel</button>
                    <button className={'reset-button'} onClick={handleResetDevice}>Reset</button>
                </div>
            </Box>

        </Modal>
    </div>)
}

function EditName () {
    const {name} = useEditState()
    const [editName, setEditName] = useState<boolean | null>(false)
    const saveNameInDocument = useSaveName()
    const onSaveDeviceName = async () => {
        await saveNameInDocument()
        setEditName(false)
    }
    console.log('editName', editName)
    return (<div className={'device-name-container'}>
        {!editName && <div className={'device-name'}>{name.value}</div>}
        {editName && <TextField label={'Device Name'} value={name.value}
                                onChange={onChangeWrapper(name)} variant={"outlined"} size={"small"}
                                className={'edit-name-input'} sx={{input: {color: 'white'}}}/>}
        {!editName && <button className={'blue-edit-name-button'} onClick={() => {setEditName(true)}}>Edit Name</button>}
        {editName && <button className={'green-publish-button'} onClick={onSaveDeviceName}>Save Name</button>}
    </div>)
}


export function ManageDevice() {
    const [productState, setProductState] = useState<Product>(defaultProduct)
    const [invalidFields, setInvalidFields] = useState(new Map<string, string>)

    useEffect(() => {

        (async () => {
            const auth = getAuth();
             onAuthStateChanged(auth, (user) => {
                if (user) {
                } else {
                    navigate('/app')
                }
            });

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

        notify(`Don't forget to save after changes`)
    }, []);

    console.log(productState)
const navigate = useNavigate()
    const [showSection, setShowSection] = useState(Section.BUSINESS_CARD)
    const [showSectionSelector, setShowSectionSelector] = useState(true)
    const [editName, setEditName] = useState(false)

    return (<div className={"page-manager"}>
        <ManageProductContext.Provider value={{productState, setProductState, invalidFields}}>
            <div className={'manage-devices-header'}>
                <img className={'back-button'} onClick={() => {navigate('/manage-devices')}} src={BackArrowIcon}/>
                <img className={'manage-logo'} src={Logo}/>
            </div>
            <EditName/>
            <PreviewSettings setShowSection={setShowSectionSelector}/>
            <ResetProduct/>
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
                <div className={'songs-upload-header'} onClick={() => setShowSection(Section.UPLOAD_SONGS)}>Songs
                    Upload
                </div>
                <div className={'songs-upload-header'} onClick={() => setShowSection(Section.SHARED_CONTACTS)}>Shared Contacts
                </div>
            </div>}
            {showSection === Section.BUSINESS_CARD && <BusinessSettings/>}
            {showSection === Section.CUSTOM_LINK && <CustomLinkSettings/>}
            {showSection === Section.UPLOAD_FILE && <UploadFileSettings/>}
            {showSection === Section.UPLOAD_VIDEO && <UploadVideoSettings/>}
            {showSection === Section.UPLOAD_SONGS && <UploadSongsSettings/>}
            {showSection === Section.SHARED_CONTACTS && <SharedContacts/>}
            {/*{showSection === Section.PHOTO_GALLERY && <PhotoGallery/>}*/}
        </ManageProductContext.Provider>
    </div>)
}
