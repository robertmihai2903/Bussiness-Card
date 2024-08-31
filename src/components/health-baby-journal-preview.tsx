import React, {useContext} from "react";
import {Asset, BabyJournalStateContext} from "./baby-journal-settings";
import {LargeInfoPreview, ProfilePicturePreview, SmallInfoPreview} from "./home-baby-journal-preview";
import "./home-baby-journal-preview.css"
import {MediaPreview} from "./media-preview";


export function HealthBabyJournalPreview() {
    const {babyJournalState} = useContext(BabyJournalStateContext)
    const {mother, father, healthProblems, vaccines, allergies, medication, chronicAversions, otherHealthConditions, medicalRecords} = babyJournalState
    return <div className={"j-segment-container"}>
        <h2 className={"j-preview-title"}>Medical Records</h2>
        <MediaPreview value={medicalRecords}/>
        <h2 className={"j-preview-title"}>Mom</h2>
        <ProfilePicturePreview asset={mother.profilePicture[0]}/>
        <SmallInfoPreview label={"name"} info={mother.name}/>
        <SmallInfoPreview label={"allergies"} info={mother.allergies}/>
        <SmallInfoPreview label={"diseases"} info={mother.diseases}/>
        <SmallInfoPreview label={"chronic aversions"} info={mother.chronicAversions}/>
        <SmallInfoPreview label={"Blood type"} info={mother.bloodType}/>

        <h2 className={"j-preview-title"}>Dad</h2>
        <ProfilePicturePreview asset={father.profilePicture[0]}/>
        <SmallInfoPreview label={"name"} info={father.name}/>
        <SmallInfoPreview label={"allergies"} info={father.allergies}/>
        <SmallInfoPreview label={"diseases"} info={father.diseases}/>
        <SmallInfoPreview label={"chronic aversions"} info={father.chronicAversions}/>
        <SmallInfoPreview label={"Blood type"} info={father.bloodType}/>



        <h2 className={"j-preview-title"}>Allergies, Health Info, Vaccines</h2>
        <LargeInfoPreview label={"Health Problems"} info={healthProblems}/>
        <SmallInfoPreview label={"vaccines"} info={vaccines}/>
        <SmallInfoPreview label={"allergies"} info={allergies}/>
        <SmallInfoPreview label={"medication"} info={medication}/>
        <SmallInfoPreview label={"chronic aversions"} info={chronicAversions}/>
        <LargeInfoPreview label={"Other"} info={otherHealthConditions}/>
    </div>
}