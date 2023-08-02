import {ConfigInput} from "../components/config-input";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";

export function AddProduct () {
    const navigate = useNavigate()
    return (<div className={"page"}>
        <div className={"modal"}>
            <Button>Website</Button>
            <Button onClick={()=> {navigate('/app')}}>App</Button>
        </div>


    </div>)
}