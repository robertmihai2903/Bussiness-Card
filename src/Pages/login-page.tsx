import {Button, Checkbox, FormControlLabel, Input, InputLabel} from "@mui/material";
import './login-page.css'
import {useCallback, useContext, useState} from "react";
import {LoginFormContext, MainContext, RegisterFormContext} from "../contexts";
import {ConfigInput} from "../components/config-input";
import {useLogin, useRegisterForm} from "../forms";
import {stat} from "fs";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {useNavigate} from "react-router";
import Logo from "../assets/flexpayz-logo.svg";
export function FirstPageWrapper() {
    const loginForm = useLogin()
    const registerForm = useRegisterForm()
    return (<LoginFormContext.Provider value={loginForm}>
        <RegisterFormContext.Provider value={registerForm}>
            <LoginPage/>
        </RegisterFormContext.Provider>
    </LoginFormContext.Provider>)
}

export function LoginPage() {
    const [hasAccount, setHasAccount] = useState(true)
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const {state, setState} = useContext(MainContext)
    const {db} = useContext(MainContext)
    const {email: emailLog, password: passwordLog} = useContext(LoginFormContext)
    const {email, password, confirmPassword, country} = useContext(RegisterFormContext)
    const navigate = useNavigate()

    const isLoginDisabled = state.invalidFields.has('emailLog') || state.invalidFields.has('passwordLog')
    const isRegisterDisabled = state.invalidFields.has('email') || state.invalidFields.has('password') || state.invalidFields.has('confirmPassword') || state.invalidFields.has('country') || !acceptedTerms

    const registerUser = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then(async (userCredential) => {
                const newDoc = await setDoc(doc(db, 'users', userCredential.user.uid), {
                    country: country.value,
                    products: []
                })
                navigate('/manage-devices')
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
    return (<div className={"page-login"}>
        {hasAccount && <div className={"modal-login"}>
            <img src={Logo} alt={'logo'} className={'flexpayz-logo'}/>
            <ConfigInput label={"Email"} value={emailLog.value} onChange={emailLog.onChange}
                         error={emailLog.error}></ConfigInput>
            <ConfigInput label={'Password'} value={passwordLog.value} onChange={passwordLog.onChange}
                         error={passwordLog.error}></ConfigInput>
            <button className={'button-login'} onClick={logInUser} disabled={isLoginDisabled}>Log in</button>
            <div className={'no-account'} onClick={() => {
                setHasAccount(false)
            }}>Don't have account?
            </div>
        </div>}
        {!hasAccount && <div className={"modal-login"}>
            <img src={Logo} alt={'logo'} className={'flexpayz-logo'}/>
            <ConfigInput label={"Email"} value={email.value} onChange={email.onChange}
                         error={email.error}></ConfigInput>
            <ConfigInput label={"Password"} value={password.value} onChange={password.onChange}
                         error={password.error}></ConfigInput>
            <ConfigInput label={"Confirm Password"} value={confirmPassword.value} onChange={confirmPassword.onChange}
                         error={confirmPassword.error}></ConfigInput>
            <ConfigInput label={"Country"} value={country.value} onChange={country.onChange}
                         error={country.error}></ConfigInput>
            {/*<heckbox checked={acceptedTerms} onChange={() => {*/}
            {/*    setAcceptedTerms((prev: boolean) => !prev)}>*/}
            <div>
                <input type={'checkbox'} checked={acceptedTerms} onChange={() => {
                    setAcceptedTerms((prev: boolean) => !prev)
                }}/>
                <span className={'terms-text'}>I accept Flex Payz Terms of Service</span>
            </div>
            <button className={'button-signup'} onClick={registerUser} disabled={isRegisterDisabled}>Sign in</button>
            <div className={'no-account'} onClick={() => {
                setHasAccount(true)
            }}>Already have an account?
            </div>
        </div>}


    </div>)
}