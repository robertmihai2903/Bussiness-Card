import {useContext} from "react";
import {getProductIdFromURL} from "../utils";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../App";
import {notify} from "../Pages/login-page";
import {BabyJournalStateContext, DB_COLLECTIONS} from "./baby-journal-settings";
import "./save-journal-button.css"
import {AdultJournalStateContext, ModificationJournalContext} from "./adult-journal-settings";

interface SaveJournalButtonProps {
    collection: DB_COLLECTIONS
}

export function SaveJournalButton({collection}: SaveJournalButtonProps) {
    const {babyJournalState, setOriginalBabyJournalState} = useContext(BabyJournalStateContext)
    const {adultJournalState, setOriginalJournalState: setOriginalAdultState} = useContext(AdultJournalStateContext)
    const productId = getProductIdFromURL()


    const actualState = collection === DB_COLLECTIONS.BABY_JOURNALS ? babyJournalState : adultJournalState
    const onSave = async () => {
        if (productId) {
            const productRef = doc(db, collection, productId)
            await updateDoc(productRef, {...actualState})
            notify('Saved modifications')
            if (collection === DB_COLLECTIONS.BABY_JOURNALS) {
                setOriginalBabyJournalState(babyJournalState)
            } else {
                setOriginalAdultState(adultJournalState)
            }
        }
    }
    return <div className={"save-journal-wrapper"} onClick={onSave}>
        SAVE
    </div>
}