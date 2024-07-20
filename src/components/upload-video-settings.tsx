import {onChangeWrapper} from "../utils";
import {Button, TextField} from "@mui/material";
import {useEditState, useProductInformation} from "../control-state";
import {useSaveProductData} from "../useProductData";
import {SettingsHeader} from "../Pages/manage-device";
import {ManageProductContext} from "../contexts";
import {BusinessSettings} from "./business-settings";

export function UploadVideoSettingsWrapper() {
    const value = useProductInformation()
    return (<ManageProductContext.Provider value={value}>
        <UploadVideoSettings/>
    </ManageProductContext.Provider>)
}

export function UploadVideoSettings() {

    const {youtubeLink} = useEditState()
    const saveProductData = useSaveProductData()

    return (<div className={'settings-page'}>
        <SettingsHeader/>
        <div className={'section-title'}>Video Upload</div>
        <div className={'explanation-text'}>Open Youtube page and choose the video you want
            to publish on device, and copy the link from browser page address.
        </div>
        <TextField label={'Youtube Link'} value={youtubeLink.value} onChange={onChangeWrapper(youtubeLink)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <button className={'red-save-button'} onClick={saveProductData}>Save</button>

    </div>)
}