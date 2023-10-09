import {useNavigate} from "react-router";
import {CSSProperties, useContext, useEffect, useMemo, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {MainContext} from "../contexts";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../App";
import {Preview} from "./admin";
import './show-product.css'
import ShareButton from '../assets/share.svg'
import Logo from '../assets/flexpayz-logo.svg'
import InstagramLogo from '../assets/instagram.svg'
import FacebookLogo from '../assets/facebook.svg'
import LinkedInLogo from '../assets/linkedin.svg'
import YoutubeLogo from '../assets/youtube-svgrepo-com.svg'
import YouTube from "react-youtube";
import WorkIcon from '../assets/work-icon.svg'
import LocationIcon from '../assets/location-icon.svg'
import WebsiteIcon from '../assets/website-icon.svg'
import TikTokLogo from '../assets/tiktok-square-icon.svg'
import {defaultProduct, Product} from "../control-state";
import {TextField} from "@mui/material";
import {onChangeWrapper} from "../utils";

export function ShowProduct() {
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product>(defaultProduct)
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('product_id')
    const {db} = useContext(MainContext)
    const [profileImageURL, setProfileImageURL] = useState('')
    const [logoImageURL, setLogoImageURL] = useState('')

    const [passwordProtected, setPasswordProtected] = useState(false)
    const [password, setPassword] = useState('')
    const [loaded, setLoaded] = useState(false)


    getYoutubeLink('//https://youtu.be/GF8hpmGhBtI?si=W3ww_cb9OBGhuBIO')

    useEffect(() => {
        (async () => {
            if (productId) {
                const productRef = doc(db, 'products', productId)
                const docSnap = await getDoc(productRef);
                if (docSnap.exists()) {
                    if (!docSnap.data().activated) {
                        navigate('/app')
                    }
                    setProduct({...docSnap.data() as Product})
                    setPasswordProtected((docSnap.data() as Product).publicPagePasswordActivated)
                    setLoaded(true)
                    if (docSnap.data().preview === Preview.CUSTOM_LINK) {
                        window.location.replace(docSnap.data().customLink)
                    }
                } else {
                    navigate('/app')
                }
                const imageRef = ref(storage, `images/${productId}`)
                getDownloadURL(imageRef)
                    .then(url => {
                        setProfileImageURL(url)
                        return Promise.resolve(true);
                    })
                    .catch(error => {
                        if (error.code === 'storage/object-not-found') {
                            return Promise.resolve(false);
                        } else {
                            return Promise.reject(error);
                        }
                    });
                const logoRef = ref(storage, `images/logo-${productId}`)
                getDownloadURL(logoRef)
                    .then(url => {
                        setLogoImageURL(url)
                        return Promise.resolve(true);
                    })
                    .catch(error => {
                        if (error.code === 'storage/object-not-found') {
                            return Promise.resolve(false);
                        } else {
                            return Promise.reject(error);
                        }
                    });
            }
        })()
    }, [])

    const share = () => {
        const url = window.location.href
        if(navigator.share) {
            navigator.share({
                title: `${product.firstName} ${product.lastName} - Business Card`,
                url: url
            }).catch(console.error)
        }
    }

    const downloadCV = () => {
        const documentRef = ref(storage, `documents/${productId}/CV` )
        getDownloadURL(documentRef)
            .then(url => {
                console.log(url);
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    const blob = xhr.response;
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${product.lastName} ${product.firstName} - document`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                };
                xhr.open('GET', url);
                xhr.send();
                return Promise.resolve(true);
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    const downloadFile1 = () => {
        const documentRef = ref(storage, `documents/${productId}/file1` )
        getDownloadURL(documentRef)
            .then(url => {
                console.log(url);
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    const blob = xhr.response;
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${product.filename1}`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                };
                xhr.open('GET', url);
                xhr.send();
                return Promise.resolve(true);
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error);
                }
            });
    }
    const downloadFile2 = () => {
        const documentRef = ref(storage, `documents/${productId}/file2` )
        getDownloadURL(documentRef)
            .then(url => {
                console.log(url);
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    const blob = xhr.response;
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${product.filename2}`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                };
                xhr.open('GET', url);
                xhr.send();
                return Promise.resolve(true);
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error);
                }
            });
    }
    const downloadFile3 = () => {
        const documentRef = ref(storage, `documents/${productId}/file3` )
        getDownloadURL(documentRef)
            .then(url => {
                console.log(url);
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    const blob = xhr.response;
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${product.filename3}`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                };
                xhr.open('GET', url);
                xhr.send();
                return Promise.resolve(true);
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    const downloadVCard = () => {
        const documentRef = ref(storage, `documents/${productId}/vCard` )
        getDownloadURL(documentRef)
            .then(url => {
                console.log(url);
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    const blob = xhr.response;
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `vCard.vcf`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                };
                xhr.open('GET', url);
                xhr.send();
                return Promise.resolve(true);
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    const shareFile1 = () => {
    }

    const shareFile2 = () => {

    }
    const shareFile3 = () => {
        const documentRef = ref(storage, `documents/${productId}/file3` )
        getDownloadURL(documentRef)
            .then(url => {
                console.log(url);
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    const blob = xhr.response;
                    const file = new File([blob], `${product.filename3}.pdf`, {
                        type: blob.type,
                    });
                    navigator.share({
                        title: product.filename3,
                        files:[file]
                    })
                };
                return Promise.resolve(true);
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    const post = getYoutubeLink(product.youtubeLink)
    const youtubeID = post?.split('v=')[1];
    const onReady = (event: any) => {
        console.log(event.target)
        event.target.playVideo();
    };

    console.log(product.color1, product.color2)

    const colorsStyle = {
        "--color1": product.color1 || '#467083',
        "--color2": product.color2 || "#A3B0B5",
    } as CSSProperties;

    return (<div style={colorsStyle}>
        {passwordProtected && <div className={'password-page'}>
            <TextField label={'Unlock page'} type={'password'} className={'form-manager-input'} value={password}
                       onChange={(e) => {
                           setPassword(e.target.value)
                           if (e.target.value === product.publicPagePassword) {
                               setPasswordProtected(false)
                           }
                       }} variant={"outlined"} size={"small"}/>
        </div>}
        {loaded && !passwordProtected && product.preview === Preview.BUSINESS_CARD &&
            <div className={"page-show-product-business"}>
            <div className={'profile-picture-container'}>
                <img className={'profile-picture'} src={profileImageURL}/>
                <div className={'profile-data'}>
                    <div className={'name-title'}>
                        <div className={'name-container'}>{product.firstName} {product.lastName}</div>
                        <div className={'title-container'}>{product.title}</div>
                    </div>
                    {logoImageURL && <img className={'logo-profile'} src={logoImageURL}/>}
                </div>
            </div>
            <div className={'share-button'} onClick={share}><img className={'share-icon'} src={ShareButton}/></div>
            <div className={'data-selectors'}>
                <div className={'data-line'}><img src={WorkIcon} className={'presentation-icon'}/>{product.companyName}
                </div>
                <div className={'data-line'}><img src={LocationIcon} className={'presentation-icon'}/>{product.city}
                </div>
                <div className={'data-line'} onClick={() => {
                    window.location.replace(product.website)
                }}><img src={WebsiteIcon} className={'presentation-icon'}/>{product.website}</div>
            </div>
            <div className={'about-container'}>
                <div className={'about-me-title'}>About me</div>
                <div className={'about-me-text'}>{product.about}</div>
            </div>

            <div className={'social-media-bar'}>
                {product.instagram && <img src={InstagramLogo} onClick={() => {
                    window.location.replace(product.instagram)
                }}/>}
                {product.facebook && <img src={FacebookLogo} onClick={() => {
                    window.location.replace(product.facebook)
                }}/>}
                {product.linkedIn && <img src={LinkedInLogo} onClick={() => {
                    window.location.replace(product.linkedIn)
                }}/>}
                {product.youtube && <img src={YoutubeLogo} onClick={() => {
                    window.location.replace(product.youtube)
                }}/>}
                {product.tiktok && <img src={TikTokLogo} onClick={() => {
                    window.location.replace(product.tiktok)
                }}/>}

            </div>
                {!passwordProtected && product.cv &&
                    <div className={'download-button-profile'} onClick={downloadCV}>Download Document</div>}
            <div className={'download-button-profile'} onClick={downloadVCard}>Save my contact details</div>
        </div>}
        {!passwordProtected && product.preview === Preview.UPLOAD_FILE && <div className={'page-show-product'}>
            {product.filename1 && <div className={'file-container'}>
                <span>{product.filename1}</span>
                <div className={'download-button'} onClick={downloadFile1}>Download</div>
                {/*<div className={'share-button'} onClick={shareFile1}>Share</div>*/}
            </div>}
            {product.filename2 && <div className={'file-container'}>
                <span>{product.filename2}</span>
                <div className={'download-button'} onClick={downloadFile2}>Download</div>
                {/*<div className={'share-button'} onClick={shareFile2}>Share</div>*/}
            </div>}
            {product.filename3 && <div className={'file-container'}>
                <span>{product.filename3}</span>
                <div className={'download-button'} onClick={downloadFile3}>Download</div>
                {/*<div className={'share-button'} onClick={shareFile3}>Share</div>*/}
            </div>}
        </div>}
        {!passwordProtected && product.preview === Preview.UPLOAD_VIDEO && <div className={'page-show-product'}>
            <YouTube className={'youtube'} videoId={youtubeID} onReady={onReady} opts={
                {
                    playerVars: {
                        start: 0,
                        autoplay: 1,
                        color: 'white',
                        modestbranding: 1,
                        controls: 1,
                        rel: 0,
                        loop: 1
                    }
                }
            }/>
        </div>}
    </div>)

}


//https://www.youtube.com/watch?v=_NbdmiAS0J4
//https://youtu.be/_NbdmiAS0J4?si=x_QhRN-t96Ca_JDc
//https://youtu.be/_NbdmiAS0J4?si=x_QhRN-t96Ca_JDc
//https://youtu.be/GF8hpmGhBtI?si=W3ww_cb9OBGhuBIO

const getYoutubeLink = (link: string) => {
    const mobileStartPosition =link?.search('youtu.be')
    if( mobileStartPosition > -1) {
       const mobileEndPosition = link?.search('si=')
        const videoCode = link?.substring(mobileStartPosition + 9, mobileEndPosition-1)
        return `https://www.youtube.com/watch?v=${videoCode}`
    } else {
        return link
    }
}