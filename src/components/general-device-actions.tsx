import PreviewLogo from "../assets/preview.svg";
import {ResetProduct} from "../Pages/manage-device";
import {getProductIdFromURL} from "../utils";
import {useNavigate} from "react-router";

export function GeneralDeviceActions () {
    const productId = getProductIdFromURL()
    const navigate = useNavigate()
return (<div className={'general-device-actions-box'}>
    <div className={'preview-button'} onClick={() => {
        navigate(`/show-product?product_id=${productId}`)
    }}><img className={'preview-logo'} src={PreviewLogo} alt={'preview'}/>Preview
    </div>
    <ResetProduct/>
</div>)
}