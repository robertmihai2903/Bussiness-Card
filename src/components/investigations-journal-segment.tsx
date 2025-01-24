import React, {useContext} from "react";
import {TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";
import {BabyJournalEditContext} from "./baby-journal-settings";
import "./journal-segment.css"
import {DatePickerConverted} from "./date-picker-converted";
import {TimePickerConverted} from "./time-picker-converted";
import AssetUpload3 from "./asset-upload-3";

// export function InvestigationsJournalSegment() {
//     const {
//         investigations
//     } = useContext(BabyJournalEditContext)! //TODO
//     return <div className={"j-segment-container"}>
//         {investigations.map((investigation: any) => {
//             return <Investigation handler={investigation}/>
//         })}
//     </div>
// }

interface InvestigationProps {
    handler: any
}
//
// function Investigation({handler}: InvestigationProps) {
//     const {name, details} = handler
//     return <div>
//         <TextField label={'Investigation name'} value={name.value} className={"j-segment-textfield"}
//                    onChange={onChangeWrapper(name)} variant={"outlined"} size={"small"}
//         />
//         <TextField label={'Details'} value={details.value} className={"j-segment-textfield"}
//                    onChange={onChangeWrapper(details)} variant={"outlined"} size={"small"}
//         />
//     </div>
// }