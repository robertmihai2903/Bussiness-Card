import {Button, Checkbox} from "@mui/material";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {MainContext} from "../contexts";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../App";
import {Preview} from "./admin";
import './manager.css'
import PreviewLogo from '../assets/preview.svg'
import {notify} from "./login-page";
import VCard from 'vcard-creator'
import ImageUpload from "../components/image-upload";
export const defaultProduct: Product = {
    name: '',
    activated: true,
    preview: Preview.BUSINESS_CARD,
    unlockcode: '',
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phoneNumber: '',
    country: '',
    address: '',
    address2: '',
    zipCode: '',
    city: '',
    linkedIn: '',
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    about: '',
    companyName: '',
    companyRegNumber: '',
    companyAddress: '',
    companyCity: '',
    companyCountry: '',
    companyPhoneNumber: '',
    companyAbout: '',
    customLink: '',
    filename1: '',
    filename2: '',
    filename3: '',
    cv: false,
    website: '',
    youtubeLink: ''
}

export interface Product {
    name: string
    activated: boolean,
    preview: Preview
    unlockcode: string,
    firstName: string,
    lastName: string,
    title: string,
    email: string,
    phoneNumber: string,
    country: string,
    address: string,
    address2: string,
    zipCode: string,
    city: string,
    linkedIn: string,
    instagram: string,
    facebook: string,
    youtube: string,
    tiktok: string,
    about: string
    companyName: string,
    companyRegNumber: string,
    companyAddress: string,
    companyCity: string,
    companyCountry: string,
    companyPhoneNumber: string,
    companyAbout: string,
    customLink: string,
    filename1: string,
    filename2: string,
    filename3: string,
    cv: boolean,
    website: string,
    youtubeLink: string
}

const useEditState = (state: Product, setState: React.Dispatch<React.SetStateAction<Product>>, invalidFields: Map<string, string>) => {
    return {
        name: {
            value: state.name,
            onChange: (name: string) => {
                setState((prev: Product) => ({...prev, name}))
            }
        },
        firstName: {
            value: state.firstName,
            onChange: (firstName: string) => {
                setState((prev: Product) => ({...prev, firstName}))
            }
        },
        lastName: {
            value: state.lastName,
            onChange: (lastName: string) => {
                setState((prev: Product) => ({...prev, lastName}))
            }
        },
        title: {
            value: state.title,
            onChange: (title: string) => {
                setState((prev: Product) => ({...prev, title}))
            }
        },
        address: {
            value: state.address,
            onChange: (address: string) => {
                setState((prev: Product) => ({...prev, address}))
            }
        },
        email: {
            value: state.email,
            onChange: (email: string) => {
                setState((prev: Product) => ({...prev, email}))
            }
        },
        phoneNumber: {
            value: state.phoneNumber,
            onChange: (phoneNumber: string) => {
                setState((prev: Product) => ({...prev, phoneNumber}))
            }
        },
        country: {
            value: state.country,
            onChange: (country: string) => {
                setState((prev: Product) => ({...prev, country}))
            }
        },
        address2: {
            value: state.address2,
            onChange: (address2: string) => {
                setState((prev: Product) => ({...prev, address2}))
            }
        },
        zipCode: {
            value: state.zipCode,
            onChange: (zipCode: string) => {
                setState((prev: Product) => ({...prev, zipCode}))
            }
        },
        city: {
            value: state.city,
            onChange: (city: string) => {
                setState((prev: Product) => ({...prev, city}))
            }
        },
        linkedIn: {
            value: state.linkedIn,
            onChange: (linkedIn: string) => {
                setState((prev: Product) => ({...prev, linkedIn}))
            }
        },
        instagram: {
            value: state.instagram,
            onChange: (instagram: string) => {
                setState((prev: Product) => ({...prev, instagram}))
            }
        },
        facebook: {
            value: state.facebook,
            onChange: (facebook: string) => {
                setState((prev: Product) => ({...prev, facebook}))
            }
        },
        tiktok: {
            value: state.tiktok,
            onChange: (tiktok: string) => {
                setState((prev: Product) => ({...prev, tiktok}))
            }
        },
        youtube: {
            value: state.youtube,
            onChange: (youtube: string) => {
                setState((prev: Product) => ({...prev, youtube}))
            }
        },
        about: {
            value: state.about,
            onChange: (about: string) => {
                setState((prev: Product) => ({...prev, about}))
            }
        },
        companyName: {
            value: state.companyName,
            onChange: (companyName: string) => {
                setState((prev: Product) => ({...prev, companyName}))
            }
        },
        companyRegNumber: {
            value: state.companyRegNumber,
            onChange: (companyRegNumber: string) => {
                setState((prev: Product) => ({...prev, companyRegNumber}))
            }
        },
        companyAddress: {
            value: state.companyAddress,
            onChange: (companyAddress: string) => {
                setState((prev: Product) => ({...prev, companyAddress}))
            }
        },
        companyCity: {
            value: state.companyCity,
            onChange: (companyCity: string) => {
                setState((prev: Product) => ({...prev, companyCity}))
            }
        },
        companyCountry: {
            value: state.companyCountry,
            onChange: (companyCountry: string) => {
                setState((prev: Product) => ({...prev, companyCountry}))
            }
        },
        companyPhoneNumber: {
            value: state.companyPhoneNumber,
            onChange: (companyPhoneNumber: string) => {
                setState((prev: Product) => ({...prev, companyPhoneNumber}))
            }
        },
        companyAbout: {
            value: state.companyAbout,
            onChange: (companyAbout: string) => {
                setState((prev: Product) => ({...prev, companyAbout}))
            }
        },

        customLink: {
            value: state.customLink,
            onChange: (customLink: string) => {
                setState((prev: Product) => ({...prev, customLink}))
            }
        },
        filename1: {
            value: state.filename1,
            onChange: (filename1: string) => {
                setState((prev: Product) => ({...prev, filename1}))
            }
        },
        filename2: {
            value: state.filename2,
            onChange: (filename2: string) => {
                setState((prev: Product) => ({...prev, filename2}))
            }
        },
        filename3: {
            value: state.filename3,
            onChange: (filename3: string) => {
                setState((prev: Product) => ({...prev, filename3}))
            }
        },
        website: {
            value: state.website,
            onChange: (website: string) => {
                setState((prev: Product) => ({...prev, website}))
            }
        },
        youtubeLink: {
            value: state?.youtubeLink,
            onChange: (youtubeLink: string) => {
                setState((prev: Product) => ({...prev, youtubeLink}))
            }
        },
    }
}

export function ManageDevice() {
    const [productState, setProductState] = useState<Product>(defaultProduct)
    const [invalidFields, setInvalidFields] = useState(new Map<string, string>)
    const {db} = useContext(MainContext)
    const [imageURL, setImageURL] = useState("")

    const {
        firstName,
        email,
        address,
        phoneNumber,
        lastName,
        title,
        address2,
        city,
        about,
        country,
        facebook,
        instagram,
        linkedIn,
        tiktok,
        youtube,
        zipCode,
        companyAddress,
        companyPhoneNumber,
        companyCountry,
        companyRegNumber,
        companyName,
        companyCity,
        companyAbout,
        customLink,
        filename1,
        filename2,
        filename3,
        website,
        name,
        youtubeLink
    } = useEditState(productState, setProductState, invalidFields)
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('product_id')
    const imageRef = ref(storage, `images/${productId}`)


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
            getDownloadURL(imageRef)
                .then(url => {
                    setImageURL(url)
                    return Promise.resolve(true);
                })
                .catch(error => {
                    if (error.code === 'storage/object-not-found') {
                        return Promise.resolve(false);
                    } else {
                        return Promise.reject(error);
                    }
                });
        })()
    }, []);

    console.log(productState)
    const navigate = useNavigate()


    const saveProductData = async () => {
        const myVCard = new VCard()
        myVCard.addName(productState.lastName, productState.firstName)
        myVCard.addAddress(productState.address)
        myVCard.addCompany(productState.companyName)
        myVCard.addEmail(productState.email)
        myVCard.addJobtitle(productState.title)
        myVCard.addPhoneNumber(productState.phoneNumber)
        myVCard.addNote(productState.about)
        console.log(myVCard.toString())
        const blob = new Blob([myVCard.toString()], {type: "text/vcard"})
        const file = new File([blob], 'vCard.vcf', {type: "text/vcard"})

        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {...productState, activated: true})
            notify('Saved modifications')
        }
        const tempDoc = file
        console.log(tempDoc)
        if (tempDoc !== null) {
            const documentRef = ref(storage, `documents/${productId}/vCard`)
            console.log('start')
            uploadBytes(documentRef, tempDoc).then((data) => {
                console.log(data)
                setProductState((prev: Product) => ({...prev, cv: true}))
            })
            console.log('document uploaded')
        }
    }
    const [imageUpload, setImageUpload] = useState(null)
    const [documentUpload, setDocumentUpload] = useState(null)
    const uploadImage = async (e: any) => {
        setImageUpload(e.target.files[0])
        if (e.target.files[0] !== null) {
            const imageRef = ref(storage, `images/${productId}`)
            console.log('start')
            await uploadBytes(imageRef, e.target.files[0])
            getDownloadURL(imageRef)
                .then(url => {
                    setImageURL(url)
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
    }

    const uploadCV = async (e: any) => {
        const tempDoc = e.target.files[0]
        setDocumentUpload(tempDoc)
        if (tempDoc !== null) {
            const documentRef = ref(storage, `documents/${productId}/CV`)
            console.log('start')
            uploadBytes(documentRef, tempDoc).then((data) => {
                console.log(data)
                setProductState((prev: Product) => ({...prev, cv: true}))
            })
            console.log('document uploaded')
        }
    }
    const uploadFile1 = async (e: any) => {
        const tempDoc = e.target.files[0]
        setDocumentUpload(tempDoc)
        if (tempDoc !== null) {
            const documentRef = ref(storage, `documents/${productId}/file1`)
            console.log('start')
            uploadBytes(documentRef, tempDoc).then((data) => {
                console.log(data)
            })
            console.log('document uploaded')
        }
    }
    const uploadFile2 = async (e: any) => {
        const tempDoc = e.target.files[0]
        setDocumentUpload(tempDoc)
        if (tempDoc !== null) {
            const documentRef = ref(storage, `documents/${productId}/file2`)
            console.log('start')
            uploadBytes(documentRef, tempDoc).then((data) => {
                console.log(data)
            })
            console.log('document uploaded')
        }
    }
    const uploadFile3 = async (e: any) => {
        const tempDoc = e.target.files[0]
        setDocumentUpload(tempDoc)
        if (tempDoc !== null) {
            const documentRef = ref(storage, `documents/${productId}/file3`)
            console.log('start')
            uploadBytes(documentRef, tempDoc).then((data) => {
                console.log(data)
            })
            console.log('document uploaded')
        }
    }
    //
    // const uploadVideo = async (e: any) => {
    //     const KEY = "AIzaSyDImWdobJArKrP4fN5S4VfY9gokWCH3gOk"
    //
    //     // const video = e.target.files[0]
    //     // console.log(video)
    //     axios.post(`https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet?key=${KEY}`).then((res) => {
    //         console.log(res)
    //     }).catch((error) => {
    //         console.log(error)
    //
    //     })
    // }

    const onChangeWrapper = (key: any) => {
        return (e: any) => {
            key.onChange(e.target.value)
        }
    }

    const [showSection, setShowSection] = useState('bussines-card')

    const setPreviewBusiness = async () => {
        setProductState((prev: Product) => ({...prev, preview: Preview.BUSINESS_CARD}))
        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {preview: Preview.BUSINESS_CARD})
            // setProductState((prev: Product) => ({...prev, preview: Preview.BUSINESS_CARD}))
            notify('Changed the public page.')
        }
    }

    const setPreviewCustomLink = async () => {

        setProductState((prev: Product) => ({...prev, preview: Preview.CUSTOM_LINK}))
        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {preview: Preview.CUSTOM_LINK})
            notify('Changed the public page.')

        }
    }

    const setPreviewUploadFile = async () => {
        setProductState((prev: Product) => ({...prev, preview: Preview.UPLOAD_FILE}))
        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {preview: Preview.UPLOAD_FILE})
            setProductState((prev: Product) => ({...prev, preview: Preview.UPLOAD_FILE}))
            notify('Changed the public page.')
        }
    }

    const setPreviewUploadVideo = async () => {
        setProductState((prev: Product) => ({...prev, preview: Preview.UPLOAD_VIDEO}))
        if (productId) {
            const productRef = doc(db, 'products', productId)
            await updateDoc(productRef, {preview: Preview.UPLOAD_VIDEO})
            setProductState((prev: Product) => ({...prev, preview: Preview.UPLOAD_VIDEO}))
            notify('Changed the public page.')
        }
    }

    return (<div className={"page-manager"}>
        <div className={'preview-side'}>
            <div className={'show-on-device'}>Show on Device</div>
            <div className={'preview-option'}>
                <span>Business Card</span>
                <input type={'checkbox'} checked={productState.preview === Preview.BUSINESS_CARD} onChange={setPreviewBusiness}/>
            </div>
            <div className={'preview-option'}>
                <span>Custom Link</span>
                <input type={'checkbox'} checked={productState.preview === Preview.CUSTOM_LINK} onChange={setPreviewCustomLink}/>
            </div>
            <div className={'preview-option'}>
                <span>Upload File</span>
                <input type={'checkbox'} checked={productState.preview === Preview.UPLOAD_FILE} onChange={setPreviewUploadFile}/>
            </div>
            <div className={'preview-option'}>
                <span>Upload Video</span>
                <input type={'checkbox'} checked={productState.preview === Preview.UPLOAD_VIDEO}
                       onChange={setPreviewUploadVideo}/>
            </div>
            <div className={'preview-button'} onClick={() => {navigate(`/show-product?product_id=${productId}`)}}> <img className={'preview-logo'} src={PreviewLogo} alt={'preview'}/>Preview</div>
        </div>
        <div className={'main-manager'}>
            <div className={'header-selector'}>
                <div className={'business-card-header'} onClick={() => setShowSection('bussines-card')}>Business Card
                </div>
                <div className={'custom-link-header'} onClick={() => setShowSection('custom-link')}>Custom Link</div>
                <div className={'file-upload-header'} onClick={() => setShowSection('upload-file')}>File Upload</div>
                <div className={'file-upload-header'} onClick={() => setShowSection('upload-video')}>Video Upload</div>
            </div>
            {showSection === 'bussines-card' && <div className={'form'}>
                <div className={'personal-side'}>
                    <input placeholder={'Device Name'} className={'form-manager-input'} value={name.value}
                           onChange={onChangeWrapper(name)}/>
                    <input placeholder={'First Name'} className={'form-manager-input'} value={firstName.value}
                           onChange={onChangeWrapper(firstName)}/>
                    <input placeholder={'Last Name'} className={'form-manager-input'} value={lastName.value}
                           onChange={onChangeWrapper(lastName)}/>
                    <input placeholder={'Title'} className={'form-manager-input'} value={title.value}
                           onChange={onChangeWrapper(title)}/>
                    <input placeholder={'Email'} className={'form-manager-input'} value={email.value}
                           onChange={onChangeWrapper(email)}/>
                    <input placeholder={'About'} className={'form-manager-input'} value={about.value}
                           onChange={onChangeWrapper(about)}/>
                    <input placeholder={'Phone Number'} className={'form-manager-input'} value={phoneNumber.value}
                           onChange={onChangeWrapper(phoneNumber)}/>
                    <input placeholder={'Website'} className={'form-manager-input'} value={website.value}
                           onChange={onChangeWrapper(website)}/>
                    <input placeholder={'Street Address'} className={'form-manager-input'} value={address.value}
                           onChange={onChangeWrapper(address)}/>
                    <input placeholder={'Street Address 2'} className={'form-manager-input'} value={address2.value}
                           onChange={onChangeWrapper(address2)}/>
                    <input placeholder={'Country / Region'} className={'form-manager-input'} value={country.value}
                           onChange={onChangeWrapper(country)}/>
                    <input placeholder={'City'} className={'form-manager-input'} value={city.value}
                           onChange={onChangeWrapper(city)}/>
                    <input placeholder={'Tik Tok'} className={'form-manager-input'} value={tiktok.value}
                           onChange={onChangeWrapper(tiktok)}/>
                    <input placeholder={'Instagram'} className={'form-manager-input'} value={instagram.value}
                           onChange={onChangeWrapper(instagram)}/>
                    <input placeholder={'LinkedIn'} className={'form-manager-input'} value={linkedIn.value}
                           onChange={onChangeWrapper(linkedIn)}/>
                    <input placeholder={'Facebook'} className={'form-manager-input'} value={facebook.value}
                           onChange={onChangeWrapper(facebook)}/>
                    <input placeholder={'Youtube'} className={'form-manager-input'} value={youtube.value}
                           onChange={onChangeWrapper(youtube)}/>
                </div>
                <div className={'company-side'}>
                    <input placeholder={`Company's Name`} className={'form-manager-input'} value={companyName.value}
                           onChange={onChangeWrapper(companyName)}/>
                    <input placeholder={`Reg. Number`} className={'form-manager-input'} value={companyRegNumber.value}
                           onChange={onChangeWrapper(companyRegNumber)}/>
                    <input placeholder={`Zip Code`} className={'form-manager-input'} value={zipCode.value}
                           onChange={onChangeWrapper(zipCode)}/>
                    <input placeholder={`City`} className={'form-manager-input'} value={companyCity.value}
                           onChange={onChangeWrapper(companyCity)}/>
                    <input placeholder={`Country`} className={'form-manager-input'} value={companyCountry.value}
                           onChange={onChangeWrapper(companyCountry)}/>
                    <input placeholder={`Phone Number`} className={'form-manager-input'}
                           value={companyPhoneNumber.value} onChange={onChangeWrapper(companyPhoneNumber)}/>
                    <input placeholder={`About`} className={'form-manager-input'} value={companyAbout.value}
                           onChange={onChangeWrapper(companyAbout)}/>
                    <h6>Give your profile a face: Set a current portrait as your first profile photo. Smile please</h6>
                    <div className={'image-upload-wrapper'}>
                     <ImageUpload/>
                    </div>
                    <h6>Upload your CV</h6>
                    <input className={'custom-file-input'} type={'file'} onChange={uploadCV} accept={'.pdf'}/>

                    <Button onClick={saveProductData}>Save</Button>
                </div>
            </div>}
            {showSection === 'custom-link' && <div className={'form-custom-link'}>
                <input placeholder={'Custom link'} className={'form-manager-input'} value={customLink.value}
                       onChange={onChangeWrapper(customLink)}/>
                <Button onClick={saveProductData}>Save</Button>
            </div>}
            {showSection === 'upload-file' && <div className={'form-file-upload'}>
                <input className={'custom-file-input'} type={'file'} onChange={uploadFile1} accept={'.pdf, .vcf'}/>
                <input placeholder={`Filename 1`} className={'form-manager-input'} value={filename1.value}
                       onChange={onChangeWrapper(filename1)}/>
                <input className={'custom-file-input'} type={'file'} onChange={uploadFile2} accept={'.pdf'}/>
                <input placeholder={`Filename 2`} className={'form-manager-input'} value={filename2.value}
                       onChange={onChangeWrapper(filename2)}/>
                <input className={'custom-file-input'} type={'file'} onChange={uploadFile3} accept={'.pdf'}/>
                <input placeholder={`Filename 3`} className={'form-manager-input'} value={filename3.value}
                       onChange={onChangeWrapper(filename3)}/>
                <Button onClick={saveProductData}>Save</Button>
            </div>}

            {showSection === "upload-video" && <div className={'form-file-upload'}>
                <input placeholder={'Video Youtube Link'} className={'form-manager-input'} value={youtubeLink.value}
                       onChange={onChangeWrapper(youtubeLink)}/>
                <Button onClick={saveProductData}>Save</Button>

            </div>}
        </div>

    </div>)
}
