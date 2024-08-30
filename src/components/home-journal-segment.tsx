import React, {useContext} from "react";
import {TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";
import {BabyJournalEditContext, DB_STORAGE} from "./baby-journal-settings";
import "./journal-segment.css"
import {DatePickerConverted} from "./date-picker-converted";
import {TimePickerConverted} from "./time-picker-converted";
import AssetUpload3 from "./asset-upload-3";
import {ProfileUpload} from "./profile-upload";
import MediaViewer, {FileProps} from "./media-viewer";

export function HomeJournalSegment() {
    const {
        name,
        gender,
        birthDate,
        timeOfBirth,
        heightOnBirth,
        placeOfBirth,
        weightOnBirth,
        apgar,
        biography,
        firstRun,
        firstRoll,
        firstHeadHold,
        firstSit,
        firstSteps,
        firstBreastfeeding,
        firstSolidFeeding,
        firstFormula,
        foodPreferences,
        foodAversions,
        introductionOfCereal,
        daySleeping,
        nightSleepingProgress,
        nightSleeping, waysOfSleeping, profilePicture
    } = useContext(BabyJournalEditContext)! //TODO
    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>Personal Data</h1>
        <ProfileUpload value={profilePicture.value} onChange={profilePicture.onChange}
                       storageFolder={DB_STORAGE.BABY_JOURNAL}/>
        <TextField label={'Full name'} value={name.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(name)} variant={"outlined"} size={"small"}
        />
        <TextField label={'Gender'} placeholder={"Gender"} value={gender.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(gender)} variant={"outlined"} size={"small"}
        />
        <DatePickerConverted label={"Birth Date"} value={birthDate.value} onChange={birthDate.onChange}
                             className={"j-segment-date-picker"}/>

        <TimePickerConverted label={"Time of birth"} value={timeOfBirth.value} onChange={timeOfBirth.onChange}
                             className={"j-segment-time-picker"}/>
        <TextField label={'APGAR'} placeholder={"APGAR"} value={apgar.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(apgar)} variant={"outlined"} size={"small"}
        />
        <TextField label={'Weight on birth'} placeholder={"Weight on birth"} value={weightOnBirth.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(weightOnBirth)} variant={"outlined"} size={"small"}
        />
        <TextField label={'Height on birth'} placeholder={"Height on birth"} value={heightOnBirth.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(heightOnBirth)} variant={"outlined"} size={"small"}
        />
        <TextField label={'Place of birth'} placeholder={"Place of birth"} value={placeOfBirth.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(placeOfBirth)} variant={"outlined"} size={"small"}
        />
        <h1 className={"j-segment-title"}>Child Biography</h1>
        <TextField label={'Biography'} placeholder={"Biography"} value={biography.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(biography)} variant={"outlined"} size={"small"} multiline minRows={4}
                   maxRows={7}
        />
        <h1 className={"j-segment-title"}>Physical Development</h1>
        <DatePickerConverted label={"First Head Hold"} value={firstHeadHold.value} onChange={firstHeadHold.onChange}
                             className={"j-segment-date-picker"}/>
        <DatePickerConverted label={"First Roll"} value={firstRoll.value} onChange={firstRoll.onChange}
                             className={"j-segment-date-picker"}/>
        <DatePickerConverted label={"First Sit"} value={firstSit.value} onChange={firstSit.onChange}
                             className={"j-segment-date-picker"}/>
        <DatePickerConverted label={"First Steps"} value={firstSteps.value} onChange={firstSteps.onChange}
                             className={"j-segment-date-picker"}/>
        <DatePickerConverted label={"First Run"} value={firstRun.value} onChange={firstRun.onChange}
                             className={"j-segment-date-picker"}/>
        <h1 className={"j-segment-title"}>Food Preferences</h1>
        <DatePickerConverted label={"First Breastfeeding"} value={firstBreastfeeding.value}
                             onChange={firstBreastfeeding.onChange}
                             className={"j-segment-date-picker"}/>
        <DatePickerConverted label={"First Formula"} value={firstFormula.value} onChange={firstFormula.onChange}
                             className={"j-segment-date-picker"}/>
        <DatePickerConverted label={"Introduction of Cereal"} value={introductionOfCereal.value}
                             onChange={introductionOfCereal.onChange}
                             className={"j-segment-date-picker"}/>
        <DatePickerConverted label={"First Solid Feeding"} value={firstSolidFeeding.value}
                             onChange={firstSolidFeeding.onChange}
                             className={"j-segment-date-picker"}/>
        <TextField label={'Food Preferences'} placeholder={"Food preferences"} value={foodPreferences.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(foodPreferences)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />
        <TextField label={'Food Aversions'} placeholder={"Food aversions"} value={foodAversions.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(foodAversions)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />
        <h1 className={"j-segment-title"}>Sleep Schedule</h1>
        <TextField label={'Day Sleeping'} placeholder={"Day sleeping"} value={daySleeping.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(daySleeping)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />
        <TextField label={'Night Sleeping'} placeholder={"Night Sleeping"} value={nightSleeping.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(nightSleeping)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />
        <TextField label={'Ways of Sleeping'} placeholder={"Ways of sleeping"} value={waysOfSleeping.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(waysOfSleeping)} variant={"outlined"} size={"small"} multiline minRows={3}
                   maxRows={7}
        />
        <TextField label={'Night Sleeping Progress'} placeholder={"Night sleeping progress"}
                   value={nightSleepingProgress.value}
                   className={"j-segment-textfield"}
                   onChange={onChangeWrapper(nightSleepingProgress)} variant={"outlined"} size={"small"} multiline
                   minRows={3}
                   maxRows={7}
        />
    </div>
}