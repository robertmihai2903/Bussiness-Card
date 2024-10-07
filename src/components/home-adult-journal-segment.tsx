import React, {useContext, useEffect, useMemo, useState} from "react";
import {Button, MenuItem, Popover, Select, SelectChangeEvent, TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";
import "./journal-segment.css"
import {DatePickerConverted} from "./date-picker-converted";
import {TimePickerConverted} from "./time-picker-converted";
import AssetUpload3 from "./asset-upload-3";
import {ProfileUpload} from "./profile-upload";
import {AdultJournalEditContext, MultipleInvestigationsHandler} from "./adult-journal-settings";
import {DB_COLLECTIONS, DB_STORAGE} from "./baby-journal-settings";
import dayjs, {Dayjs} from "dayjs";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import SelectInput from "@mui/material/Select/SelectInput";
import {InvestigationInput} from "./investigation-adult-journal-segment";

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


function AddDateKeyEntryButton({onAdd, selectedDays}: any) {
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
    }
    return <div>
        <Button onClick={onOpen}>Add</Button>
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
                <Button onClick={onAddEntry}>Add Entry</Button>
            </div>
        </Popover>
    </div>
}


export function MultipleInvestigationsInput({label, handler}: { label: string, handler: MultipleInvestigationsHandler }) {
    const filledDays = useMemo(() => Object.keys(handler.investigations), [handler.investigations])
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
        <div className={"multiple-investigation-header"}>
            {label && <h4 className={"j-segment-investigation-input-label"}>{label}</h4>}
            <AddDateKeyEntryButton onAdd={handler.onAdd} selectedDays={filledDays}/>
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