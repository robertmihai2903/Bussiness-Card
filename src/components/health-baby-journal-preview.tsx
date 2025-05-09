import React, {useContext} from "react";
import {Asset, BabyJournalStateContext} from "./baby-journal-settings";
import {
    LargeInfoPreview,
    MultipleInvestigationPreview,
    ProfilePicturePreview,
    SmallInfoPreview
} from "./home-baby-journal-preview";
import "./home-baby-journal-preview.css"
import {MediaPreview} from "./media-preview";


export function HealthBabyJournalPreview() {
    const {babyJournalState} = useContext(BabyJournalStateContext)
    const {mother, father, healthProblems, vaccines, allergies, medication, chronicAversions, otherHealthConditions, medicalRecords, europeanHealthCard} = babyJournalState
    return <div className={"j-segment-container"}>
        <h2 className={"j-preview-title"}>Medical Records</h2>
        <MediaPreview value={medicalRecords}/>

        <h2 className={"j-preview-title"}>Allergies, Health Info, Vaccines</h2>
        <MultipleInvestigationPreview investigations={healthProblems} label={"Health Problems"}/>
        <MultipleInvestigationPreview investigations={vaccines} label={"Vaccines"}/>
        <MultipleInvestigationPreview investigations={allergies} label={"Allergies"}/>
        <MultipleInvestigationPreview investigations={medication} label={"Medication"}/>
        <MultipleInvestigationPreview investigations={chronicAversions} label={"Chronic Aversions"}/>
        <LargeInfoPreview label={"Other"} info={otherHealthConditions}/>

        <h1 className={"j-preview-title"}>European Health Card</h1>
        <MediaPreview value={europeanHealthCard}/>

        <h2 className={"j-preview-title"}>Mom</h2>
        <ProfilePicturePreview asset={mother.profilePicture[0]}/>
        <SmallInfoPreview label={"name"} info={mother.name}/>
        <SmallInfoPreview label={"allergies"} info={mother.allergies}/>
        <SmallInfoPreview label={"diseases"} info={mother.diseases}/>
        <SmallInfoPreview label={"Chronic Adverse Reaction"} info={mother.chronicAversions}/>
        <SmallInfoPreview label={"Blood type"} info={mother.bloodType}/>

        <h2 className={"j-preview-title"}>Dad</h2>
        <ProfilePicturePreview asset={father.profilePicture[0]}/>
        <SmallInfoPreview label={"name"} info={father.name}/>
        <SmallInfoPreview label={"allergies"} info={father.allergies}/>
        <SmallInfoPreview label={"diseases"} info={father.diseases}/>
        <SmallInfoPreview label={"Chronic Adverse Reaction"} info={father.chronicAversions}/>
        <SmallInfoPreview label={"Blood type"} info={father.bloodType}/>
    </div>
}