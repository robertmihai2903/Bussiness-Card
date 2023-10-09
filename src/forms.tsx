import { useContext, useEffect, useState } from "react";
import {MainContext} from "./contexts";


export function validate(setState:any, fieldId:any, fieldValue:any, validators:any) {
    for (const validator of validators) {
        const [valid, errorMessage] = validator(fieldValue);

        if (!valid) {
            setState((prev: any) => {
                const invalidFields = new Map(prev.invalidFields);
                invalidFields.set(fieldId, errorMessage);
                return { ...prev, invalidFields };
            });
            return;
        }
    }
    setState((prev:any) => {
        const invalidFields = new Map(prev.invalidFields);
        invalidFields.delete(fieldId);
        return { ...prev, invalidFields };
    });
}

const Fields = {
    Email: "email",
    Password: "password",
    ConfirmPassword: "confirmPassword",
    Country: "country",
    PasswordLog: "passwordLog",
    EmailLog: 'emailLog',


};

export function required(value:any) {
    const valid = !!value;
    return [valid, valid ? "" : "Field is required!"];
}

const minThreeLetters = (value: string) => {
    const valid = value.length >= 3;
    return [valid, valid ? "" : "Minimum 3 letters!"];
};

// const emailValidation = (value) => {
//   var mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const valid = value.match(mailFormat);
//   return [
//     valid,
//     valid ? "" : "Câmpul trebuie să fie de tipul exemplu@exemplu.exemplu!",
//   ];
// };

const phoneValidation = (value: any) => {
    const phoneFormat =
        /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
    const valid = value.match(phoneFormat);
    return [valid, valid ? "" : "Phone format is wrong!"];
};

export function useRegisterForm() {
    const { state, setState } = useContext(MainContext);

    const sameAsPassword = (value:any) => {
        const valid = value === state.register.password;
        return [valid, valid ? "" : "It has to match password!"];
    };

    useEffect(() => {
        validate(setState, Fields.Email, state.register?.email, [required]);
        validate(setState, Fields.Password, state.register?.password, [required]);
        validate(setState, Fields.Password, state.register?.confirmPassword, [required]);
        validate(setState, Fields.Password, state.register?.country, [required]);
    }, []);

    return {
        [Fields.Email]: {
            value: state.register?.email,
            onChange: (email: string) => {
                validate(setState, Fields.Email, email, [required]);
                setState((prev: any) => {
                    return { ...prev, register: { ...prev.register, email } };
                });
                console.log(state.invalidFields);
            },
            error: state.invalidFields.get(Fields.Email),
        },
        [Fields.Password]: {
            value: state.register?.password,
            onChange: (password: string) => {
                validate(setState, Fields.Password, password, [required, minThreeLetters]);
                setState((prev:any) => {
                    return { ...prev, register: { ...prev.register, password } };
                });
            },
            error: state.invalidFields.get(Fields.Password),
        },

        [Fields.ConfirmPassword]: {
            value: state.register?.confirmPassword,
            onChange: (confirmPassword: any) => {
                validate(setState, Fields.ConfirmPassword, confirmPassword, [
                    required,
                    sameAsPassword,
                ]);
                setState((prev: any) => {
                    return { ...prev, register: { ...prev.register, confirmPassword } };
                });
            },
            error: state.invalidFields.get(Fields.ConfirmPassword),
        },
        [Fields.Country]: {
            value: state.register?.country,
            onChange: (country: string) => {
                validate(setState, Fields.Country, country, [required]);
                setState((prev: any) => {
                    return { ...prev, register: { ...prev.register, country } };
                });
            },
            error: state.invalidFields.get(Fields.Country),
        },
    };
}

export function useLogin() {
    const { state, setState } = useContext(MainContext);

    useEffect(() => {
        validate(setState, Fields.EmailLog, state.login?.email, [required]);
        validate(setState, Fields.PasswordLog, state.login?.password, [required]);
    }, []);
    return {
        [Fields.Email]: {
            value: state.login?.email,
            onChange: (email: string) => {
                validate(setState, Fields.EmailLog, email, [required]);
                setState((prev: any) => {
                    return { ...prev, login: { ...prev.login, email } };
                });
                console.log(state.invalidFields);
            },
            error: state.invalidFields.get(Fields.EmailLog),
        },
        [Fields.Password]: {
            value: state.login?.password,
            onChange: (password: string) => {
                validate(setState, Fields.PasswordLog, password, [required]);
                setState((prev: any) => {
                    return { ...prev, login: { ...prev.login, password } };
                });
            },
            error: state.invalidFields.get(Fields.PasswordLog),
        },

    };
}
