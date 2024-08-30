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

export function ProceduresAdultJournalSegment() {
    const {
        interdisciplinaryConsultations,
        recommendations,
        primaryDiagnosis,
        secondaryDiagnosis,
        medicationTreatment,
        surgicalInterventions,
        lifestyleRecommendations,
        appointments,
        monitoringProgress
    } = useContext(AdultJournalEditContext)! //TODO
    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>Consultations with Specialist Doctors</h1>
        <TextField label={'Interdisciplinary Consultations'}
                   placeholder={"Cardiology, neurology, gastroenterology, orthopedics, etc."}
                   value={interdisciplinaryConsultations.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(interdisciplinaryConsultations)} variant={"outlined"} size={"small"}
                   multiline minRows={3}
                   maxRows={7}
        />
        <TextField label={'Conclusions and Recommendations'}
                   placeholder={"Observations and treatment plan suggested by each consulted specialist"}
                   value={recommendations.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(recommendations)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />

        <h1 className={"j-segment-title"}>Diagnosis</h1>
        <TextField label={'Primary Diagnosis'}
                   placeholder={"The disease or condition identified as the cause of the symptoms."}
                   value={primaryDiagnosis.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(primaryDiagnosis)} variant={"outlined"} size={"small"} multiline
                   minRows={3}
                   maxRows={7}
        />
        <TextField label={'Secondary Diagnosis'}
                   placeholder={"Other conditions or illnesses revealed during investigations."}
                   value={secondaryDiagnosis.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(secondaryDiagnosis)} variant={"outlined"} size={"small"} multiline
                   minRows={3}
                   maxRows={7}
        />

        <h1 className={"j-segment-title"}>Treatment Plan</h1>
        <InvestigationInput label={"Medication Treatment"} handler={medicationTreatment} descriptionPlaceholder={"Prescribed medication, dosage, and duration of treatment"}/>
        <TextField label={'Surgical Interventions'} placeholder={" Necessary procedures and scheduling."}
                   value={surgicalInterventions.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(surgicalInterventions)} variant={"outlined"} size={"small"} multiline
                   minRows={3}
                   maxRows={7}
        />
        <TextField label={'Lifestyle Recommendations'}
                   placeholder={"Dietary changes, physical exercise, stress management"}
                   value={lifestyleRecommendations.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(lifestyleRecommendations)} variant={"outlined"} size={"small"} multiline
                   minRows={3}
                   maxRows={7}
        />

        <h1 className={"j-segment-title"}>Follow-up and Monitoring</h1>
        <DatePickerConverted label={"Appointments for Re-evaluation"} value={appointments.value}
                             onChange={appointments.onChange}
                             className={"j-segment-date-picker"}/>
        <TextField label={'Monitoring Progress'}
                   placeholder={"Recording the response to treatment and any necessary adjustments."}
                   value={monitoringProgress.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(monitoringProgress)} variant={"outlined"} size={"small"} multiline
                   minRows={3}
                   maxRows={7}
        />

    </div>
}