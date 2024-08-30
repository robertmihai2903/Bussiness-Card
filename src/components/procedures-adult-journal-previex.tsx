import React, {useContext} from "react";
import {AdultJournalStateContext} from "./adult-journal-settings";
import {InvestigationPreview, LargeInfoPreview, SmallInfoPreview} from "./home-baby-journal-preview";

export function ProceduresAdultJournalPreview() {
    const {adultJournalState} = useContext(AdultJournalStateContext)
    const {
        interdisciplinaryConsultations,
        recommendations,
        primaryDiagnosis,
        secondaryDiagnosis,
        surgicalInterventions,
        lifestyleRecommendations,
        appointments,
        monitoringProgress,
        medicationTreatment
    } = adultJournalState
    return <div className={"j-segment-container"}>
        <h1 className={"j-preview-title"}>Consultations with Specialist Doctors</h1>
        <LargeInfoPreview label={"interdisciplinary consultations"} info={interdisciplinaryConsultations}/>
        <LargeInfoPreview label={"conclusions and recommendations"} info={recommendations}/>

        <h1 className={"j-preview-title"}>Diagnosis</h1>
        <LargeInfoPreview label={"primary diagnosis"} info={primaryDiagnosis}/>
        <LargeInfoPreview label={"secondary diagnosis"} info={secondaryDiagnosis}/>

        <h1 className={"j-preview-title"}>Treatment Plan</h1>
        <InvestigationPreview investigation={medicationTreatment} label={"Medication Treatment"}/>
        <LargeInfoPreview label={"Surgical Interventions"} info={surgicalInterventions}/>
        <LargeInfoPreview label={"Lifestyle Recommendations"} info={lifestyleRecommendations}/>

        <h3 className={"j-preview-title"}>Follow-up and Monitoring</h3>
        <SmallInfoPreview label={"Appointment"} info={appointments}/>
        <LargeInfoPreview label={"Monitoring Progress"} info={monitoringProgress}/>
    </div>
}