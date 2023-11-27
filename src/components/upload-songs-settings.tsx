import {useEditState} from "../control-state";
import {useSaveProductData} from "../useProductData";
import {TextField} from "@mui/material";
import {onChangeWrapper, useUploadAudio} from "../utils";
import {SettingsHeader} from "../Pages/manage-device";

export function UploadSongsSettings() {

    const {song1, song2, song3} = useEditState()
    const saveProductData = useSaveProductData()
    const uploadSong1 = useUploadAudio('song1')
    const uploadSong2 = useUploadAudio('song2')
    const uploadSong3 = useUploadAudio('song3')

    return (<div className={'settings-page'}>
        <SettingsHeader/>
        <div className={'section-title'}>Song Upload</div>
        {/*<div className={'explanation-text'}>Upload your PDF files,  rename the uploaded files, save and when you share with your partners you will have possibilty to share the documents directly.</div>*/}

        <input className={'custom-file-input'} type={'file'} onChange={uploadSong1} accept={'audio/*'}/>
        <TextField style={{marginTop: '12px'}} label={'Song name'} value={song1.value} onChange={onChangeWrapper(song1)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <input className={'custom-file-input'} type={'file'} onChange={uploadSong2} accept={'audio/*'}/>
        <TextField style={{marginTop: '12px'}} label={'Song name'} value={song2.value} onChange={onChangeWrapper(song2)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <input className={'custom-file-input'} type={'file'} onChange={uploadSong3} accept={'audio/*'}/>
        <TextField style={{marginTop: '12px'}} label={'Song name'} value={song3.value} onChange={onChangeWrapper(song3)}
                   variant={"outlined"} size={"small"} className={'form-manager-input'} sx={{input: {color: 'white'}}}/>
        <button className={'red-save-button'} onClick={saveProductData}>Save</button>

    </div>)
}