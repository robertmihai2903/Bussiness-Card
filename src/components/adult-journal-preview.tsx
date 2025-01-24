import {useState} from "react";
import {JOURNAL_SEGMENTS, JournalNavbar} from "./journal-navbar";
import {LoadingScreen, LoadingScreenContext} from "./loading-sreen";
import {AdultJournalStateContextProvider,} from "./adult-journal-settings";
import {HomeAdultJournalPreview} from "./home-adult-journal-preview";
import {HealthAdultJournalPreview} from "./health-adult-journal-preview";
import {ProceduresAdultJournalPreview} from "./procedures-adult-journal-previex";
import { InvestigationsAdultJournalPreview } from "./investigations-adult-journal-preview";

export function AdultJournalPreview() {
    const [activeSegment, setActiveSegment] = useState<JOURNAL_SEGMENTS>(JOURNAL_SEGMENTS.HOME)
    const [isLoading, setIsLoading] = useState(false)
    return <div style={{position: "relative", maxWidth: "1000px", margin: "0 auto", width: "100vw"}}>
        <LoadingScreenContext.Provider value={{isLoading, setIsLoading}}>
            <AdultJournalStateContextProvider>
                <JournalNavbar activeSegment={activeSegment} setActiveSegment={setActiveSegment} investigations
                               health home procedures preview/>
                {isLoading && <LoadingScreen/>}
                {activeSegment === JOURNAL_SEGMENTS.HOME && <HomeAdultJournalPreview/>}
                {activeSegment === JOURNAL_SEGMENTS.HEALTH && <HealthAdultJournalPreview/>}
                {activeSegment === JOURNAL_SEGMENTS.INVESTIGATIONS && <InvestigationsAdultJournalPreview/>}
                {activeSegment === JOURNAL_SEGMENTS.PROCEDURES && <ProceduresAdultJournalPreview/>}
            </AdultJournalStateContextProvider>
        </LoadingScreenContext.Provider>
    </div>
}