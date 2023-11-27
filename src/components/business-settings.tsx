import {Product, useEditState, useProductInformation} from "../control-state";
import ImageUpload from "./image-upload";
import {Button, TextField} from "@mui/material";
import {getProductIdFromURL, onChangeWrapper, useUploadFile, useUploadLogo} from "../utils";
import {useSaveProductData} from "../useProductData";
import {useContext, useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db, storage} from "../App";
import {ManageProductContext} from "../contexts";
import {HexAlphaColorPicker, HexColorInput, HexColorPicker} from "react-colorful";
import {getDownloadURL, ref} from "firebase/storage";
import BackArrowIcon from "../assets/back_arrow_icon.svg";
import Logo from "../assets/flexpayz-logo.svg";
import {useNavigate} from "react-router";
import {SettingsHeader} from "../Pages/manage-device";

export function BusinessSettings() {
    const {setProductState, productState} = useProductInformation()
    const {
        firstName,
        lastName,
        title,
        email,
        email2,
        email3,
        about,
        phoneNumber,
        phoneNumber2,
        phoneNumber3,
        website,
        address,
        address2,
        country,
        city,
        tiktok,
        instagram,
        linkedIn,
        facebook,
        youtube,
        companyPhoneNumber,
        companyRegNumber,
        companyCountry,
        companyAddress,
        companyAbout,
        companyCity,
        companyName,
        zipCode,
        color1,
        color2,
        businessFile
    } = useEditState()
    const navigate = useNavigate()


    const saveProductData = useSaveProductData()

    const uploadCV = useUploadFile('CV', 'cv')
    const uploadLogo = useUploadLogo()
    const productId = getProductIdFromURL()
    const [logoImageURL, setLogoImageURL] = useState( '')

    useEffect(() => {
        const logoRef = ref(storage, `images/logo-${productId}`)
        getDownloadURL(logoRef)
            .then(url => {
                setProductState((prev:Product) => ({...prev, logo: url}))
                return Promise.resolve(true);
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error);
                }
            });
    }, []);

    return <div className={'settings-page'}>
        <SettingsHeader/>
        <div className={'section-title'}>BUSINESS CARD</div>
        <h2 className={'pinline'}><span>PAGES</span></h2>
        <TextField label={'First name'} value={firstName.value} onChange={onChangeWrapper(firstName)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Last Name'} value={lastName.value}
                   onChange={onChangeWrapper(lastName)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Title'} value={title.value}
                   onChange={onChangeWrapper(title)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Email'} value={email.value}
                   onChange={onChangeWrapper(email)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Email'} value={email2.value}
                   onChange={onChangeWrapper(email2)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Email'} value={email3.value}
                   onChange={onChangeWrapper(email3)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'About'} value={about.value}
                   onChange={onChangeWrapper(about)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} multiline={true} minRows={3} maxRows={5}
                   sx={{textarea: {color: 'white'}}}/>
        <TextField label={'Phone Number'} value={phoneNumber.value}
                   onChange={onChangeWrapper(phoneNumber)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Phone Number'} value={phoneNumber2.value}
                   onChange={onChangeWrapper(phoneNumber2)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Phone Number'} value={phoneNumber3.value}
                   onChange={onChangeWrapper(phoneNumber3)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Website'} value={website.value}
                   onChange={onChangeWrapper(website)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Street Address'} value={address.value}
                   onChange={onChangeWrapper(address)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Street Address 2'} value={address2.value}
                   onChange={onChangeWrapper(address2)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'Country / Region'} value={country.value}
                   onChange={onChangeWrapper(country)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <TextField label={'City'} className={'form-manager-input'} value={city.value}
                   onChange={onChangeWrapper(city)} variant={"outlined"} size={"small"} sx={{input: {color: 'white'}}}/>
        <TextField label={'Tik Tok'} className={'form-manager-input'} value={tiktok.value}
                   onChange={onChangeWrapper(tiktok)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={'Instagram'} className={'form-manager-input'} value={instagram.value}
                   onChange={onChangeWrapper(instagram)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={'LinkedIn'} className={'form-manager-input'} value={linkedIn.value}
                   onChange={onChangeWrapper(linkedIn)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={'Facebook'} className={'form-manager-input'} value={facebook.value}
                   onChange={onChangeWrapper(facebook)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={'Youtube'} className={'form-manager-input'} value={youtube.value}
                   onChange={onChangeWrapper(youtube)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={`Company's Name`} className={'form-manager-input'} value={companyName.value}
                   onChange={onChangeWrapper(companyName)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={`Reg. Number`} className={'form-manager-input'} value={companyRegNumber.value}
                   onChange={onChangeWrapper(companyRegNumber)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={`Zip Code`} className={'form-manager-input'} value={zipCode.value}
                   onChange={onChangeWrapper(zipCode)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={`City`} className={'form-manager-input'} value={companyCity.value}
                   onChange={onChangeWrapper(companyCity)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={`Country`} className={'form-manager-input'} value={companyCountry.value}
                   onChange={onChangeWrapper(companyCountry)} variant={"outlined"} size={"small"}
                   sx={{input: {color: 'white'}}}/>
        <TextField label={`Phone Number`} className={'form-manager-input'}
                   value={companyPhoneNumber.value} onChange={onChangeWrapper(companyPhoneNumber)}
                   variant={"outlined"} size={"small"} sx={{input: {color: 'white'}}}/>
        <TextField label={`About`} className={'form-manager-input'} value={companyAbout.value}
                   onChange={onChangeWrapper(companyAbout)} variant={"outlined"} size={"small"} multiline={true}
                   minRows={3} sx={{textarea: {color: 'white'}}}/>
        <h2 className={'pinline'}><span>PROFILE IMAGE</span></h2>
        <div className={'explanation-text'}>Give your profile a face: Set a current portrait as your first profile
            photo. Smile please
        </div>
        <div className={'image-upload-wrapper'}>
            <ImageUpload/>
        </div>
        <h2 className={'pinline'}><span>LOGO</span></h2>
        <div className={'explanation-text-small'}>Upload your Logo</div>
        <div className={'logo-upload-wrapper'}>
            <input className={'custom-file-input'} type={'file'} onChange={uploadLogo} accept={'image/*'}/>
            {productState.logo && <img src={productState.logo}/>}
        </div>
        <h2 className={'pinline'}><span>BUSINESS FILE</span></h2>
        <div className={'explanation-text-small'}>Upload your Business File</div>
        <TextField label={`File name`} className={'form-manager-input'}
                   value={businessFile.value} onChange={onChangeWrapper(businessFile)}
                   variant={"outlined"} size={"small"} sx={{input: {color: 'white'}}}/>
        <input className={'custom-file-input'} type={'file'} onChange={uploadCV} accept={'.pdf'}/>
        <h2 className={'pinline'}><span>CUSTOMISE BACKGROUND</span></h2>
        <div className={'explanation-text'} style={{marginTop: '24px'}}>Express your emotions through your profile by
            selecting a background that resonates with your
            identity.
        </div>
        <div>
            <HexColorPicker style={{marginTop: '24px', marginBottom: '12px'}} color={color1.value}
                                 onChange={color1.onChange}/>
            <TextField label={`Color`} className={'form-manager-input'} value={color1.value}
                       onChange={onChangeWrapper(color1)} variant={"outlined"} size={"small"}
                       sx={{input: {color: 'white'}}}/>
            <HexColorPicker style={{marginTop: '24px', marginBottom: '12px'}} color={color2.value}
                                 onChange={color2.onChange}/>
            <TextField label={`Color`} className={'form-manager-input'} value={color2.value}
                       onChange={onChangeWrapper(color2)} variant={"outlined"} size={"small"}
                       sx={{input: {color: 'white'}}}/>
        </div>

        <button className={'red-save-button'} onClick={saveProductData}>Save</button>
    </div>
}

