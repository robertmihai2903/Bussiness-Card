import {Product, useEditState} from "../control-state";
import ImageUpload from "./image-upload";
import {Button, TextField} from "@mui/material";
import {onChangeWrapper, useUploadFile} from "../utils";
import {useSaveProductData} from "../useProductData";
import {useContext, useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../App";
import {ManageProductContext} from "../contexts";
import {HexAlphaColorPicker, HexColorInput} from "react-colorful";

export function BusinessSettings() {
    const {setProductState} = useContext(ManageProductContext)
    const {
        firstName,
        lastName,
        title,
        email,
        about,
        phoneNumber,
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
        color2
    } = useEditState()


    const saveProductData = useSaveProductData()

    const uploadCV = useUploadFile('CV', 'cv')

    return <div className={'basic-page'}>
        <div className={'section-title'}>Business Card</div>
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
        <TextField label={'About'} value={about.value}
                   onChange={onChangeWrapper(about)} variant={"outlined"} size={"small"}
                   className={'form-manager-input'} multiline={true} minRows={3} maxRows={5}
                   sx={{textarea: {color: 'white'}}}/>
        <TextField label={'Phone Number'} value={phoneNumber.value}
                   onChange={onChangeWrapper(phoneNumber)} variant={"outlined"} size={"small"}
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
        <div className={'explanation-text'}>Give your profile a face: Set a current portrait as your first profile
            photo. Smile please
        </div>
        <div className={'image-upload-wrapper'}>
            <ImageUpload/>
        </div>
        <div className={'explanation-text-small'}>Upload your CV</div>
        <input className={'custom-file-input'} type={'file'} onChange={uploadCV} accept={'.pdf'}/>
        <div className={'explanation-text'} style={{marginTop: '24px'}}>Express your emotions through your profile by
            selecting a background that resonates with your
            identity.
        </div>
        <div>
            <HexAlphaColorPicker style={{marginTop: '24px', marginBottom: '12px'}} color={color1.value}
                                 onChange={color1.onChange}/>
            <TextField label={`Color`} className={'form-manager-input'} value={color1.value}
                       onChange={onChangeWrapper(color1)} variant={"outlined"} size={"small"}
                       sx={{input: {color: 'white'}}}/>
            <HexAlphaColorPicker style={{marginTop: '24px', marginBottom: '12px'}} color={color2.value}
                                 onChange={color2.onChange}/>
            <TextField label={`Color`} className={'form-manager-input'} value={color2.value}
                       onChange={onChangeWrapper(color2)} variant={"outlined"} size={"small"}
                       sx={{input: {color: 'white'}}}/>
        </div>

        <button className={'red-save-button'} onClick={saveProductData}>Save</button>
    </div>
}

