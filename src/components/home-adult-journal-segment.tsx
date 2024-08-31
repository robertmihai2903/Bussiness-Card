import React, {useContext} from "react";
import {TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";
import "./journal-segment.css"
import {DatePickerConverted} from "./date-picker-converted";
import {TimePickerConverted} from "./time-picker-converted";
import AssetUpload3 from "./asset-upload-3";
import {ProfileUpload} from "./profile-upload";
import {AdultJournalEditContext} from "./adult-journal-settings";
import {DB_COLLECTIONS, DB_STORAGE} from "./baby-journal-settings";

export function HomeAdultJournalSegment() {
    const {
        profilePicture,
        name,
        birthDate,
        personalIdNumber,
        medicalRecordNumber,
        gender,
        address,
        phone,
        bloodType
    } = useContext(AdultJournalEditContext)! //TODO
    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>Personal Data</h1>
        <ProfileUpload value={profilePicture.value} onChange={profilePicture.onChange}
                       storageFolder={DB_STORAGE.ADULT_JOURNAL}/>
        <TextField label={'Full name'} value={name.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(name)} variant={"outlined"} size={"small"}/>
        <DatePickerConverted label={"Birth Date"} value={birthDate.value} onChange={birthDate.onChange}
                             className={"j-segment-date-picker"}/>
        <TextField label={'Gender'} value={gender.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(gender)} variant={"outlined"} size={"small"}/>
        <TextField label={'Personal Identification Number'} value={personalIdNumber.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(personalIdNumber)} variant={"outlined"} size={"small"}/>
        <TextField label={'Address'} value={address.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(address)} variant={"outlined"} size={"small"}/>
        <TextField label={'Phone number'} value={phone.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(phone)} variant={"outlined"} size={"small"}/>
        <TextField label={'Medical Record Number'} value={medicalRecordNumber.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(medicalRecordNumber)} variant={"outlined"} size={"small"}/>

        <TextField label={'Blood Type'} value={bloodType.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(bloodType)} variant={"outlined"} size={"small"}/>
    </div>
}