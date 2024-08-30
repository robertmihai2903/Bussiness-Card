import dayjs, {Dayjs} from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import React from "react";

interface DatePickerConvertedProps {
    label: string
    value: string
    onChange: (value: string) => void
    className?: string
}

export function DatePickerConverted({label, value, onChange, className}: DatePickerConvertedProps) {
    dayjs.extend(customParseFormat);
    const convertedValue = value ? dayjs(value, 'DD/MM/YYYY') : null
    console.log({value, convertedValue})
    const convertedOnChange = (value: Dayjs | null) => {
        const stringValue = value?.format('DD/MM/YYYY') || ""
        onChange(stringValue)
    }
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label={label} value={convertedValue} onChange={convertedOnChange}
                    className={className}/>
    </LocalizationProvider>
}