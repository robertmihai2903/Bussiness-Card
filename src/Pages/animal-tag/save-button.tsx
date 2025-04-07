import {getProductIdFromURL} from "../../utils";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../App";
import {notify} from "../login-page";
import {DB_COLLECTIONS} from "../../components/baby-journal-settings";
import "./save-button.css"

interface SaveButtonProps {
    state: any,
    setOriginalState: any,
    collection: DB_COLLECTIONS
}

export function SaveButton({collection, setOriginalState, state}: SaveButtonProps) {
    const productId = getProductIdFromURL()
    const onSave = async () => {
        if (productId) {
            const productRef = doc(db, collection, productId)
            await updateDoc(productRef, {...state})
            notify('Saved modifications')
            setOriginalState(state)
        }
    }

    return <div className={"save-button-wrapper"} onClick={onSave}>
        SAVE
    </div>
}