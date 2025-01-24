import "./not-saved-screen.css"
import {useNavigate} from "react-router";
import {getProductIdFromURL} from "../utils";
import {ModificationJournalContext} from "./adult-journal-settings";
import {useContext} from "react";

export function NotSavedScreen() {
    const {modalOpen, onCancelExit} = useContext(ModificationJournalContext)
    const navigate = useNavigate()
    const productID = getProductIdFromURL()
    const onExit = () => {
        navigate(`/manage-device?product_id=${productID}`)
    }
    if(!modalOpen) return null
    return <div className={"not-saved-screen-wrapper"}>
        <div className={"not-saved-screen-dialog-box"}>
            <h2>You have unsaved changes.</h2>
            <h4>Do you want to exit?</h4>
            <div className={"not-saved-screen-button-box"}>
                <div className={"not-saved-screen-button-exit"} onClick={onExit}><h3>Exit</h3></div>
                <div className={"not-saved-screen-button-cancel"} onClick={onCancelExit}><h3>Cancel</h3></div>
            </div>
        </div>
    </div>
}