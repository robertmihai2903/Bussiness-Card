
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './crop-imgae'

const ImageCropper = ({ getBlob, inputImg, zoom, setZoom}: any) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })

    /* onCropComplete() will occur each time the user modifies the cropped area,
    which isn't ideal. A better implementation would be getting the blob
    only when the user hits the submit button, but this works for now  */
    const onCropComplete = async (_: any, croppedAreaPixels: any) => {
        const croppedImage = await getCroppedImg(
            inputImg,
            croppedAreaPixels
        )
        getBlob(croppedImage)
    }

    return (
        /* need to have a parent with `position: relative`
    to prevent cropper taking up whole page */
        <div className='cropper'>
            <Cropper
                image={inputImg}
                crop={crop}
                zoom={zoom}
                aspect={1.4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
        </div>
    )
}

export default ImageCropper