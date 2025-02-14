import "./preview-styles.css"
import {useContext, useEffect} from "react";
import {AnimalTagInformationContext, AnimalTagInformationContextProvider} from "./useAnimalTagInformation";
import {ProfilePicturePreview} from "../../components/home-baby-journal-preview";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../App";
import {DB_COLLECTIONS} from "../../components/baby-journal-settings";
import {notify} from "../login-page";

export function AnimalTagPreview() {
    const {state} = useContext(AnimalTagInformationContext)
    const {photo, name, gender, breed, age, ownerMessage, contact, weight, height, color, isLost} = state
    let locationLink = ""
    const onSendLocation = async () => {
        const success = async (position: any) => {
            locationLink = "https://maps.google.com/?q=" + position.coords.latitude + "," + position.coords.longitude

            await addDoc(collection(db, DB_COLLECTIONS.MAIL), {
                to: contact.email,
                message: {
                    subject: `${name} was found by Flexpayz!`,
                    text: "Here is the location of your pet: " + locationLink,
                },
            })
            console.log("MAIL SENT")
            notify("Location sent")
        }
        const error = (error: any) => {
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }
    return <div className={"animal-tag-preview"}>
        <div className={"frame"}>
            <ProfilePicturePreview asset={photo[0]}/>
            <div className={"name-container"}>
                <div className={"name"}>{name}</div>
                <div className={"breed"}>{breed} * {age}</div>
            </div>
        </div>
        <div className={"info"}>
            <h3>About {name}</h3>
            <div className={"info-line"}>
                <div className={"info-box"}>
                    <h6>Weight</h6>
                    <h3>{weight}</h3>
                </div>
                <div className={"info-box"}>
                    <h6>Height</h6>
                    <h3>{height}</h3>
                </div>
                <div className={"info-box"}>
                    <h6>Color</h6>
                    <h3>{color}</h3>
                </div>
            </div>
            <h3>Owner's note</h3>
            <div className={"note"}>
                <p>{ownerMessage}</p>
            </div>
            {isLost && <div>
                <h3>Contact</h3>
                <h6>{contact.name}</h6>
                <h6>{contact.address}</h6>
                <h6><a href={`tel:${contact.phone}`}>{contact.phone}</a></h6></div>}
        </div>
        {isLost && contact.email &&
            <div className={"send-location-button"} onClick={onSendLocation}>Send location</div>}
    </div>
}

export function AnimalTagPreviewWrapper() {
    return <AnimalTagInformationContextProvider>
        <AnimalTagPreview/>
    </AnimalTagInformationContextProvider>
}