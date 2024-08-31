import React, {useContext} from "react";
import {ProfilePicturePreview, SmallInfoPreview} from "./home-baby-journal-preview";
import {AdultJournalStateContext} from "./adult-journal-settings";

export function HomeAdultJournalPreview() {
    const {adultJournalState} = useContext(AdultJournalStateContext)
    const {
        profilePicture,
        name,
        birthDate,
        gender,
        personalIdNumber,
        address,
        phone,
        medicalRecordNumber,
    } = adultJournalState
    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>{name}</h1>
        <ProfilePicturePreview asset={profilePicture[0]}/>
        <SmallInfoPreview label={"gender"} info={gender}/>
        <SmallInfoPreview label={"date of birth"} info={birthDate}/>
        <SmallInfoPreview label={"personal identification number"} info={personalIdNumber}/>
        <SmallInfoPreview label={"address"} info={address}/>
        <SmallInfoPreview label={"phone number"} info={phone}/>
        <SmallInfoPreview label={"medical record number"} info={medicalRecordNumber}/>
    </div>
}