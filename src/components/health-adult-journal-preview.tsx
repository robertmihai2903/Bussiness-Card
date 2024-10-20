import React, {useContext} from "react";
import {AdultJournalStateContext} from "./adult-journal-settings";
import {
    LargeInfoPreview,
    MultipleInvestigationPreview, MultipleVitalSignsPreview,
    ProfilePicturePreview,
    SmallInfoPreview
} from "./home-baby-journal-preview";
import AssetUpload3 from "./asset-upload-3";
import {MediaPreview} from "./media-preview";

export function HealthAdultJournalPreview() {
    const {adultJournalState} = useContext(AdultJournalStateContext)
    const {
        previousConditions,
        medication,
        allergies,
        familyHistory,
        generalPhysicalExamination,
        vitalSigns,
        bloodType,
        europeanHealthCard
    } = adultJournalState
    return <div className={"j-segment-container"}>
        <h1 className={"j-preview-title"}>Medical History</h1>
        <LargeInfoPreview label={"previous conditions"} info={previousConditions}/>
        <LargeInfoPreview label={"medication"} info={medication}/>
        <LargeInfoPreview label={"allergies"} info={allergies}/>
        <LargeInfoPreview label={"family history"} info={familyHistory}/>

        <h1 className={"j-preview-title"}>European Health Card</h1>
        <MediaPreview value={europeanHealthCard}/>

        <h1 className={"j-preview-title"}>Clinical Examination</h1>
        <LargeInfoPreview label={"General Physical Examination"} info={generalPhysicalExamination}/>

        <h3 className={"j-preview-title"}>Vital Signs</h3>
        <SmallInfoPreview label={"blood type"} info={bloodType}/>
        <MultipleVitalSignsPreview signs={vitalSigns}/>

    </div>
}