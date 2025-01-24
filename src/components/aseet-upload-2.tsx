import {FilePond, registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {useState} from 'react'
import {FilePondFile} from "filepond";
import firebase from "firebase/compat";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../App";
import {Product} from "../control-state";
import {getProductIdFromURL} from "../utils";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const onRequestSave = (id: any) => void 0;
const productId = getProductIdFromURL()
const server = {
    server: {
        process: (fieldName: any, file: any, metadata: any, load: any, error: any, progress: any, abort: any) => {
            // create a unique id for the file
            const id = Math.random()
            console.log("Called here")
            // upload the image to firebase
            // const task = storage.child('radnom_images/' + id).put(file, {
            //     contentType: 'image/jpeg',
            // })
            const documentRef = ref(storage, `documents/${productId}/${fieldName}`)
            console.log('start')
            uploadBytes(documentRef, file).then((data) => {

            })

            // monitor the task to provide updates to FilePond
            // task.on(
            //     firebase.storage.TaskEvent.STATE_CHANGED,
            //     snap => {
            //         // provide progress updates
            //         progress(true, snap.bytesTransferred, snap.totalBytes)
            //     },
            //     err => {
            //         // provide errors
            //         error(err.message)
            //     },
            //     () => {
            //         // the file has been uploaded
            //         load(id)
            //         onRequestSave(id)
            //     }
            // )
        },

    },
    revert: (uniqueFileId: any, load: any, error: any) => {
        // Should remove the earlier created temp file here
        // ...

        // Can call the error method if something is wrong, should exit after
        error('oh my goodness');

        // Should call the load method when done, no parameters required
        load();
    },
    load: (source: any, load: any, error: any, progress: any, abort: any) => {
        // reset our progress
        progress(true, 0, 1024)

        // fetch the download URL from firebase
        const storageRef = ref(storage, 'images/' + source);

        getDownloadURL(storageRef)
            .then(url => {
                // Fetch the actual image using the download URL
                fetch(url)
                    .then(response => response.blob())
                    .then(blob => {
                        // Provide the blob to FilePond using the load callback
                        load(blob);
                    })
                    .catch(error => {
                        // Handle any errors during the fetch
                        console.error("Error fetching image:", error);
                        error(error.message);
                        abort();
                    });
            })
            .catch(err => {
                // Handle any errors getting the download URL
                console.error("Error getting download URL:", err);
                error(err.message);
                abort();
            });
    },
    fetch: (url: any, load: any, error: any, progress: any, abort: any, headers: any) => {
        // Should get a file object from the URL here
        // ...

        // Can call the error method if something is wrong, should exit after
        error('oh my goodness');

        // Can call the header method to supply FilePond with early response header string
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
        // headers(headersString);

        // Should call the progress method to update the progress to 100% before calling load
        // (computable, loadedSize, totalSize)
        progress(true, 0, 1024);

        // Should call the load method with a file object when done
        // load(file);

        // Should expose an abort method so the request can be cancelled
        return {
            abort: () => {
                // User tapped abort, cancel our ongoing actions here

                // Let FilePond know the request has been cancelled
                abort();
            },
        };
    },
    restore: (uniqueFileId: any, load: any, error: any, progress: any, abort: any, headers: any) => {
        // Should get the temporary file object from the server
        // ...

        // Can call the error method if something is wrong, should exit after
        error('oh my goodness');

        // Can call the header method to supply FilePond with early response header string
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
        // headers(headersString);

        // Should call the progress method to update the progress to 100% before calling load
        // (computable, loadedSize, totalSize)
        progress(true, 0, 1024);

        // Should call the load method with a file object when done
        // load(serverFileObject);

        // Should expose an abort method so the request can be cancelled
        return {
            abort: () => {
                // User tapped abort, cancel our ongoing actions here

                // Let FilePond know the request has been cancelled
                abort();
            }
        };
    },
    remove: (source: any, load: any, error: any) => {
        // Should somehow send `source` to server so server can remove the file with this source

        // Can call the error method if something is wrong, should exit after
        error('oh my goodness');

        // Should call the load method when done, no parameters required
        load();
    },
}

export function AseetUpload2() {
    const [files, setFiles] = useState([])
    // console.log(files[0]?.file)
    // return (
    //     // <div style={{width: "90vw"}}>
    //     //     <FilePond
    //     //         files={files}
    //     //         onupdatefiles={setFiles}
    //     //         allowMultiple={true}
    //     //         maxFiles={3}
    //     //         server={server}
    //     //         name="files" /* sets the file input name, it's filepond by default */
    //     //         labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    //     //     />
    //     // </div>
    // )
    return <div></div>
}