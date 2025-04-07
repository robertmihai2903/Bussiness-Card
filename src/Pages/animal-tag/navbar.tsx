import "../../components/journal-navbar.css"
import classNames from "classnames";
import {JNavbarBackIcon} from "../../assets/j-navbar-back-icon";
import {useState} from "react";
import {useNavigate} from "react-router";
import {getProductIdFromURL} from "../../utils";

export function Navbar() {
    return <div className={'j-navbar-container'}>
        <GoBackButton/>
        <div className={classNames("j-navbar-segment-wrapper")}></div>
    </div>
}

function GoBackButton() {
    const [active, setActive] = useState(false)
    const navigate = useNavigate()
    const productId = getProductIdFromURL()
    const onGoBack = async () => {
        setActive(true)
        // onWantsToExit()
        navigate(`/manage-device?product_id=${productId}`)
        setTimeout(() => {
            setActive(false)
        }, 500)
    }
    return <div onClick={onGoBack}
                className={classNames("j-navbar-segment-wrapper")}>
        <JNavbarBackIcon color={active ? "#000" : "#606060"} className={"j-navbar-icon"}/>
        <p className={"j-navbar-label"}>Go Back</p>
    </div>
}