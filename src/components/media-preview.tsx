import React, {useContext, useEffect, useState} from 'react';
import {getDownloadURL, ref, uploadBytesResumable, listAll, deleteObject, getMetadata} from 'firebase/storage';
import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginGetFile from 'filepond-plugin-get-file';
import 'filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import {storage} from "../App";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {FilePondFile} from "filepond";
import {getProductIdFromURL} from "../utils";
import {Asset, DB_STORAGE} from "./baby-journal-settings";
import {LoadingScreenContext} from "./loading-sreen";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";

// registerPlugin(FilePondPluginFileEncode, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageResize, FilePondPluginImageTransform, FilePondPluginGetFile)
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFilePoster, FilePondPluginGetFile)

interface MediaPreviewProps {
    value: Asset[]
    // onChange: (assets: Asset[]) => void
    multiple?: boolean
    maxFiles?: number
    // storageFolder: DB_STORAGE
}

export function MediaPreview({value, multiple = false, maxFiles = 1}: MediaPreviewProps) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState<{ name: string, source: string }[]>([]);
    const productId = getProductIdFromURL()
    useEffect(() => {
        // Fetch files from Firebase Storage at initialization
        const fetchFiles = async () => {
            const urls = value; // Specify your folder path
            console.log("urls", urls)
            const formattedFiles = await Promise.all(urls.map(async (file) => {
                const assetRef = ref(storage, file.url);
                const metadata = await getMetadata(assetRef)
                return {
                    source: file.url,
                    options: {
                        type: 'local',
                        file: {
                            name: file.name,
                            size: metadata.size,
                            type: metadata.contentType, // Replace with correct file type if known
                        },
                        metadata: {
                            poster: file.url, // For image files
                        },
                    },
                }
            }));
            console.log("BEFORE FILES", formattedFiles)
            setFiles(formattedFiles as any);
        };

        fetchFiles();
    }, []);

    const handleUpload = (file: any) => {
        if (!file) return;

        // const storageRef = ref(storage, `${storageFolder}/${productId}/${file.name}`);
        // const uploadTask = uploadBytesResumable(storageRef, file);

        // uploadTask.on(
        //     'state_changed',
        //     (snapshot) => {
        //         // Track the progress
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         setProgress(progress);
        //     },
        //     (error) => {
        //         console.error('Upload failed:', error);
        //     },
        //     () => {
        //         // Upload completed successfully
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             const url = new URL(decodeURIComponent(downloadURL));
        //             const fileName = url.pathname.split('/').pop()!
        //             console.log(fileName)
        //             setUploadedFiles((prev: any) => [...prev, {name: fileName, source: downloadURL}] as any);
        //         });
        //     }
        // );
    };

    const handleRemove = async (source: any) => {
        // const url = new URL(source);
        // // const filePath = decodeURIComponent(url.pathname?.split('/').pop()!)
        // // await deleteFile(filePath);
        // setFiles((prevFiles) => prevFiles.filter((f: any) => f?.source !== source));
    };

    const onUpdateFiles = (files: FilePondFile[]) => {
        // setFiles(files as any)
        console.log(JSON.stringify(files))
    }

    useEffect(() => {
        const tempFilesFormat: Asset[] = files.map((file: FilePondFile) => {
            let storageUrl = ""
            console.log("HERE", "hello", file.source)
            if (typeof file.source === "string") {
                storageUrl = file.source
            } else {
                const justDownloadedFile = uploadedFiles.find((downloadedFile: any) => decodeURIComponent(downloadedFile.name) === file.filename)
                storageUrl = justDownloadedFile?.source || ""
                console.log("HeRE", justDownloadedFile)
                console.log("HeRE name", file.filename)
            }
            return {
                name: file.filename,
                url: storageUrl
            } as Asset
        })
        console.log("tempFiles", tempFilesFormat)
        console.log("actualFiles", files)
        // onChange(tempFilesFormat)
        console.log("uploadedFiles", uploadedFiles)
    }, [files, uploadedFiles]);
    console.log("FILEEES", files)
    return (
        <div style={{width: "100%"}}>
            <FilePond
                allowRemove={false}
                allowReplace={true}
                files={files}
                allowMultiple={true}
                maxFiles={value.length}
                onupdatefiles={onUpdateFiles}
                allowImagePreview
                allowDownloadByUrl
                acceptedFileTypes={['image/*', 'application/pdf']} // Adjust this according to your needs
                server={{
                    process: (fieldName, file, metadata, load, error, progress, abort) => {
                        setUploading(true);
                        handleUpload(file);

                        // Allow FilePond to call the necessary functions
                        load(file.name);
                        return {
                            abort: () => {
                                abort();
                            },
                        };
                    },
                    remove: (source, load, error) => {
                        // Should somehow send `source` to server so server can remove the file with this source
                        console.log("acualRemove", source)
                        handleRemove(source)
                        // load()
                        //
                        // // Can call the error method if something is wrong, should exit after
                        // error('oh my goodness');

                        // Should call the load method when done, no parameters required
                        load();
                    },
                }}
                name="file"
                labelIdle='No assets'
            />

        </div>

    );
}
