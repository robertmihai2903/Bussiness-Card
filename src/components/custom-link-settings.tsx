import {onChangeWrapper} from "../utils";
import {Button, TextField} from "@mui/material";
import {useEditState} from "../control-state";
import {useSaveProductData} from "../useProductData";

export function CustomLinkSettings() {
    const {customLink} = useEditState()
    const saveProductData = useSaveProductData()
    return <div className={'basic-page'}>
        <div className={'section-title'}>Custom Link</div>
        <div className={'explanation-text'}>Introduce any URL link in this format https://……
            you can copy from the browser address page and paste in the field.
        </div>

        <TextField label={'Custom link'} value={customLink.value} onChange={onChangeWrapper(customLink)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{ input: { color: 'white' } }}/>
        <button className={'red-save-button'} onClick={saveProductData}>Save</button>
    </div>
}