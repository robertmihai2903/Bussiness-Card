import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {defaultProduct, Product} from "./manage-device";
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

export function ShowProduct() {
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product>(defaultProduct)
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('product_id')
    const {db} = useContext(MainContext)
    const [profileImageURL, setProfileImageURL] = useState('')

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
                    link.download = `${product.lastName} ${product.firstName} - CV`;
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
    return (<>
        {product.preview === Preview.BUSINESS_CARD && <div className={"page-show-product"}>
            <div className={'profile-picture-container'}>
                <img className={'profile-picture'} src={profileImageURL}/>
                <div className={'profile-data'}>
                    <div className={'name-title'}>
                        <div className={'name-container'}>{product.firstName} {product.lastName}</div>
                        <div className={'title-container'}>{product.title}</div>
                    </div>
                    <img className={'logo-profile'} src={Logo}/>
                </div>
            </div>
            <div className={'share-button'} onClick={share}><img className={'share-icon'} src={ShareButton}/></div>
            <div className={'data-selectors'}>
                <div className={'data-line'}><img/>{product.companyName}</div>
                <div className={'data-line'}><img/>{product.city}</div>
                <div className={'data-line'}><img/>{product.website}</div>
            </div>
            <div className={'about-container'}>
                <div className={'about-me-title'}>About me</div>
                <div className={'about-me-text'}>{product.about}</div>
            </div>

            <div className={'social-media-bar'}>
                {product.instagram && <img src={InstagramLogo} onClick={() => {
                    window.location.replace(product.instagram)
                }}/>}
                {product.facebook && <img src={LinkedInLogo} onClick={() => {
                    window.location.replace(product.linkedIn)
                }}/>}
                {product.linkedIn && <img src={FacebookLogo} onClick={() => {
                    window.location.replace(product.facebook)
                }}/>}
            </div>
            {product.cv && <div className={'download-button'} onClick={downloadCV}>Download CV</div>}
        </div>}
        {product.preview === Preview.UPLOAD_FILE && <div className={'page-show-product'}>
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
    </>)

}