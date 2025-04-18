import React, {useContext, useEffect, useMemo, useState} from "react";
import {Button, MenuItem, Popover, Select, SelectChangeEvent, TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";
import "./journal-segment.css"
import {DatePickerConverted} from "./date-picker-converted";
import {TimePickerConverted} from "./time-picker-converted";
import AssetUpload3 from "./asset-upload-3";
import {ProfileUpload} from "./profile-upload";
import {
    AdultJournalEditContext, ConsultationHandler, FollowUp, FollowUpHandler, MultipleHandler,
    MultipleInvestigationsHandler, MultipleSleepScheduleHandler,
    MultipleVitalSignsHandler
} from "./adult-journal-settings";
import {DB_COLLECTIONS, DB_STORAGE} from "./baby-journal-settings";
import dayjs, {Dayjs} from "dayjs";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import SelectInput from "@mui/material/Select/SelectInput";
import {InvestigationInput} from "./investigation-adult-journal-segment";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";

export function HomeAdultJournalSegment() {
    const {
        profilePicture,
        name,
        birthDate,
        personalIdNumber,
        medicalRecordNumber,
        gender,
        address,
        phone,
        bloodType,
        testMultiple
    } = useContext(AdultJournalEditContext)! //TODO

    useEffect(() => {
        console.log("MULTIPLE", testMultiple)
    }, [testMultiple]);



    return <div className={"j-segment-container"}>
        <h1 className={"j-segment-title"}>Personal Data</h1>
        <ProfileUpload value={profilePicture.value} onChange={profilePicture.onChange}
                       storageFolder={DB_STORAGE.ADULT_JOURNAL}/>
        <TextField label={'Full name'} value={name.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(name)} variant={"outlined"} size={"small"}/>
        <DatePickerConverted label={"Birth Date"} value={birthDate.value} onChange={birthDate.onChange}
                             className={"j-segment-date-picker"}/>
        <TextField label={'Gender'} value={gender.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(gender)} variant={"outlined"} size={"small"}/>
        <TextField label={'Personal Identification Number'} value={personalIdNumber.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(personalIdNumber)} variant={"outlined"} size={"small"}/>
        <TextField label={'Address'} value={address.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(address)} variant={"outlined"} size={"small"}/>
        <TextField label={'Phone number'} value={phone.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(phone)} variant={"outlined"} size={"small"}/>
        <TextField label={'Medical Record Number'} value={medicalRecordNumber.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(medicalRecordNumber)} variant={"outlined"} size={"small"}/>

        <TextField label={'Blood Type'} value={bloodType.value} className={"j-segment-textfield"}
                   onChange={onChangeWrapper(bloodType)} variant={"outlined"} size={"small"}/>


        {/*<MultipleInvestigations label={"Test Multiple Investigation"} handler={testMultiple}/>*/}
    </div>
}


function AddDateKeyEntryButtonInvestigation({onAdd, selectedDays, setSelectedDay}: any) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const defaultDate = dayjs()
    const [date, setDate] = useState<Dayjs | null>(defaultDate)
    const [open, setOpen] = useState(false)

    const onOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }

    const onHandleClose = () => {
        setAnchorEl(null)
        setOpen(false)
        setDate(defaultDate)
    }
    const id = open ? 'simple-popover' : undefined;
    const onDateChange = (value: Dayjs | null) => {
        setDate(value)
    }

    const onAddEntry = () => {
        const convertedDate = date?.format('DD/MM/YYYY')
        onAdd(convertedDate)
        onHandleClose()
        setSelectedDay(convertedDate)
    }

    console.log("HERE NOWW")
    return <div>
        <Button style={{color: "#4f4f4f"}} onClick={onOpen}>Add</Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onHandleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <div className={"add-date-key-popover-box"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        defaultValue={dayjs()}
                        value={date}
                        onChange={onDateChange}
                        shouldDisableDate={(day: Dayjs) => {
                            const convertedDay = day.format('DD/MM/YYYY')
                            return selectedDays.includes(convertedDay)
                        }}/>
                </LocalizationProvider>
                <Button style={{color: "#4f4f4f", margin: "4px"}} onClick={onAddEntry}>Add Entry</Button>
            </div>
        </Popover>
    </div>
}

function AddDateKeyEntryButton({onAdd, selectedDays, setSelectedDay}: any) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const defaultDate = dayjs()
    const [date, setDate] = useState<Dayjs | null>(defaultDate)
    const [open, setOpen] = useState(false)

    const onOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }

    const onHandleClose = () => {
        setAnchorEl(null)
        setOpen(false)
        setDate(defaultDate)
    }
    const id = open ? 'simple-popover' : undefined;
    const onDateChange = (value: Dayjs | null) => {
        setDate(value)
    }

    const onAddEntry = () => {
        const convertedDate = date?.format('DD/MM/YYYY')
        onAdd(convertedDate)
        onHandleClose()
        setSelectedDay(convertedDate)
    }

    console.log("HERE NOWW")
    return <div className={'multiple-add-container'}>
        <div className={"single-add-button"} onClick={onOpen}>Add</div>
        {/*{selectedDays.length !== 0 && <div className={"multiple-add-button"} onClick={onOpen}>Add </div>}*/}
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onHandleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <div className={"add-date-key-popover-box"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar

                        defaultValue={dayjs()}
                        value={date}
                        onChange={onDateChange}
                        shouldDisableDate={(day: Dayjs) => {
                            const convertedDay = day.format('DD/MM/YYYY')
                            return selectedDays.includes(convertedDay)
                        }}/>
                </LocalizationProvider>
                <Button style={{color: "#4f4f4f", margin: "4px"}} onClick={onAddEntry}>Add Entry</Button>
            </div>
        </Popover>
    </div>
}


export function MultipleInvestigationsInput({label, handler}: { label: string, handler: MultipleInvestigationsHandler }) {
    const filledDays = useMemo(() => Object.keys(handler.investigations), [handler.investigations])
    console.log("FILLED", filledDays)
    const [selectedDay, setSelectedDay] = useState("")
    useEffect(() => {
        console.log("insideEffect", selectedDay, filledDays[0])
        // if (!filledDays.includes(selectedDay)) {
        setSelectedDay(filledDays[filledDays.length - 1] || "")
        // }
    }, [filledDays]);

    const onSelectChange = (event: SelectChangeEvent) => {
        setSelectedDay(event.target.value);
    };

    const onEntryDelete = (key: string) => {
        return () => {
            if (selectedDay === key) {
                const firstRemainingDay = filledDays?.length ? filledDays[0] : ""
                setSelectedDay(firstRemainingDay)
            }
            handler.onDelete(key)
        }
    }
    console.log("Filled days", filledDays)
    console.log("Selected Value", selectedDay)
    return <div className={"multiple-investigations-wrapper"}>
        <div className={"multiple-investigation-header"}>
            {label && <h4 className={"j-segment-investigation-input-label"}>{label}</h4>}
            <AddDateKeyEntryButtonInvestigation onAdd={handler.onAdd} selectedDays={filledDays}
                                                setSelectedDay={setSelectedDay}/>
        </div>
        {filledDays.length > 0 && <>
            <Select size={"small"} className={"multiple-investigations-select"} value={selectedDay}
                    onChange={onSelectChange}>
                <MenuItem style={{display: "none"}} value={""}>None</MenuItem>
                {filledDays.map((day: string) => (<MenuItem value={day}>{day}</MenuItem>))}
            </Select>
            <div className={"multiple-investigation-content"}>
                {
                    filledDays.map((day: string) => (
                        <InvestigationInput key={`investigation-${day}`}
                                            classname={day !== selectedDay ? "disappear" : ""}
                                            handler={handler.investigations[day]}
                                            onDelete={onEntryDelete(day)}
                        />))
                }
            </div>

        </>}
    </div>
}

export function MultipleVitalSignsInput({handler}: { handler: MultipleVitalSignsHandler }) {
    const filledDays = useMemo(() => Object.keys(handler.signs), [handler.signs])
    const [selectedDay, setSelectedDay] = useState("")
    useEffect(() => {
        console.log("insideEffect", selectedDay, filledDays[0])
        // if (!filledDays.includes(selectedDay)) {
        setSelectedDay(filledDays[filledDays.length - 1] || "")
        // }
    }, [filledDays]);

    const onSelectChange = (event: SelectChangeEvent) => {
        setSelectedDay(event.target.value);
    };

    const onEntryDelete = (key: string) => {
        return () => {
            if (selectedDay === key) {
                const firstRemainingDay = filledDays.length ? filledDays[0] : ""
                setSelectedDay(firstRemainingDay)
            }
            handler.onDelete(key)
        }
    }
    console.log("Filled days", filledDays)
    console.log("Selected Value", selectedDay)
    return <div className={"multiple-investigations-wrapper"}>
        <div className={"multiple-choice-header"}>
            <AddDateKeyEntryButton onAdd={handler.onAdd} selectedDays={filledDays} setSelectedDay={setSelectedDay}/>
        </div>
        {filledDays.length > 0 && <>
            <Select size={"small"} className={"multiple-investigations-select"} value={selectedDay}
                    onChange={onSelectChange}>
                <MenuItem style={{display: "none"}} value={""}>None</MenuItem>
                {filledDays.map((day: string) => (<MenuItem value={day}>{day}</MenuItem>))}
            </Select>
            <div className={"multiple-investigation-content"}>
                {
                    filledDays.map((day: string) => {
                        console.log("day", day)

                        return <>
                            <IconButton className={day !== selectedDay ? "disappear" : ""} onClick={onEntryDelete(day)}
                                        style={{alignSelf: "end"}} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                            <TextField label={'Blood Pressure'} placeholder={"Blood Presure"}
                                       value={handler.signs[day].bloodPressure.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.signs[day].bloodPressure)} variant={"outlined"}
                                       size={"small"}
                            />
                            <TextField label={'Pulse'} placeholder={"Pulse"} value={handler.signs[day].pulse.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.signs[day].pulse)} variant={"outlined"}
                                       size={"small"}
                            />
                            <TextField label={'Temperature'} placeholder={"Temperature"}
                                       value={handler.signs[day].temperature.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.signs[day].temperature)} variant={"outlined"}
                                       size={"small"}
                            />
                            <TextField label={'Respiratory Rate'} placeholder={"Respiratory Rate"}
                                       value={handler.signs[day].respiratoryRate.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.signs[day].respiratoryRate)}
                                       variant={"outlined"} size={"small"}
                            />
                        </>
                    })
                }
            </div>

        </>}
    </div>
}

export function MultipleSleepScheduleInput({handler}: { handler: MultipleSleepScheduleHandler }) {
    const filledDays = useMemo(() => Object.keys(handler.schedules), [handler.schedules])
    const [selectedDay, setSelectedDay] = useState("")
    useEffect(() => {
        console.log("insideEffect", selectedDay, filledDays[0])
        // if (!filledDays.includes(selectedDay)) {
        setSelectedDay(filledDays[filledDays.length - 1] || "")
        // }
    }, [filledDays]);

    const onSelectChange = (event: SelectChangeEvent) => {
        setSelectedDay(event.target.value);
    };

    const onEntryDelete = (key: string) => {
        return () => {
            if (selectedDay === key) {
                const firstRemainingDay = filledDays.length ? filledDays[0] : ""
                setSelectedDay(filledDays[filledDays.length - 1] || "")
            }
            handler.onDelete(key)
        }
    }
    console.log("Filled days", filledDays)
    console.log("Selected Value", selectedDay)
    return <div className={"multiple-investigations-wrapper"}>
        <div className={"multiple-choice-header"}>
            <AddDateKeyEntryButton onAdd={handler.onAdd} selectedDays={filledDays} setSelectedDay={setSelectedDay}/>
        </div>
        {filledDays.length > 0 && <>
            <Select size={"small"} className={"multiple-investigations-select"} value={selectedDay}
                    onChange={onSelectChange}>
                <MenuItem style={{display: "none"}} value={""}>None</MenuItem>
                {filledDays.map((day: string) => (<MenuItem value={day}>{day}</MenuItem>))}
            </Select>
            <div className={"multiple-investigation-content"}>
                {
                    filledDays.map((day: string) => {
                        console.log("day", day)

                        return <>
                            <IconButton className={day !== selectedDay ? "disappear" : ""} onClick={onEntryDelete(day)}
                                        style={{alignSelf: "end"}} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                            <TextField label={'Day Sleeping'} placeholder={"Day Sleeping"}
                                       value={handler.schedules[day].daySleeping.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.schedules[day].daySleeping)}
                                       variant={"outlined"}
                                       size={"small"} multiline minRows={3} maxRows={7}
                            />
                            <TextField label={'Night Sleeping'} placeholder={"Night Sleeping"}
                                       value={handler.schedules[day].nightSleeping.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.schedules[day].nightSleeping)}
                                       variant={"outlined"}
                                       size={"small"} multiline minRows={3} maxRows={7}
                            />
                            <TextField label={'Ways of Sleeping'} placeholder={"Ways of Sleeping"}
                                       value={handler.schedules[day].waysOfSleeping.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.schedules[day].waysOfSleeping)}
                                       variant={"outlined"} size={"small"} multiline minRows={3} maxRows={7}
                            />
                            <TextField label={'Night Sleeping Progress'} placeholder={"Night Sleeping Progress"}
                                       value={handler.schedules[day].nightSleepingProgress.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.schedules[day].nightSleepingProgress)}
                                       variant={"outlined"} size={"small"} multiline minRows={3} maxRows={7}
                            />
                        </>
                    })
                }
            </div>

        </>}
    </div>
}

export function MultipleConsultInput({handler}: { handler: MultipleHandler<ConsultationHandler> }) {
    const filledDays = useMemo(() => Object.keys(handler.dates), [handler.dates])
    const [selectedDay, setSelectedDay] = useState("")
    useEffect(() => {
        console.log("insideEffect", selectedDay, filledDays[0])
        // if (!filledDays.includes(selectedDay)) {
        setSelectedDay(filledDays[filledDays.length - 1] || "")
        // }
    }, [filledDays]);

    const onSelectChange = (event: SelectChangeEvent) => {
        setSelectedDay(event.target.value);
    };

    const onEntryDelete = (key: string) => {
        return () => {
            if (selectedDay === key) {
                const firstRemainingDay = filledDays.length ? filledDays[0] : ""
                setSelectedDay(firstRemainingDay)
            }
            handler.onDelete(key)
        }
    }
    console.log("Filled days", filledDays)
    console.log("Selected Value", selectedDay)
    return <div className={"multiple-investigations-wrapper"}>
        <div className={"multiple-choice-header"}>
            <AddDateKeyEntryButton onAdd={handler.onAdd} selectedDays={filledDays} setSelectedDay={setSelectedDay}/>
        </div>
        {filledDays.length > 0 && <>
            <Select size={"small"} className={"multiple-investigations-select"} value={selectedDay}
                    onChange={onSelectChange}>
                <MenuItem style={{display: "none"}} value={""}>None</MenuItem>
                {filledDays.map((day: string) => (<MenuItem value={day}>{day}</MenuItem>))}
            </Select>
            <div className={"multiple-investigation-content"}>
                {
                    filledDays.map((day: string) => {
                        console.log("day", day)

                        return <>
                            <IconButton className={day !== selectedDay ? "disappear" : ""} onClick={onEntryDelete(day)}
                                        style={{alignSelf: "end"}} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                            <TextField label={'Interdisciplinary Consultation'}
                                       placeholder={"Interdisciplinary Consultation"}
                                       value={handler.dates[day].interdisciplinaryConsultation.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.dates[day].interdisciplinaryConsultation)}
                                       variant={"outlined"}
                                       size={"small"} multiline minRows={3} maxRows={7}
                            />
                            <TextField label={'Recommendation'} placeholder={"Recommendation"}
                                       value={handler.dates[day].recommendation.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.dates[day].recommendation)}
                                       variant={"outlined"}
                                       size={"small"} multiline minRows={3} maxRows={7}
                            />
                        </>
                    })
                }
            </div>

        </>}
    </div>
}

export function MultipleFollowUpInput({handler}: { handler: MultipleHandler<FollowUpHandler> }) {
    const filledDays = useMemo(() => Object.keys(handler.dates), [handler.dates])
    const [selectedDay, setSelectedDay] = useState("")
    useEffect(() => {
        console.log("insideEffect", selectedDay, filledDays[0])
        // if (!filledDays.includes(selectedDay)) {
        setSelectedDay(filledDays[filledDays.length - 1] || "")
        // }
    }, [filledDays]);

    const onSelectChange = (event: SelectChangeEvent) => {
        setSelectedDay(event.target.value);
    };

    const onEntryDelete = (key: string) => {
        return () => {
            if (selectedDay === key) {
                const firstRemainingDay = filledDays.length ? filledDays[0] : ""
                setSelectedDay(firstRemainingDay)
            }
            handler.onDelete(key)
        }
    }
    console.log("Filled days", filledDays)
    console.log("Selected Value", selectedDay)
    return <div className={"multiple-investigations-wrapper"}>
        <div className={"multiple-choice-header"}>
            <AddDateKeyEntryButton onAdd={handler.onAdd} selectedDays={filledDays} setSelectedDay={setSelectedDay}/>
        </div>
        {filledDays.length > 0 && <>
            <Select size={"small"} className={"multiple-investigations-select"} value={selectedDay}
                    onChange={onSelectChange}>
                <MenuItem style={{display: "none"}} value={""}>None</MenuItem>
                {filledDays.map((day: string) => (<MenuItem value={day}>{day}</MenuItem>))}
            </Select>
            <div className={"multiple-investigation-content"}>
                {
                    filledDays.map((day: string) => {
                        console.log("day", day)

                        return <>
                            <IconButton className={day !== selectedDay ? "disappear" : ""} onClick={onEntryDelete(day)}
                                        style={{alignSelf: "end"}} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                            <TextField label={'Interdisciplinary Consultation'}
                                       placeholder={"Interdisciplinary Consultation"}
                                       value={handler.dates[day].appointments.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.dates[day].appointments)}
                                       variant={"outlined"}
                                       size={"small"} multiline minRows={3} maxRows={7}
                            />
                            <TextField label={'Recommendation'} placeholder={"Recommendation"}
                                       value={handler.dates[day].monitoringProgress.value}
                                       className={classNames("j-segment-textfield", day !== selectedDay ? "disappear" : "")}
                                       onChange={onChangeWrapper(handler.dates[day].monitoringProgress)}
                                       variant={"outlined"}
                                       size={"small"} multiline minRows={3} maxRows={7}
                            />
                        </>
                    })
                }
            </div>

        </>}
    </div>
}