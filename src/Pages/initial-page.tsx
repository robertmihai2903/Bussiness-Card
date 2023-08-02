import {ConfigInput} from "../components/config-input";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";

export function InitialPage () {
    const navigate = useNavigate()
    return (<div className={"page"}>
        <div className={"modal"}>
            <Button onClick={()=> {navigate('/admin')}}>Website</Button>
            <Button onClick={()=> {navigate('/app')}}>App</Button>
        </div>


    </div>)
}