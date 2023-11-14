import {useNavigate} from "react-router";
import './initial-page.css'
import Logo from "../assets/flexpayz-logo.svg"

export function InitialPage () {
    const navigate = useNavigate()
    return (<div className={"page-initial"}>
        <div className={"modal-initial"}>
            <img src={Logo} alt={'logo'} className={'flexpayz-logo'}/>
            <div className={'buttons-container'}>
            <button className={'website-button'} onClick={()=> { window.location.replace('https://www.flexpayz.se')}}>Webshop</button>
            <button className={'app-button'} onClick={()=> {navigate('/app')}}>Device Manager</button>
            </div>
        </div>


    </div>)
}