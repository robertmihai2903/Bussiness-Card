import {onChangeWrapper} from "../utils";
import {Button, TextField} from "@mui/material";
import {useEditState, useProductInformation} from "../control-state";
import {useSaveProductData} from "../useProductData";
import {useContext} from "react";
import {ManageProductContext} from "../contexts";
import VCard from "vcard-creator";
import {SettingsHeader} from "../Pages/manage-device";

function Contact({contact}: any) {
    const saveContact = () => {
        const contactVCard = new VCard()
        contactVCard.addName(contact.name)
        contactVCard.addEmail(contact.email)
        contactVCard.addPhoneNumber(contact.phone)
        const blob = new Blob([contactVCard.toString()], {type: "text/vcard"})
        const file = new File([blob], 'vCard.vcf', {type: "text/vcard"})
        const url = window.URL.createObjectURL(file);

        //create a hidden link and set the href and click it
        const a = document.createElement("a");
        // a.style = "display: none";
        a.href = url;
        a.download = file.name;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    return (
        <div className={'contact-box'}>
            <span>{contact.name}</span>
            <button onClick={saveContact}>Save Contact</button>
        </div>
    )
}

export function SharedContacts() {

    // const {productState} = useContext(ManageProductContext)
    const {productState} = useProductInformation()
    const contacts = productState?.sharedContacts || []
    const contactsExist = contacts.length > 0


    return (<div className={'settings-page'}>
        <SettingsHeader/>
        <div className={'section-title'}>Shared Contacts</div>
        {!contactsExist && <div className={'explanation-text'}> You have no shared contacts yet.</div>}
        {contacts.map((contact) => (<Contact contact={contact}/>))}


    </div>)
}