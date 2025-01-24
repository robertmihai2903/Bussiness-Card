import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Define the type for each file object
export interface FileProps {
    url: string;
    type: 'image' | 'pdf';
}

// Define the props for the MediaViewer component
interface MediaViewerProps {
    files: FileProps[];
}

const MediaViewer: React.FC<MediaViewerProps> = ({ files }) => {
    return (
        <div style={styles.container}>
            {files.map((file, index) => (
                <div key={index} style={styles.mediaContainer}>
                    {file.type === 'image' ? (
                        <div style={styles.imageWrapper}>
                            <img
                                src={file.url}
                                alt={`media-${index}`}
                                style={styles.image}
                            />
                            <a href={file.url} download style={styles.downloadButton}>
                                Download Image
                            </a>
                        </div>
                    ) : file.type === 'pdf' ? (
                        <div style={styles.pdfWrapper}>
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={file.url} />
                            </Worker>
                            <a href={file.url} download style={styles.downloadButton}>
                                Download PDF
                            </a>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '20px',
        padding: '20px',
        maxWidth: '100%',
    },
    mediaContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
    },
    imageWrapper: {
        width: '100%',
        textAlign: 'center' as 'center',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    pdfWrapper: {
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    downloadButton: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none' as 'none',
    },
};

export default MediaViewer;
