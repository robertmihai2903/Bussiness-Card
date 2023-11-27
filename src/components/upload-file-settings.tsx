import {onChangeWrapper, useUploadFile} from "../utils";
import {Button, TextField} from "@mui/material";
import {useEditState} from "../control-state";
import {useSaveProductData} from "../useProductData";
import {SettingsHeader} from "../Pages/manage-device";

export function UploadFileSettings() {

    const {filename1, filename2, filename3} = useEditState()
    const uploadFile1 = useUploadFile('file1')
    const uploadFile2 = useUploadFile('file2')
    const uploadFile3 = useUploadFile('file3')
    const saveProductData = useSaveProductData()

    return <div className={'settings-page'}>
        <SettingsHeader/>
        <div className={'section-title'}>PDF Upload</div>
        <div className={'explanation-text'}>Upload your PDF files,  rename the uploaded files, save and when you share with your partners you will have possibilty to share the documents directly.</div>

        <input className={'custom-file-input'} type={'file'} onChange={uploadFile1} accept={'.pdf, .vcf'}/>
        <TextField style={{marginTop:'12px'}} label={'File name'} value={filename1.value} onChange={onChangeWrapper(filename1)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{ input: { color: 'white' } }}/>
        <input className={'custom-file-input'} type={'file'} onChange={uploadFile2} accept={'.pdf'}/>
        <TextField style={{marginTop:'12px'}} label={'File name'} value={filename2.value} onChange={onChangeWrapper(filename2)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{ input: { color: 'white' } }}/>
        <input className={'custom-file-input'} type={'file'} onChange={uploadFile3} accept={'.pdf'}/>
        <TextField style={{marginTop:'12px'}} label={'File name'} value={filename3.value} onChange={onChangeWrapper(filename3)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{ input: { color: 'white' } }}/>
        <button className={'red-save-button'} onClick={saveProductData}>Save</button>
    </div>
}