import {createContext} from "react";
import {defaultProduct, Product} from "./control-state";

export const MainContext = createContext<any>({})
export const LoginFormContext = createContext<any>({})
export const RegisterFormContext = createContext<any>({})
export const ManageProductContext = createContext<{ productState: Product, setProductState: any, invalidFields:any }>({productState: defaultProduct, setProductState: undefined, invalidFields: undefined})

