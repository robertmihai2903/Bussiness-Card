import {useCallback, useContext, useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {ManageProductContext} from "../contexts";
import {db} from "../App";
import './manager.css'
import {defaultProduct, Product, useEditState, useProductInformation} from "../control-state";
import {BusinessSettings} from "../components/business-settings";
import {CustomLinkSettings} from "../components/custom-link-settings";
import {UploadFileSettings} from "../components/upload-file-settings";
import {UploadVideoSettings} from "../components/upload-video-settings";
import {PreviewSettings} from "../components/preview-settings";
import Logo from '../assets/flexpayz-logo.svg'
import BackArrowIcon from '../assets/back_arrow_icon.svg'
import {useNavigate} from "react-router";
import {Box, InputLabel, MenuItem, Modal, Select, TextField} from "@mui/material";
import {getProductIdFromURL, onChangeWrapper, useSaveLanguage} from "../utils";
import {notify} from "./login-page";
import {useResetDevice, useSaveName} from "../useProductData";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {UploadSongsSettings} from "../components/upload-songs-settings";
import {SharedContacts} from "../components/shared-contacts";
import {Languages} from "../languages";
import {GeneralDeviceActions} from "../components/general-device-actions";
import BusinessCardIcon from "../assets/category-business-card.svg"
import CustomLinkIcon from "../assets/category-custom-link.svg"
import UploadFilesIcon from "../assets/category-upload-files.svg"
import UploadVideoIcon from "../assets/category-upload-video.svg"
import UploadSongsIcon from "../assets/category-upload-songs.svg"
import BabyJournalIcon from "../assets/baby-book-svgrepo-com.svg"
import AdultJournalIcon from "../assets/moleskine-svgrepo-com.svg"
// import SharedContactsIcon from "../assets/affiliate-ui-web-svgrepo-com.svg"
import classNames from "classnames";
import {PermissionContext, PermissionContextProvider, Permissions} from "../components/usePermission";

const enum Section {
    BUSINESS_CARD = 'business_card',
    CUSTOM_LINK = 'custom_link',
    UPLOAD_FILE = 'upload_file',
    UPLOAD_VIDEO = "upload_video",
    UPLOAD_SONGS = "upload_songs",
    SHARED_CONTACTS = 'shared_contacts',
    PHOTO_GALLERY = 'photo_gallery'
}

export function ResetProduct() {
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
        <button className={'reset-button'} onClick={handleOpenModal}>Reset device</button>
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
const value = useProductInformation()
const navigate = useNavigate()
    return (<div className={'page-manager-wrapper'}>
        <PermissionContextProvider>
            <ManageProductContext.Provider value={value}>
                <div className={"page-manager"}>
                    <div className={'manage-devices-header'}>
                        <img className={'back-button'} onClick={() => {
                            navigate('/manage-devices')
                        }} src={BackArrowIcon}/>
                        <img className={'manage-logo'} src={Logo}/>
                    </div>

                    <div>
                        <GeneralDeviceActions/>
                    </div>
                    <h2 className={'pinline'}><span>DEVICE NAME</span></h2>
                    <EditName/>
                    <h2 className={'pinline'}><span>PREVIEW SETTINGS</span></h2>
                    <PreviewSettings/>

                    <h2 className={'pinline'}><span>CONTENT PAGES</span></h2>

                    <div className={'page-categories'}>
                        <PageCategory permission={"business_card"} category={'business-card'} icon={BusinessCardIcon}
                                      title={'Business Card'} description={'Fill out your contact details'}/>
                        <PageCategory permission={"custom_link"} category={'custom-link'} icon={CustomLinkIcon}
                                      title={'Custom Link'} description={'Introduce the URL link'}/>
                        <PageCategory permission={"upload_files"} category={'upload-files'} icon={UploadFilesIcon}
                                      title={'Upload Files'} description={'Upload 3 different PDF files'}/>
                        <PageCategory permission={"upload_video"} category={'upload-video'} icon={UploadVideoIcon}
                                      title={'Upload Video'} description={'Introduce the Youtube link'}/>
                        <PageCategory permission={"upload_songs"} category={'upload-songs'} icon={UploadSongsIcon}
                                      title={'Upload Songs'} description={'Upload 3 different audio tracks'}/>
                        <PageCategory permission={"baby_journal"} category={'baby-journal'} icon={BabyJournalIcon}
                                      title={'Baby Journal'} description={'Have a journal for your baby'}/>
                        <PageCategory permission={"adult_journal"} category={'adult-journal'} icon={AdultJournalIcon}
                                      title={'Adult Journal'} description={'Have a journal for you'}/>
                        <PageCategory permission={"animal_tag"} category={"animal-tag"} icon={AdultJournalIcon}
                                      title={'Animal Tag'} description={'Tag for you beloved animal'}/>
                    </div>
                    <h2 className={'pinline'}><span>SHARED CONTACTS</span></h2>
                    <div className={'page-categories'}>
                        <PageCategory permission={"business_card"} category={'shared-contacts'} icon={BusinessCardIcon}
                                      title={'Shared Contacts'} description={'View shared contacts'}/>
                    </div>
                </div>
            </ManageProductContext.Provider>
        </PermissionContextProvider>
    </div>)
}


export function SelectLanguage() {
    const {previewLanguage} = useEditState()
    const onChangeSelect = useSaveLanguage()
    return (<div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Select className={'select-language'}
                onChange={onChangeSelect} value={previewLanguage.value}>
            {Object.values(Languages).map((key) => {
                return (<MenuItem value={key}>{key.toLocaleUpperCase()}</MenuItem>)
            })}
        </Select>
    </div>)
}

interface PageCategoryProps {
    icon: string,
    title: string,
    description: string,
    category: string,
    permission: keyof Permissions
}

function PageCategory({permission, icon, title, description, category}: PageCategoryProps) {
    const productId = getProductIdFromURL()
    const navigate = useNavigate()
    const permissions = useContext(PermissionContext)
    const goToSettings = useCallback(() => {
        navigate(`/manage-device/${category}?product_id=${productId}`)
    }, [navigate, category])

    if (!permissions[permission]) return null
    return (<div className={classNames('page-category-box', category)} onClick={goToSettings}>
        <div className={classNames(`page-category-icon-wrapper`, `${category}-background-color`)}>
            <img src={icon} className={'page-category-icon'}/>
        </div>
        <div className={'page-category-text-wrapper'}>
            <h4>{title}</h4>
            <span>{description}</span>
        </div>
        <div className={'page-category-arrow-wrapper'}>
            <img src={BackArrowIcon} className={'page-category-next-icon'}/>
        </div>
    </div>)
}

export function SettingsHeader() {
    const productId = getProductIdFromURL()
    const navigate = useNavigate()
    return (<div className={'manage-devices-header'}>
        <img className={'back-button'} onClick={() => {
            navigate(`/manage-device?product_id=${productId}`)
        }} src={BackArrowIcon}/>
        <img className={'manage-logo'} src={Logo}/>
    </div>)
}
