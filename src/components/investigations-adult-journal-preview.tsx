import React, {useContext} from "react";
import {AdultJournalStateContext} from "./adult-journal-settings";
import {
    InvestigationPreview,
    LargeInfoPreview,
    MultipleInvestigationPreview,
    SmallInfoPreview
} from "./home-baby-journal-preview";

export function InvestigationsAdultJournalPreview() {
    const {adultJournalState} = useContext(AdultJournalStateContext)
    const {
laboratoryTests, bloodTests, biochemistry, inflammatoryMarkers, tumorMarkers, hormonalProfiles, urineTests, stoolTests, coagulationTests, INR,
    xRay, ultrasound, computedTomography, magneticResonanceImaging, scintigraphy,upperDigestiveEndoscopy, colonoscopy, bronchoscopy,
    electrocardiogram, echocardiography, spirometry, stressTest, geneticTests, pcrTests, boneDensitometry} = adultJournalState
    return <div className={"j-segment-container"}>
        <h1 className={"j-preview-title"}>Paraclinical Investigations</h1>
        <MultipleInvestigationPreview investigations={laboratoryTests} label={"Laboratory Tests"}/>
        <MultipleInvestigationPreview investigations={bloodTests} label={"Blood Tests"}/>
        <MultipleInvestigationPreview investigations={biochemistry} label={"Biochemistry"}/>
        <MultipleInvestigationPreview investigations={inflammatoryMarkers} label={"Inflammatory Markers"}/>
        <MultipleInvestigationPreview investigations={tumorMarkers} label={"Tumor Markers"}/>
        <MultipleInvestigationPreview investigations={hormonalProfiles} label={"Hormonal Profiles"}/>
        <MultipleInvestigationPreview investigations={urineTests} label={"Urine Tests"}/>
        <MultipleInvestigationPreview investigations={stoolTests} label={"Stool Tests"}/>
        <MultipleInvestigationPreview investigations={coagulationTests} label={"Coagulation Tests"}/>
        <MultipleInvestigationPreview investigations={INR} label={"INR"}/>

        <h1 className={"j-preview-title"}>High-Performance Investigations</h1>
        <MultipleInvestigationPreview investigations={xRay} label={"X-Ray"}/>
        <MultipleInvestigationPreview investigations={ultrasound} label={"Ultrasound"}/>
        <MultipleInvestigationPreview investigations={computedTomography} label={"Computed Tomography (CT)"}/>
        <MultipleInvestigationPreview investigations={magneticResonanceImaging} label={"Magnetic Resonance Imaging (MRI)"}/>
        <MultipleInvestigationPreview investigations={scintigraphy} label={"Scintigraphy"}/>

        <h1 className={"j-preview-title"}>Endoscopic Procedures</h1>
        <MultipleInvestigationPreview investigations={upperDigestiveEndoscopy} label={"Upper Digestive Endoscopy"}/>
        <MultipleInvestigationPreview investigations={colonoscopy} label={"Colonoscopy"}/>
        <MultipleInvestigationPreview investigations={bronchoscopy} label={"Bronchoscopy"}/>

        <h1 className={"j-preview-title"}>Functional Tests</h1>
        <MultipleInvestigationPreview investigations={electrocardiogram} label={"Electrocardiogram (ECG)"}/>
        <MultipleInvestigationPreview investigations={echocardiography} label={"Echocardiography"}/>
        <MultipleInvestigationPreview investigations={spirometry} label={"Spirometry"}/>
        <MultipleInvestigationPreview investigations={stressTest} label={"Stress Test (Ergometry)"}/>

        <h1 className={"j-preview-title"}>Advanced Genetic and Molecular Biology</h1>
        <MultipleInvestigationPreview investigations={geneticTests} label={"Genetic Tests"}/>
        <MultipleInvestigationPreview investigations={pcrTests} label={"PCR Tests"}/>
        <MultipleInvestigationPreview investigations={boneDensitometry} label={"Bone Densiometry (DEXA)"}/>
    </div>
}