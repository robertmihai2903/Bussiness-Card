import {useEditState, useProductInformation} from "../control-state";
import {useSaveProductData} from "../useProductData";
import {TextField} from "@mui/material";
import {onChangeWrapper, useUploadAudio} from "../utils";
import {SettingsHeader} from "../Pages/manage-device";
import {ManageProductContext} from "../contexts";
import {BusinessSettings} from "./business-settings";
import {FileUpload} from "./file-upload";

export function UploadSongsSettingsWrapper() {
    const value = useProductInformation()
    return (<ManageProductContext.Provider value={value}>
        <UploadSongsSettings/>
    </ManageProductContext.Provider>)
}

export function UploadSongsSettings() {

    const {song1, song2, song3} = useEditState()
    const saveProductData = useSaveProductData()
    const uploadSong1 = useUploadAudio('song1')
    const uploadSong2 = useUploadAudio('song2')
    const uploadSong3 = useUploadAudio('song3')

    return (<div className={'settings-page'}>
        <SettingsHeader/>
        <div className={'section-title'}>Song Upload</div>
        <h2 className={'pinline'}><span>Song 1</span></h2>
        <FileUpload filename={'song1'} inputConfigs={song1} fileType={'audio/*'}/>
        <h2 className={'pinline'}><span>Song 2</span></h2>
        <FileUpload filename={'song2'} inputConfigs={song2} fileType={'audio/*'}/>
        <h2 className={'pinline'}><span>Song 3</span></h2>
        <FileUpload filename={'song3'} inputConfigs={song3} fileType={'audio/*'}/>
        <button className={'red-save-button'} onClick={saveProductData}>Save</button>

    </div>)
}