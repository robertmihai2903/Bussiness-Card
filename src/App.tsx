import React, {useState} from 'react';
import './App.css';
import './Pages/basic.css';
import {Route, Routes} from "react-router";
import {LoginPage, FirstPageWrapper} from "./Pages/login-page";
import {LoginFormContext, MainContext, RegisterFormContext} from "./contexts";
import {InitialPage} from "./Pages/initial-page";
import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {AdminPage} from "./Pages/admin";
import {ManageDevices} from "./Pages/manage-devices";
import {ManageDevice} from "./Pages/manage-device";
import {getStorage, ref} from "firebase/storage";
import {ShowProduct} from "./Pages/show-product";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {BusinessSettings} from "./components/business-settings";
import {CustomLinkSettings} from "./components/custom-link-settings";
import {UploadFileSettings} from "./components/upload-file-settings";
import {UploadVideoSettings} from "./components/upload-video-settings";
import {UploadSongsSettings} from "./components/upload-songs-settings";
import {SharedContacts} from "./components/shared-contacts";

const firebaseConfig = {
    apiKey: "AIzaSyD95KPFA7TG3QepgOl8iJdUM3c9RnEM11Q",
    authDomain: "bussiness-card-bda7f.firebaseapp.com",
    projectId: "bussiness-card-bda7f",
    storageBucket: "bussiness-card-bda7f.appspot.com",
    messagingSenderId: "788931798027",
    appId: "1:788931798027:web:54941df048478186d7930e"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app)


const defaultState: any = {
    login: {email: "", password: ""},
    register: {email: "", password: "", confirmPassword: "", country: ""},
    userId: "",
    invalidFields: new Map()
}

function App() {
    const [state, setState] = useState(defaultState)

    return (
        <div className="App">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
            <MainContext.Provider value={{state, setState, db}}>
                <Routes>
                    <Route path={'/'} element={<InitialPage/>}/>
                    <Route path={'/app'} element={<FirstPageWrapper/>}/>
                    <Route path={'/admin'} element={<AdminPage/>}/>
                    <Route path={'/manage-devices'} element={<ManageDevices/>}/>
                    <Route path={'/manage-device'} element={<ManageDevice/>}/>
                    <Route path={'/manage-device/business-card'} element={<BusinessSettings/>}/>
                    <Route path={'/manage-device/custom-link'} element={<CustomLinkSettings/>}/>
                    <Route path={'/manage-device/upload-files'} element={<UploadFileSettings/>}/>
                    <Route path={'/manage-device/upload-video'} element={<UploadVideoSettings/>}/>
                    <Route path={'/manage-device/upload-songs'} element={<UploadSongsSettings/>}/>
                    <Route path={'/manage-device/shared-contacts'} element={<SharedContacts/>}/>
                    <Route path={'/show-product'} element={<ShowProduct/>}/>
                </Routes>
            </MainContext.Provider>
            <ToastContainer />
        </div>
    );
}

export default App;
