import dayjs, {Dayjs} from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

interface TimePickerConvertedProps {
    value: string,
    onChange: (value: string) => void
    label: string
    className?: string
}

export function TimePickerConverted({value, onChange, className, label}: TimePickerConvertedProps) {
    dayjs.extend(customParseFormat);
    const convertedValue = value ? dayjs(value, 'HH:mm') : null
    const convertedOnChange = (value: Dayjs | null) => {
        const stringValue = value?.format('HH:mm') || ""
        onChange(stringValue)
    }
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
            label={label}
            className={className}
            value={convertedValue}
            onChange={convertedOnChange}
            ampm={false}
        />
    </LocalizationProvider>
}