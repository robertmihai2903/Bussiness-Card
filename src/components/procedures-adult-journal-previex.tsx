import React, {useContext} from "react";
import {AdultJournalStateContext} from "./adult-journal-settings";
import {
    InvestigationPreview,
    LargeInfoPreview,
    MultipleConsultationPreview, MultipleFollowUpPreview, MultipleInvestigationPreview, MultipleVitalSignsPreview,
    SmallInfoPreview
} from "./home-baby-journal-preview";

export function ProceduresAdultJournalPreview() {
    const {adultJournalState} = useContext(AdultJournalStateContext)
    const {
        // interdisciplinaryConsultations,
        // recommendations,
        // primaryDiagnosis,
        // secondaryDiagnosis,
        surgicalInterventions,
        lifestyleRecommendations,
        // appointments,
        // monitoringProgress,
        medicationTreatment,
        consultations,
        diagnoses,
        followUp
    } = adultJournalState
    return <div className={"j-segment-container"}>
        <h1 className={"j-preview-title"}>Consultations with Specialist Doctors</h1>
        {/*<LargeInfoPreview label={"interdisciplinary consultations"} info={interdisciplinaryConsultations}/>*/}
        {/*<LargeInfoPreview label={"conclusions and recommendations"} info={recommendations}/>*/}
        <MultipleConsultationPreview consultations={consultations}/>

        <h1 className={"j-preview-title"}></h1>

        <h1 className={"j-preview-title"}>Diagnoses & Treatment Plans</h1>
        <MultipleInvestigationPreview investigations={diagnoses} label={"Diagnoses"}/>
        <MultipleInvestigationPreview investigations={medicationTreatment} label={"Medication Treatments"}/>
        <MultipleInvestigationPreview investigations={surgicalInterventions} label={"Surgical Interventions"}/>
        <MultipleInvestigationPreview investigations={lifestyleRecommendations} label={"Lifestyle Recommendations"}/>


        <h3 className={"j-preview-title"}>Follow-up and Monitoring</h3>
        <MultipleFollowUpPreview followUp={followUp}/>
    </div>
}