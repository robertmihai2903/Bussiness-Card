import React, {useContext, useState} from "react";
import {LoadingScreen, LoadingScreenContext} from "../../components/loading-sreen";
import {AnimalTagInformationContext, AnimalTagInformationContextProvider} from "./useAnimalTagInformation";
import {AnimalTagHandlerContext, AnimalTagHandlerContextProvider, useAnimalTagHandler} from "./useAnimalTagHandler";
import {SaveButton} from "./save-button";
import {DB_COLLECTIONS} from "../../components/baby-journal-settings";
import "./styles.css"
import {onChangeWrapper} from "../../utils";
import {TextField} from "@mui/material";
import ReactPhoneInput from 'react-phone-input-material-ui';

export function AnimalTagSettingsWrapper() {
    const [isLoading, setIsLoading] = useState(false)
    return <div style={{position: "relative", maxWidth: "1000px", margin: "0 auto"}}>
        <LoadingScreenContext.Provider value={{isLoading, setIsLoading}}>
            <AnimalTagInformationContextProvider>
                <AnimalTagHandlerContextProvider>
                    {isLoading && <LoadingScreen/>}
                    <AnimalTagSettings/>
                    <AnimalTagSaveButton/>
                </AnimalTagHandlerContextProvider>
            </AnimalTagInformationContextProvider>
        </LoadingScreenContext.Provider>
        <h1> Animal Tag Settings</h1>
    </div>
}

function AnimalTagSettings() {
    const {name, age, breed, color, height, weight, ownerMessage, contact} = useContext(AnimalTagHandlerContext)!
    return <div className={"settings-box"}>
        <h1>About</h1>
        <TextField label={'Name'} placeholder={"Name"} value={name.value} className={"textfield"}
                   onChange={onChangeWrapper(name)} variant={"outlined"} size={"small"}/>
        <TextField label={'Age'} placeholder={"Age"} value={age.value} className={"textfield"}
                   onChange={onChangeWrapper(age)} variant={"outlined"} size={"small"}/>
        <TextField label={'Breed'} placeholder={"Breed"} value={breed.value} className={"textfield"}
                   onChange={onChangeWrapper(breed)} variant={"outlined"} size={"small"}/>
        <TextField label={'Color'} placeholder={"Color"} value={color.value} className={"textfield"}
                   onChange={onChangeWrapper(color)} variant={"outlined"} size={"small"}/>
        <TextField label={'Height'} placeholder={"Height"} value={height.value} className={"textfield"}
                   onChange={onChangeWrapper(height)} variant={"outlined"} size={"small"}/>
        <TextField label={'Weight'} placeholder={"Weight"} value={weight.value} className={"textfield"}
                   onChange={onChangeWrapper(weight)} variant={"outlined"} size={"small"}/>
        <TextField label={'Owner Message'} placeholder={"Owner Message"} value={ownerMessage.value}
                   className={"textfield"} onChange={onChangeWrapper(ownerMessage)} variant={"outlined"}
                   size={"small"}/>

        <ReactPhoneInput enableAreaCodes country={"gb"} value={contact.phone.value}
                         onChange={contact.phone.onChange} component={TextField}
                         inputProps={{size: "small"}}/>
    </div>
}

function AnimalTagSaveButton() {
    const {state, setOriginalState} = useContext(AnimalTagInformationContext)
    return <SaveButton state={state} setOriginalState={setOriginalState} collection={DB_COLLECTIONS.ANIMAL_TAG}/>
}


