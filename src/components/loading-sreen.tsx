import {CircularProgress, Stack} from "@mui/material";
import "./loading-screen.css"
import {createContext} from "react";

export function LoadingScreen() {
    return <div className={"loading-screen-container"}>
        <Stack sx={{color: '#606060'}} spacing={2} direction="row">
            <CircularProgress color="inherit"/>
        </Stack>
    </div>
}

interface LoadingContextType {
    isLoading: boolean,
    setIsLoading: any
}

export const LoadingScreenContext = createContext<LoadingContextType>({
    isLoading: false, setIsLoading: () => {
    }
})