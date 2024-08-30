import React, {useContext} from "react";
import {AdultJournalStateContext} from "./adult-journal-settings";
import {InvestigationPreview, LargeInfoPreview, SmallInfoPreview} from "./home-baby-journal-preview";

export function InvestigationsAdultJournalPreview() {
    const {adultJournalState} = useContext(AdultJournalStateContext)
    const {
laboratoryTests, bloodTests, biochemistry, inflammatoryMarkers, tumorMarkers, hormonalProfiles, urineTests, stoolTests, coagulationTests, INR,
    xRay, ultrasound, computedTomography, magneticResonanceImaging, scintigraphy,upperDigestiveEndoscopy, colonoscopy, bronchoscopy,
    electrocardiogram, echocardiography, spirometry, stressTest, geneticTests, pcrTests, boneDensitometry} = adultJournalState
    return <div className={"j-segment-container"}>
        <h1 className={"j-preview-title"}>Paraclinical Investigations</h1>
        <InvestigationPreview investigation={laboratoryTests} label={"Laboratory Tests"}/>
        <InvestigationPreview investigation={bloodTests} label={"Blood Tests"}/>
        <InvestigationPreview investigation={biochemistry} label={"Biochemistry"}/>
        <InvestigationPreview investigation={inflammatoryMarkers} label={"Inflammatory Markers"}/>
        <InvestigationPreview investigation={tumorMarkers} label={"Tumor Markers"}/>
        <InvestigationPreview investigation={hormonalProfiles} label={"Hormonal Profiles"}/>
        <InvestigationPreview investigation={urineTests} label={"Urine Tests"}/>
        <InvestigationPreview investigation={stoolTests} label={"Stool Tests"}/>
        <InvestigationPreview investigation={coagulationTests} label={"Coagulation Tests"}/>
        <InvestigationPreview investigation={INR} label={"INR"}/>

        <h1 className={"j-preview-title"}>High-Performance Investigations</h1>
        <InvestigationPreview investigation={xRay} label={"X-Ray"}/>
        <InvestigationPreview investigation={ultrasound} label={"Ultrasound"}/>
        <InvestigationPreview investigation={computedTomography} label={"Computed Tomography (CT)"}/>
        <InvestigationPreview investigation={magneticResonanceImaging} label={"Magnetic Resonance Imaging (MRI)"}/>
        <InvestigationPreview investigation={scintigraphy} label={"Scintigraphy"}/>

        <h1 className={"j-preview-title"}>Endoscopic Procedures</h1>
        <InvestigationPreview investigation={upperDigestiveEndoscopy} label={"Upper Digestive Endoscopy"}/>
        <InvestigationPreview investigation={colonoscopy} label={"Colonoscopy"}/>
        <InvestigationPreview investigation={bronchoscopy} label={"Bronchoscopy"}/>

        <h1 className={"j-preview-title"}>Functional Tests</h1>
        <InvestigationPreview investigation={electrocardiogram} label={"Electrocardiogram (ECG)"}/>
        <InvestigationPreview investigation={echocardiography} label={"Echocardiography"}/>
        <InvestigationPreview investigation={spirometry} label={"Spirometry"}/>
        <InvestigationPreview investigation={stressTest} label={"Stress Test (Ergometry)"}/>

        <h1 className={"j-preview-title"}>Advanced Genetic and Molecular Biology</h1>
        <InvestigationPreview investigation={geneticTests} label={"Genetic Tests"}/>
        <InvestigationPreview investigation={pcrTests} label={"PCR Tests"}/>
        <InvestigationPreview investigation={boneDensitometry} label={"Bone Densiometry (DEXA)"}/>
    </div>
}