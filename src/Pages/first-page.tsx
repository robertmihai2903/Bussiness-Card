import {Button, Input, InputLabel} from "@mui/material";
import './first-page.css'
import {useCallback, useContext, useState} from "react";
import {LoginFormContext, MainContext, RegisterFormContext} from "../contexts";
import {ConfigInput} from "../components/config-input";
import {useLogin, useRegisterForm} from "../forms";
import {stat} from "fs";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {useNavigate} from "react-router";
export function FirstPageWrapper() {
    const loginForm = useLogin()
    const registerForm = useRegisterForm()
    return (<LoginFormContext.Provider value={loginForm}>
        <RegisterFormContext.Provider value={registerForm}>
            <FirstPage/>
        </RegisterFormContext.Provider>
    </LoginFormContext.Provider>)
}

export function FirstPage() {
    const [hasAccount, setHasAccount] = useState(true)
    const {state, setState} = useContext(MainContext)
    const {db} = useContext(MainContext)
    const {email: emailLog, password: passwordLog} = useContext(LoginFormContext)
    const {email, password, confirmPassword, country} = useContext(RegisterFormContext)
    const navigate = useNavigate()

    const isLoginDisabled = state.invalidFields.has('emailLog') || state.invalidFields.has('passwordLog')
    const isRegisterDisabled = state.invalidFields.has('email') || state.invalidFields.has('password') || state.invalidFields.has('confirmPassword') || state.invalidFields.has('country')

    const registerUser = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then(async (userCredential) => {
                const newDoc = await setDoc(doc(db, 'users', userCredential.user.uid), {
                    country: country.value,
                    products: []
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });

    }

    const logInUser = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailLog.value, passwordLog.value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setState((prev: any) => ({...prev, userId: userCredential.user.uid}))
                navigate('/manage-devices')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }
    return (<div className={"page"}>
        {hasAccount && <div className={"modal"}>

            <ConfigInput label={"Email"} value={emailLog.value} onChange={emailLog.onChange}
                         error={emailLog.error}></ConfigInput>
            <ConfigInput label={'Password'} value={passwordLog.value} onChange={passwordLog.onChange}
                         error={passwordLog.error}></ConfigInput>
            <Button onClick={logInUser} disabled={isLoginDisabled}>Log in</Button>
            <Button onClick={() => {
                setHasAccount(false)
            }}>Don't have account? </Button>
        </div>}
        {!hasAccount && <div className={"modal"}>
            <ConfigInput label={"Email"} value={email.value} onChange={email.onChange}
                         error={email.error}></ConfigInput>
            <ConfigInput label={"Password"} value={password.value} onChange={password.onChange}
                         error={password.error}></ConfigInput>
            <ConfigInput label={"Confirm Password"} value={confirmPassword.value} onChange={confirmPassword.onChange}
                         error={confirmPassword.error}></ConfigInput>
            <ConfigInput label={"Country"} value={country.value} onChange={country.onChange}
                         error={country.error}></ConfigInput>

            <Button onClick={registerUser} disabled={isRegisterDisabled}>Sign in</Button>
            <Button onClick={() => {
                setHasAccount(true)
            }}>Already have account?</Button>
        </div>}


    </div>)
}