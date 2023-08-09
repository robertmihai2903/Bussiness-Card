import { InputLabel, TextField } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";

export const ConfigInput = ({
                                label,
                                value,
                                onChange,
                                className,
                                error,
                                initialError = false,
                                placeholder,
                                type = "string",
                                inputColor,
                            }: any) => {
    const onChangeWrapper = useCallback(
        (evt: any) => {
            onChange?.(evt.target.value);
        },
        [onChange]
    );

    const [showError, setShowError] = useState(initialError);
    const displayError = useCallback(() => {
        setShowError(true);
    }, []);

    return (
        <div style={{ marginBottom: "20px", width: '70%' }} className={className}>
            {/*{label && <InputLabel>{label}</InputLabel>}*/}
            <TextField
                value={value}
                label={label}
                onChange={onChangeWrapper}
                onBlur={displayError}
                error={showError && !!error}
                helperText={showError && error}
                style={{ width: "100%" }}
                placeholder={placeholder}
                type={type}
                variant="standard"
                sx={ { input: { color: '#fff' , borderColor: '#fff'}, color: '#fff', borderColor: '#fff' }}
            />
        </div>
    );
};
