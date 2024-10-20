import React, {useContext, useEffect, useMemo, useState} from "react";
import {Asset, BabyJournalStateContext} from "./baby-journal-settings";
import "./home-baby-journal-preview.css"
import {
    Investigation,
    MultipleInvestigations,
    MultipleVitalSigns,
    MultipleVitalSignsHandler
} from "./adult-journal-settings";
import {MediaPreview} from "./media-preview";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import classNames from "classnames";

interface SmallInfoPreviewProps {
    label: string,
    info: string,
    className?: string
}

export function SmallInfoPreview({label, info, className}: SmallInfoPreviewProps) {
    return <div className={classNames("small-info-wrapper", className)}>
        <h4 className={"small-info-label"}>{label.toUpperCase()}</h4>
        <h4 className={"small-info-info"}>{info || "-"}</h4>
    </div>
}

interface LargeInfoPreviewProps {
    label?: string,
    info: string
}

export function LargeInfoPreview({label, info}: LargeInfoPreviewProps) {
    return <div className={"large-info-wrapper"}>
        {label && <h4 className={"large-info-label"}>{label.toUpperCase()}</h4>}
        <p className={"large-info-info"}>{info || "-"}</p>
    </div>
}

export function ProfilePicturePreview({asset}: { asset: Asset }) {
    if (!asset) return null
    return <img className={"profile-preview-image"} src={asset.url} alt={asset.name}/>
}

export function InvestigationPreview({investigation, label, classname}: {
    investigation: Investigation,
    label?: string,
    classname?: string
}) {
    return <div className={classname} style={{width: "100%", marginTop: "20px"}}>
        {label && <h4 style={{margin: 0}}>{label}</h4>}
        <LargeInfoPreview info={investigation.description}/>
        <MediaPreview value={investigation.assets}/>
    </div>
}

export function MultipleInvestigationPreview({investigations, label}: {
    investigations: MultipleInvestigations,
    label: string
}) {
    const filledDays = useMemo(() => Object.keys(investigations), [investigations])
    const [selectedDay, setSelectedDay] = useState("")

    useEffect(() => {
        console.log("insideEffect", selectedDay, filledDays[0])
        // if (!filledDays.includes(selectedDay)) {
        setSelectedDay(filledDays[0] || "")
        // }
    }, [filledDays]);


    const onSelectChange = (event: SelectChangeEvent) => {
        setSelectedDay(event.target.value);
    };

    return <div style={{width: "100%"}}>
        <div className={"multiple-investigation-header"}>
            <h4 className={"preview-multiple-investigation-title"}>{label}</h4>
            {filledDays.length > 0 ? <Select size={"small"} className={"preview-select"} value={selectedDay}
                                             onChange={onSelectChange} variant={"standard"}>
                <MenuItem style={{display: "none"}} value={""}>None</MenuItem>
                {filledDays.map((day: string) => (<MenuItem value={day}>{day}</MenuItem>))}
            </Select> : <div style={{alignSelf: "center"}}>NONE</div>}
        </div>
        {filledDays.length > 0 && <>
            <div className={"multiple-investigation-content"}>
                {
                    filledDays.map((day: string) => (
                        <InvestigationPreview key={`investigation-preview-${label}-${day}`}
                                              classname={day !== selectedDay ? "disappear" : ""}
                                              investigation={investigations[day]}
                        />))
                }
            </div>

        </>}
    </div>
}

export function MultipleVitalSignsPreview({signs}: {
    signs: MultipleVitalSigns
}) {
    const filledDays = useMemo(() => Object.keys(signs), [signs])
    const [selectedDay, setSelectedDay] = useState("")

    useEffect(() => {
        console.log("insideEffect", selectedDay, filledDays[0])
        // if (!filledDays.includes(selectedDay)) {
        setSelectedDay(filledDays[0] || "")
        // }
    }, [filledDays]);


    const onSelectChange = (event: SelectChangeEvent) => {
        setSelectedDay(event.target.value);
    };

    return <div style={{width: "100%"}}>
        <div className={"multiple-investigation-header"}>
            {filledDays.length > 0 ? <Select size={"small"} className={"preview-select"} value={selectedDay}
                                             onChange={onSelectChange} variant={"standard"}>
                <MenuItem style={{display: "none"}} value={""}>None</MenuItem>
                {filledDays.map((day: string) => (<MenuItem value={day}>{day}</MenuItem>))}
            </Select> : <div style={{alignSelf: "center"}}>NONE</div>}
        </div>
        {filledDays.length > 0 && <>
            <div className={"multiple-investigation-content"}>
                {
                    filledDays.map((day: string) => (
                        <>
                            <SmallInfoPreview label={"blood pressure"} info={signs[day].bloodPressure}
                                              className={day !== selectedDay ? "disappear" : ""}/>
                            <SmallInfoPreview label={"pulse"} info={signs[day].pulse}
                                              className={day !== selectedDay ? "disappear" : ""}/>
                            <SmallInfoPreview label={"temperature"} info={signs[day].temperature}
                                              className={day !== selectedDay ? "disappear" : ""}/>
                            <SmallInfoPreview label={"respiratory rate"} info={signs[day].respiratoryRate}
                                              className={day !== selectedDay ? "disappear" : ""}/>
                        </>
                    ))
                }
            </div>

        </>}
    </div>
}

export function HomeBabyJournalPreview() {
    const {babyJournalState} = useContext(BabyJournalStateContext)
    const {
        birthDate,
        name,
        gender,
        timeOfBirth,
        apgar,
        weightOnBirth,
        heightOnBirth,
        placeOfBirth,
        biography,
        firstBreastfeeding,
        firstFormula,
        introductionOfCereal,
        firstSolidFeeding,
        foodPreferences,
        foodAversions,
        firstHeadHold,
        firstRoll,
        firstSit,
        firstSteps,
        firstRun,
        daySleeping,
        nightSleepingProgress,
        nightSleeping,
        waysOfSleeping,
        profilePicture,
        bloodType
    } = babyJournalState
    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>{name}</h1>
        <ProfilePicturePreview asset={profilePicture[0]}/>
        <h2 className={"j-preview-title"}>Birth Information</h2>
        <SmallInfoPreview label={"gender"} info={gender}/>
        <SmallInfoPreview label={"date of birth"} info={birthDate}/>
        <SmallInfoPreview label={"time of birth"} info={timeOfBirth}/>
        <SmallInfoPreview label={"APGAR"} info={apgar}/>
        <SmallInfoPreview label={"Blood type"} info={bloodType}/>
        <SmallInfoPreview label={"weight at birth"} info={weightOnBirth}/>
        <SmallInfoPreview label={"height at  birth"} info={heightOnBirth}/>
        <SmallInfoPreview label={"place of birth"} info={placeOfBirth}/>
        <LargeInfoPreview label={"biography"} info={biography}/>

        <h2 className={"j-preview-title"}>Physical Development</h2>
        <SmallInfoPreview label={"first head hold"} info={firstHeadHold}/>
        <SmallInfoPreview label={"first roll"} info={firstRoll}/>
        <SmallInfoPreview label={"first sit"} info={firstSit}/>
        <SmallInfoPreview label={"first steps"} info={firstSteps}/>
        <SmallInfoPreview label={"first run"} info={firstRun}/>

        <h2 className={"j-preview-title"}>Food Preferences</h2>
        <SmallInfoPreview label={"first breastfeeding"} info={firstBreastfeeding}/>
        <SmallInfoPreview label={"first formula"} info={firstFormula}/>
        <SmallInfoPreview label={"introduction of cereal"} info={introductionOfCereal}/>
        <SmallInfoPreview label={"first solid feeding"} info={firstSolidFeeding}/>
        <LargeInfoPreview label={"food preferences"} info={foodPreferences}/>
        <LargeInfoPreview label={"food aversions"} info={foodAversions}/>

        <h2 className={"j-preview-title"}>Sleep Schedule</h2>
        <LargeInfoPreview label={"day sleeping"} info={daySleeping}/>
        <LargeInfoPreview label={"night sleeping"} info={nightSleeping}/>
        <LargeInfoPreview label={"ways of sleeping"} info={waysOfSleeping}/>
        <LargeInfoPreview label={"night sleeping progress"} info={nightSleepingProgress}/>
    </div>
}