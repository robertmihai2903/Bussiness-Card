import React, {useContext} from "react";
import {TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";
import "./journal-segment.css"
import {DatePickerConverted} from "./date-picker-converted";
import {TimePickerConverted} from "./time-picker-converted";
import AssetUpload3 from "./asset-upload-3";
import {ProfileUpload} from "./profile-upload";
import {AdultJournalEditContext, InvestigationHandler} from "./adult-journal-settings";
import {DB_COLLECTIONS, DB_STORAGE} from "./baby-journal-settings";

interface InvestigationInputProps {
    label: string,
    handler: InvestigationHandler,
    descriptionPlaceholder?: string,
}

export function InvestigationInput({label, handler, descriptionPlaceholder = ""}: InvestigationInputProps) {
    return <div className={"j-segment-investigation-input"}>
        <h4 className={"j-segment-investigation-input-label"}>{label}</h4>
        <TextField label={"Description"} value={handler.description.value}
                   placeholder={descriptionPlaceholder}
                   className={"j-segment-investigation-input-textfield"}
                   onChange={onChangeWrapper(handler.description)} variant={"outlined"} size={"small"} multiline
                   maxRows={5}/>
        <AssetUpload3 value={handler.assets.value} onChange={handler.assets.onChange} multiple={true} maxFiles={5}
                      storageFolder={DB_STORAGE.ADULT_JOURNAL}/>
    </div>
}

export function InvestigationsAdultJournalSegment() {
    const {
        laboratoryTests,
        bloodTests,
        biochemistry,
        inflammatoryMarkers,
        tumorMarkers,
        hormonalProfiles,
        urineTests,
        stoolTests,
        coagulationTests,
        INR,
        xRay,
        ultrasound,
        computedTomography,
        magneticResonanceImaging,
        scintigraphy,
        upperDigestiveEndoscopy,
        colonoscopy,
        bronchoscopy,
        electrocardiogram,
        echocardiography,
        spirometry,
        stressTest,
        geneticTests,
        pcrTests,
        boneDensitometry
    } = useContext(AdultJournalEditContext)! //TODO
    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>Paraclinical Investigations</h1>
        <InvestigationInput label={"Laboratory Tests"} handler={laboratoryTests}/>
        <InvestigationInput label={"Blood Tests"} handler={bloodTests}/>
        <InvestigationInput label={"Biochemistry"} handler={biochemistry}/>
        <InvestigationInput label={"Inflammatory Markers"} handler={inflammatoryMarkers}/>
        <InvestigationInput label={"Tumor Markers"} handler={tumorMarkers}/>
        <InvestigationInput label={"Hormonal Profiles"} handler={hormonalProfiles}/>
        <InvestigationInput label={"Urine Tests"} handler={urineTests}/>
        <InvestigationInput label={"Stool Tests"} handler={stoolTests}/>
        <InvestigationInput label={"Coagulation Tests"} handler={coagulationTests}/>
        <InvestigationInput label={"INR"} handler={INR}/>

        <h1 className={"j-segment-title"}>High-Performance Investigations</h1>
        <InvestigationInput label={"X-ray"} handler={xRay}/>
        <InvestigationInput label={"Ultrasound"} handler={ultrasound}/>
        <InvestigationInput label={"Computed Tomography (CT)"} handler={computedTomography}/>
        <InvestigationInput label={"Magnetic Resonance Imaging (MRI)"} handler={magneticResonanceImaging}/>
        <InvestigationInput label={"Scintigraphy"} handler={scintigraphy}/>

        <h1 className={"j-segment-title"}>Endoscopic Procedures</h1>
        <InvestigationInput label={"Upper Digestive Endoscopy"} handler={upperDigestiveEndoscopy}/>
        <InvestigationInput label={"Colonoscopy"} handler={colonoscopy}/>
        <InvestigationInput label={"Bronchoscopy"} handler={bronchoscopy}/>

        <h1 className={"j-segment-title"}>Functional Tests</h1>
        <InvestigationInput label={"Electrocardiogram (ECG)"} handler={electrocardiogram}/>
        <InvestigationInput label={"Echocardiography"} handler={echocardiography}/>
        <InvestigationInput label={"Spirometry"} handler={spirometry}/>
        <InvestigationInput label={"Stress Test (Ergometry)"} handler={stressTest}/>

        <h1 className={"j-segment-title"}>Advanced Genetic and Molecular Biology</h1>
        <InvestigationInput label={"Genetic Tests"} handler={geneticTests}/>
        <InvestigationInput label={"PCR Tests"} handler={pcrTests}/>
        <InvestigationInput label={"Bone Densitometry (DEXA)"} handler={boneDensitometry}/>

    </div>
}