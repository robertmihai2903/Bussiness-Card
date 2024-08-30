import React, {useContext} from "react";
import {TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";
import "./journal-segment.css"
import {DatePickerConverted} from "./date-picker-converted";
import {TimePickerConverted} from "./time-picker-converted";
import AssetUpload3 from "./asset-upload-3";
import {ProfileUpload} from "./profile-upload";
import {AdultJournalEditContext} from "./adult-journal-settings";
import {DB_COLLECTIONS, DB_STORAGE} from "./baby-journal-settings";

export function HealthAdultJournalSegment() {
    const {
        previousConditions,
        medication,
        allergies,
        familyHistory,
        bloodPressure,
        pulse,
        temperature,
        respiratoryRate,
        generalPhysicalExamination
    } = useContext(AdultJournalEditContext)! //TODO
    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>Medical History</h1>
        <TextField label={'Previous Conditions'} placeholder={"Previous Conditions"} value={previousConditions.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(previousConditions)} variant={"outlined"} size={"small"} multiline
                   minRows={3}
                   maxRows={7}
        />
        <TextField label={'Medication'} placeholder={"Medication"} value={medication.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(medication)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />
        <TextField label={'Allergies'} placeholder={"Allergies"} value={allergies.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(allergies)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />
        <TextField label={'Family History'} placeholder={"Family History"} value={familyHistory.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(familyHistory)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />
        <h1 className={"j-segment-title"}>Clinical Examination</h1>
        <TextField label={'General Physical Examination'} placeholder={"General Physical Examination"}
                   value={generalPhysicalExamination.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(generalPhysicalExamination)} variant={"outlined"} size={"small"} multiline
                   minRows={3}
                   maxRows={7}
        />
        <h3 className={"j-segment-subtitle"}>Vital Signs</h3>
        <TextField label={'Blood Pressure'} placeholder={"Blood Presure"} value={bloodPressure.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(bloodPressure)} variant={"outlined"} size={"small"}
        />
        <TextField label={'Pulse'} placeholder={"Pulse"} value={pulse.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(pulse)} variant={"outlined"} size={"small"}
        />
        <TextField label={'Temperature'} placeholder={"Temperature"} value={temperature.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(temperature)} variant={"outlined"} size={"small"}
        />
        <TextField label={'Respiratory Rate'} placeholder={"Respiratory Rate"} value={respiratoryRate.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(respiratoryRate)} variant={"outlined"} size={"small"}
        />
    </div>
}