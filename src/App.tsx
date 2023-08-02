import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router";
import {FirstPage, FirstPageWrapper} from "./Pages/first-page";
import {LoginFormContext, MainContext, RegisterFormContext} from "./contexts";
import {InitialPage} from "./Pages/initial-page";
import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {AdminPage} from "./Pages/admin";
import {ManageDevices} from "./Pages/manage-devices";
import {ManageDevice} from "./Pages/manage-device";
import {getStorage, ref} from "firebase/storage";
import {ShowProduct} from "./Pages/show-product";

const firebaseConfig = {
    apiKey: "AIzaSyD95KPFA7TG3QepgOl8iJdUM3c9RnEM11Q",
    authDomain: "bussiness-card-bda7f.firebaseapp.com",
    projectId: "bussiness-card-bda7f",
    storageBucket: "bussiness-card-bda7f.appspot.com",
    messagingSenderId: "788931798027",
    appId: "1:788931798027:web:54941df048478186d7930e"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
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
            <MainContext.Provider value={{state, setState, db}}>
                <Routes>
                    <Route path={'/'} element={<InitialPage/>}/>
                    <Route path={'/app'} element={<FirstPageWrapper/>}/>
                    <Route path={'/admin'} element={<AdminPage/>}/>
                    <Route path={'/manage-devices'} element={<ManageDevices/>}/>
                    <Route path={'/manage-device'} element={<ManageDevice/>}/>
                    <Route path={'/show-product'} element={<ShowProduct/>}/>
                </Routes>
            </MainContext.Provider>
        </div>
    );
}

export default App;
