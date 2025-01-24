import {useState} from "react";
import {JOURNAL_SEGMENTS, JournalNavbar} from "./journal-navbar";
import {LoadingScreen, LoadingScreenContext} from "./loading-sreen";

import {BabyJournalStateContextProvider} from "./baby-journal-settings";
import {HomeBabyJournalPreview} from "./home-baby-journal-preview";
import {HealthBabyJournalPreview} from "./health-baby-journal-preview";


export function BabyJournalPreview() {
    const [activeSegment, setActiveSegment] = useState<JOURNAL_SEGMENTS>(JOURNAL_SEGMENTS.HOME)
    const [isLoading, setIsLoading] = useState(false)
    return <div style={{position: "relative", maxWidth: "1000px", margin: "0 auto", width: "100vw"}}>
        <LoadingScreenContext.Provider value={{isLoading, setIsLoading}}>
            <BabyJournalStateContextProvider>
                <JournalNavbar activeSegment={activeSegment} setActiveSegment={setActiveSegment} home health preview/>
                {isLoading && <LoadingScreen/>}
                {activeSegment === JOURNAL_SEGMENTS.HOME && <HomeBabyJournalPreview/>}
                {activeSegment === JOURNAL_SEGMENTS.HEALTH && <HealthBabyJournalPreview/>}
            </BabyJournalStateContextProvider>
        </LoadingScreenContext.Provider>
    </div>
}