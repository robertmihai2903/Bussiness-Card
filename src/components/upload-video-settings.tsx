import {onChangeWrapper} from "../utils";
import {Button, TextField} from "@mui/material";
import {useEditState} from "../control-state";
import {useSaveProductData} from "../useProductData";

export function UploadVideoSettings() {

    const {youtubeLink} = useEditState()
    const saveProductData = useSaveProductData()

    return (<div className={'basic-page'}>
        <div className={'section-title'}>Video Upload</div>
        <div className={'explanation-text'}>Open Youtube page and not the Youtube application, choose the video you want
            to publish on device, and copy the link from browser page address.
        </div>
        <TextField label={'Youtube Link'} value={youtubeLink.value} onChange={onChangeWrapper(youtubeLink)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <button className={'red-save-button'} onClick={saveProductData}>Save</button>

    </div>)
}