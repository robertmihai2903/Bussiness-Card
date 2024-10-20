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
import {InvestigationInput} from "./investigation-adult-journal-segment";
import {MultipleConsultInput, MultipleFollowUpInput, MultipleInvestigationsInput} from "./home-adult-journal-segment";

export function ProceduresAdultJournalSegment() {
    const {
        // interdisciplinaryConsultations,
        // recommendations,
        // primaryDiagnosis,
        // secondaryDiagnosis,
        diagnoses,
        medicationTreatment,
        surgicalInterventions,
        lifestyleRecommendations,
        // appointments,
        // monitoringProgress,
        followUp,
        consultations
    } = useContext(AdultJournalEditContext)! //TODO
    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>Consultations with Specialist Doctors</h1>
        <MultipleConsultInput handler={consultations}/>

        <h1 className={"j-segment-title"}>Diagnoses & Treatment Plans</h1>
        <MultipleInvestigationsInput label={"Diagnoses"} handler={diagnoses}/>
        <MultipleInvestigationsInput label={"Medical treatment"} handler={medicationTreatment}/>
        <MultipleInvestigationsInput label={"Surgical Interventions"} handler={surgicalInterventions}/>
        <MultipleInvestigationsInput label={"Lifestyle Recommendations"} handler={lifestyleRecommendations}/>


        <h1 className={"j-segment-title"}>Follow-up and Monitoring</h1>
        <MultipleFollowUpInput handler={followUp}/>

    </div>
}