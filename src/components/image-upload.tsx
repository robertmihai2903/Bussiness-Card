import React, {SetStateAction, useState, useEffect} from 'react'
import * as firebase from 'firebase/app'
import ImageCropper from './image-cropper'
import './image-upload.css'
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../App";
import {Button} from "@mui/material";
import {notify} from "../Pages/login-page";

const ImageUpload = () => {
    const [blob, setBlob] = useState<Blob | null>(null)
    const [inputImg, setInputImg] = useState('')
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('product_id')
    const imageRef = ref(storage, `images/${productId}`)

    useEffect(() => {
        (async () => {


            getDownloadURL(imageRef)
                .then(url => {
                    setInputImg(url)
                    return Promise.resolve(true);
                })
                .catch(error => {
                    if (error.code === 'storage/object-not-found') {
                        return Promise.resolve(false);
                    } else {
                        return Promise.reject(error);
                    }
                });
        })()
    }, []);

    const getBlob = (blob: any) => {
        // pass blob up from the ImageCropper component
        setBlob(blob)
    }

    const onInputChange = (e: any) => {
        // convert image file to base64 string
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            setInputImg(reader.result as SetStateAction<string>)
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const handleSubmitImage = async (e: any) => {
        // upload blob to firebase 'images' folder with filename 'image'
        e.preventDefault()
        const file = new File([blob as unknown as Blob], `image-cropped.pdf`, {
            type: blob!.type!,
        });
        // firebase
        await uploadBytes(imageRef, file )
        getDownloadURL(imageRef)
            .then(url => {
                setInputImg(url)
                notify('Image has been cropped')
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


    return (
        <form onSubmit={handleSubmitImage}>
            <input
                className={'custom-file-input'}
                type='file'
                accept='image/*'
                onChange={onInputChange}
            />
            {
                inputImg && (
                    <div className={'cropper-wrapper'}>
                        <ImageCropper
                            getBlob={getBlob}
                            inputImg={inputImg}
                        />
                    </div>
                )
            }
            <button className={'blue-crop-button'}  type='submit'>Crop</button>
        </form>
    )
}

export default ImageUpload