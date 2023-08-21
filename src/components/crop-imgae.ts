const createImage = (url: any) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

export const getCroppedImg = async (imageSrc: any, crop: any) => {
    const image = await createImage(imageSrc) as CanvasImageSource
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    /* setting canvas width & height allows us to
    resize from the original image resolution */
    canvas.width = 1008
    canvas.height = 720

    ctx!.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
    )

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        }, 'image/jpeg')
    })
}