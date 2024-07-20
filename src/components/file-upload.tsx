import {onChangeWrapper, useUploadFile} from "../utils";
import {Product, useProductInformation} from "../control-state";
import {useEffect, useState} from "react";
import {TextField} from "@mui/material";

interface UploadFileProps {
    filename: string,
    fileId?: keyof Product,
    inputConfigs: { value: any, onChange: any }
    fileType: string
}

export function FileUpload({fileId, filename, inputConfigs, fileType}: UploadFileProps) {
    const [fileUploaded, setFileUploaded] = useState(false)
    const uploadFile = useUploadFile(filename, fileId, setFileUploaded)

    useEffect(() => {
        if (inputConfigs.value) {
            setFileUploaded(true)
        }
    }, [inputConfigs]);
    const deleteFile = () => {
        inputConfigs.onChange("")
        setFileUploaded(false)
    }
    console.log('fileUplooaded', fileUploaded)
    return (<div className={"upload-file-wrapper"}>
        {fileUploaded && <div className={"upload-file-filled"}>
            <TextField label={`File name`} className={'form-manager-input'}
                       value={inputConfigs.value} onChange={onChangeWrapper(inputConfigs)}
                       variant={"outlined"} size={"small"} sx={{input: {color: 'white'}}}/>
            <div className={"file-upload-action-buttons"}>
                <input className={'custom-file-input-replace'} type={'file'} onChange={uploadFile} accept={fileType}/>
                <div className={"file-delete-button"} onClick={deleteFile}>Delete</div>
            </div>
        </div>}
        {!fileUploaded && <div className={"file-upload-empty"}>
            <input className={'custom-file-input'} type={'file'} onChange={uploadFile} accept={fileType}/>
        </div>}
    </div>)
}