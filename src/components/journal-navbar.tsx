import {useCallback, useContext, useState} from "react";
import classNames from "classnames";
import {JNavbarHomeIcon} from "../assets/j-navbar-home-icon";
import {JNavbarInvestigationsIcon} from "../assets/j-navbar-investigations-icon";
import {JNavbarHealthIcon} from "../assets/j-navbar-health-icon";
import {JNavbarProceduresIcon} from "../assets/j-navbar-procedures-icon";
import "./journal-navbar.css"
import {JNavbarBackIcon} from "../assets/j-navbar-back-icon";
import {ModificationJournalContext} from "./adult-journal-settings";

export enum JOURNAL_SEGMENTS {
    HOME = 'home-segment',
    INVESTIGATIONS = 'investigations-segment',
    HEALTH = 'health-segment',
    PROCEDURES = 'procedures-segment'
}

interface JournalNavbarProps {
    activeSegment: JOURNAL_SEGMENTS
    setActiveSegment: any
    home?: boolean,
    investigations?: boolean,
    health?: boolean,
    procedures?: boolean,
    preview?: boolean
}

function JournalGoBackButton() {
    const {onWantsToExit} = useContext(ModificationJournalContext)
    const [active, setActive] = useState(false)
    const onGoBack = async () => {
        setActive(true)
        onWantsToExit()
        setTimeout(() => {
            setActive(false)
        }, 500)
    }
    return <div onClick={onGoBack}
                className={classNames("j-navbar-segment-wrapper")}>
        <JNavbarBackIcon color={active ? "#000" : "#606060"} className={"j-navbar-icon"}/>
        <p className={"j-navbar-label"}>Go Back</p>
    </div>
}

export function JournalNavbar({
                                  activeSegment,
                                  setActiveSegment,
                                  home,
                                  health,
                                  investigations,
                                  procedures,
                                  preview
                              }: JournalNavbarProps) {
    const getChangeSegment = (segment: JOURNAL_SEGMENTS) => {
        return (e: any) => {
            setActiveSegment(segment)
        }
    }
    return <div className={'j-navbar-container'}>
        {!preview && <JournalGoBackButton/>}
        {home && <div
            className={classNames("j-navbar-segment-wrapper", activeSegment === JOURNAL_SEGMENTS.HOME && "j-navbar-active-segment")}
            onClick={getChangeSegment(JOURNAL_SEGMENTS.HOME)}>
            <JNavbarHomeIcon color={activeSegment === JOURNAL_SEGMENTS.HOME ? "#000" : "#606060"}
                             className={"j-navbar-icon"}/>
            <p className={"j-navbar-label"}>Home</p>
        </div>}
        {investigations && <div
            className={classNames("j-navbar-segment-wrapper", activeSegment === JOURNAL_SEGMENTS.INVESTIGATIONS && "j-navbar-active-segment")}
            onClick={getChangeSegment(JOURNAL_SEGMENTS.INVESTIGATIONS)}>
            <JNavbarInvestigationsIcon color={activeSegment === JOURNAL_SEGMENTS.INVESTIGATIONS ? "#000" : "#606060"}
                                       className={"j-navbar-icon"}/>
            <p className={"j-navbar-label"}>Investigations</p>
        </div>}
        {health && <div
            className={classNames("j-navbar-segment-wrapper", activeSegment === JOURNAL_SEGMENTS.HEALTH && "j-navbar-active-segment")}
            onClick={getChangeSegment(JOURNAL_SEGMENTS.HEALTH)}>
            <JNavbarHealthIcon color={activeSegment === JOURNAL_SEGMENTS.HEALTH ? "#000" : "#606060"}
                               className={"j-navbar-icon"}/>
            <p className={"j-navbar-label"}>Health</p>
        </div>}
        {procedures && <div
            className={classNames("j-navbar-segment-wrapper", activeSegment === JOURNAL_SEGMENTS.PROCEDURES && "j-navbar-active-segment")}
            onClick={getChangeSegment(JOURNAL_SEGMENTS.PROCEDURES)}>
            <JNavbarProceduresIcon color={activeSegment === JOURNAL_SEGMENTS.PROCEDURES ? "#000" : "#606060"}
                                   className={"j-navbar-icon"}/>
            <p className={"j-navbar-label"}>Procedures</p>
        </div>}
    </div>
}