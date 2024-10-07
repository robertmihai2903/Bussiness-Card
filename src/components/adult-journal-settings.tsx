import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {LoadingScreen, LoadingScreenContext} from "./loading-sreen";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../App";
import {Asset, BabyJournalStateContext, DB_COLLECTIONS, EditContext} from "./baby-journal-settings";
import {JOURNAL_SEGMENTS, JournalNavbar} from "./journal-navbar";
import {SaveJournalButton} from "./save-journal-button";
import {HomeAdultJournalSegment} from "./home-adult-journal-segment";
import {HealthAdultJournalSegment} from "./health-adult-journal-segment";
import {InvestigationsAdultJournalSegment} from "./investigation-adult-journal-segment";
import {ProceduresAdultJournalSegment} from "./procedures-adult-journal-segment";
import {NotSavedScreen} from "./not-saved-screen";
import {useNavigate} from "react-router";
import {getProductIdFromURL} from "../utils";
export function AdultJournalSettings() {
    const [activeSegment, setActiveSegment] = useState<JOURNAL_SEGMENTS>(JOURNAL_SEGMENTS.HOME)
    const [isLoading, setIsLoading] = useState(false)
    return <div style={{position: "relative", maxWidth: "1000px", margin: "0 auto"}}>
        <LoadingScreenContext.Provider value={{isLoading, setIsLoading}}>
            <AdultJournalStateContextProvider>
                <AdultJournalEditContextProvider>
                    <ModificationJournalContextProvider journalType={'adult'}>
                        <JournalNavbar activeSegment={activeSegment} setActiveSegment={setActiveSegment} investigations
                                       health home procedures/>
                        {isLoading && <LoadingScreen/>}
                        {activeSegment === JOURNAL_SEGMENTS.HOME && <HomeAdultJournalSegment/>}
                        {activeSegment === JOURNAL_SEGMENTS.HEALTH && <HealthAdultJournalSegment/>}
                        {activeSegment === JOURNAL_SEGMENTS.INVESTIGATIONS && <InvestigationsAdultJournalSegment/>}
                        {activeSegment === JOURNAL_SEGMENTS.PROCEDURES && <ProceduresAdultJournalSegment/>}
                        <SaveJournalButton collection={DB_COLLECTIONS.ADULT_JOURNALS}/>
                        <NotSavedScreen/>
                    </ModificationJournalContextProvider>
                </AdultJournalEditContextProvider>
            </AdultJournalStateContextProvider>
        </LoadingScreenContext.Provider>
    </div>
}

export interface Investigation {
    description: string,
    assets: Asset[]
}

export interface MultipleInvestigations {
    [key: string]: Investigation
}

const defaultInvestigation: Investigation = {
    description: "",
    assets: []
}
const defaultMultipleInvestigations: MultipleInvestigations = {}

interface AdultJournalInformation {
    profilePicture: Asset[],
    name: string,
    birthDate: string,
    gender: string,
    personalIdNumber: string,
    address: string,
    phone: string,
    medicalRecordNumber: string,
    previousConditions: string,
    medication: string,
    allergies: string,
    familyHistory: string,
    bloodPressure: string,
    pulse: string,
    temperature: string,
    respiratoryRate: string,
    generalPhysicalExamination: string,
    laboratoryTests: MultipleInvestigations,
    bloodTests: MultipleInvestigations,
    biochemistry: MultipleInvestigations,
    inflammatoryMarkers: MultipleInvestigations,
    tumorMarkers: MultipleInvestigations,
    hormonalProfiles: MultipleInvestigations,
    urineTests: MultipleInvestigations,
    stoolTests: MultipleInvestigations,
    coagulationTests: MultipleInvestigations,
    INR: MultipleInvestigations,
    xRay: MultipleInvestigations,
    ultrasound: MultipleInvestigations,
    computedTomography: MultipleInvestigations,
    magneticResonanceImaging: MultipleInvestigations,
    scintigraphy: MultipleInvestigations,
    upperDigestiveEndoscopy: MultipleInvestigations,
    colonoscopy: MultipleInvestigations,
    bronchoscopy: MultipleInvestigations,
    electrocardiogram: MultipleInvestigations,
    echocardiography: MultipleInvestigations,
    spirometry: MultipleInvestigations,
    stressTest: MultipleInvestigations,
    geneticTests: MultipleInvestigations,
    pcrTests: MultipleInvestigations,
    boneDensitometry: MultipleInvestigations,
    interdisciplinaryConsultations: string,
    recommendations: string,
    primaryDiagnosis: string,
    secondaryDiagnosis: string,
    medicationTreatment: Investigation,
    surgicalInterventions: string,
    lifestyleRecommendations: string,
    appointments: string,
    monitoringProgress: string,
    bloodType: string,
    europeanHealthCard: Asset[],
    testMultiple: MultipleInvestigations
}

const defaultInformation: AdultJournalInformation = {
    profilePicture: [],
    name: "",
    birthDate: "",
    gender: "",
    personalIdNumber: "",
    address: "",
    phone: "",
    medicalRecordNumber: "",
    previousConditions: "",
    medication: "",
    allergies: "",
    familyHistory: "",
    bloodPressure: "",
    pulse: "",
    temperature: "",
    respiratoryRate: "",
    generalPhysicalExamination: "",
    laboratoryTests: defaultMultipleInvestigations,
    bloodTests: defaultMultipleInvestigations,
    biochemistry: defaultMultipleInvestigations,
    inflammatoryMarkers: defaultMultipleInvestigations,
    tumorMarkers: defaultMultipleInvestigations,
    hormonalProfiles: defaultMultipleInvestigations,
    urineTests: defaultMultipleInvestigations,
    stoolTests: defaultMultipleInvestigations,
    coagulationTests: defaultMultipleInvestigations,
    INR: defaultMultipleInvestigations,
    xRay: defaultMultipleInvestigations,
    ultrasound: defaultMultipleInvestigations,
    computedTomography: defaultMultipleInvestigations,
    magneticResonanceImaging: defaultMultipleInvestigations,
    scintigraphy: defaultMultipleInvestigations,
    upperDigestiveEndoscopy: defaultMultipleInvestigations,
    colonoscopy: defaultMultipleInvestigations,
    bronchoscopy: defaultMultipleInvestigations,
    electrocardiogram: defaultMultipleInvestigations,
    echocardiography: defaultMultipleInvestigations,
    spirometry: defaultMultipleInvestigations,
    stressTest: defaultMultipleInvestigations,
    geneticTests: defaultMultipleInvestigations,
    pcrTests: defaultMultipleInvestigations,
    boneDensitometry: defaultMultipleInvestigations,
    interdisciplinaryConsultations: "",
    recommendations: "",
    primaryDiagnosis: "",
    secondaryDiagnosis: "",
    medicationTreatment: defaultInvestigation,
    surgicalInterventions: "",
    lifestyleRecommendations: "",
    appointments: "",
    monitoringProgress: "",
    bloodType: "",
    europeanHealthCard: [],
    testMultiple: defaultMultipleInvestigations
}

export interface InvestigationHandler {
    description: EditContext<string>,
    assets: EditContext<Asset[]>
}

interface useAdultJournalEditInterface {
    profilePicture: EditContext<Asset[]>,
    name: EditContext<string>,
    birthDate: EditContext<string>,
    gender: EditContext<string>,
    personalIdNumber: EditContext<string>,
    address: EditContext<string>,
    phone: EditContext<string>,
    medicalRecordNumber: EditContext<string>,
    previousConditions: EditContext<string>,
    medication: EditContext<string>,
    allergies: EditContext<string>,
    familyHistory: EditContext<string>,
    bloodPressure: EditContext<string>,
    pulse: EditContext<string>,
    temperature: EditContext<string>,
    respiratoryRate: EditContext<string>,
    generalPhysicalExamination: EditContext<string>,
    laboratoryTests: MultipleInvestigationsHandler,
    bloodTests: MultipleInvestigationsHandler,
    biochemistry: MultipleInvestigationsHandler,
    inflammatoryMarkers: MultipleInvestigationsHandler,
    tumorMarkers: MultipleInvestigationsHandler,
    hormonalProfiles: MultipleInvestigationsHandler,
    urineTests: MultipleInvestigationsHandler,
    stoolTests: MultipleInvestigationsHandler,
    coagulationTests: MultipleInvestigationsHandler,
    INR: MultipleInvestigationsHandler,
    xRay: MultipleInvestigationsHandler,
    ultrasound: MultipleInvestigationsHandler,
    computedTomography: MultipleInvestigationsHandler,
    magneticResonanceImaging: MultipleInvestigationsHandler,
    scintigraphy: MultipleInvestigationsHandler,
    upperDigestiveEndoscopy: MultipleInvestigationsHandler,
    colonoscopy: MultipleInvestigationsHandler,
    bronchoscopy: MultipleInvestigationsHandler,
    electrocardiogram: MultipleInvestigationsHandler,
    echocardiography: MultipleInvestigationsHandler,
    spirometry: MultipleInvestigationsHandler,
    stressTest: MultipleInvestigationsHandler,
    geneticTests: MultipleInvestigationsHandler,
    pcrTests: MultipleInvestigationsHandler,
    boneDensitometry: MultipleInvestigationsHandler,
    interdisciplinaryConsultations: EditContext<string>,
    recommendations: EditContext<string>,
    primaryDiagnosis: EditContext<string>,
    secondaryDiagnosis: EditContext<string>,
    medicationTreatment: InvestigationHandler,
    surgicalInterventions: EditContext<string>,
    lifestyleRecommendations: EditContext<string>,
    appointments: EditContext<string>,
    monitoringProgress: EditContext<string>,
    bloodType: EditContext<string>,
    europeanHealthCard: EditContext<Asset[]>,
    testMultiple: MultipleInvestigationsHandler
}

interface useAdultJournalInformation {
    originalJournalState: AdultJournalInformation
    adultJournalState: AdultJournalInformation,
    setAdultJournalState: any,
    setOriginalJournalState: any
}

export interface MultipleInvestigationsHandler {
    onDelete: (dateKey: string) => void
    onAdd: (dateKey: string) => void,
    investigations: {
        [key: string]: InvestigationHandler
    }
}

function useCreateMultipleInvestigationsHandler(field: keyof AdultJournalInformation): MultipleInvestigationsHandler {
    const {adultJournalState, setAdultJournalState} = useContext(AdultJournalStateContext)
    let tempInvestigations: { [key: string]: InvestigationHandler } = {}
    const useGetInvestigations = () => {
        return (): { [key: string]: InvestigationHandler } => {
            const keys = Object.keys(adultJournalState[field])
            tempInvestigations = {}
            keys.forEach((key: string) => {
                tempInvestigations[key] = {
                    description: {
                        value: (adultJournalState[field] as MultipleInvestigations)[key].description,
                        onChange: (description: string) => {
                            setAdultJournalState((prev: AdultJournalInformation) => ({
                                ...prev,
                                [field]: {
                                    ...(prev[field] as MultipleInvestigations),
                                    [key]: {
                                        ...(prev[field] as MultipleInvestigations)[key],
                                        description
                                    }
                                }
                            }))
                        }
                    },
                    assets: {
                        value: (adultJournalState[field] as MultipleInvestigations)[key].assets,
                        onChange: (assets: Asset[]) => {
                            setAdultJournalState((prev: AdultJournalInformation) => ({
                                ...prev,
                                [field]: {
                                    ...(prev[field] as MultipleInvestigations),
                                    [key]: {
                                        ...(prev[field] as MultipleInvestigations)[key],
                                        assets
                                    }
                                }
                            }))
                        }
                    }

                }
            })
            return tempInvestigations
        }
    }

    const onAdd = useCallback((dateKey: string) => {
        setAdultJournalState((prev: AdultJournalInformation) => ({
            ...prev,
            [field]: {
                ...(prev[field] as MultipleInvestigations),
                [dateKey]: defaultInvestigation
            }
        }))
    }, [])

    const onDelete = useCallback((dateKey: string) => {
        setAdultJournalState((prev: AdultJournalInformation) => {
            const {[dateKey]: _, ...investigationsLeft} = prev[field] as MultipleInvestigations
            return {
                ...prev,
                [field]: investigationsLeft
            }
        })
    }, [])

    const getInvestigations = useGetInvestigations()
    // console.log("Multiple, inves", investigations)
    return useMemo(() => ({
        onDelete,
        onAdd,
        investigations: getInvestigations()
    }), [onAdd, getInvestigations, onDelete])
}


function useCreateInvestigationHandler(field: keyof AdultJournalInformation): InvestigationHandler {
    const {adultJournalState, setAdultJournalState} = useContext(AdultJournalStateContext)

    return {
        description: {
            value: (adultJournalState[field] as Investigation).description,
            onChange: (description: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({
                    ...prev,
                    [field]: {...prev[field] as Investigation, description}
                }))
            }
        },
        assets: {
            value: (adultJournalState[field] as Investigation).assets,
            onChange: (assets: Asset[]) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({
                    ...prev,
                    [field]: {...prev[field] as Investigation, assets}
                }))
            }
        }
    }
}

function useAdultJournalInformation(): useAdultJournalInformation {

    const [adultJournalState, setAdultJournalState] = useState<AdultJournalInformation>(defaultInformation)
    const [originalJournalState, setOriginalJournalState] = useState<AdultJournalInformation>(defaultInformation)
    const navigate = useNavigate()
    console.log()
    const {setIsLoading} = useContext(LoadingScreenContext)

    useEffect(() => {
            (async () => {
                setIsLoading(true)
                const auth = getAuth();
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                    } else {
                        navigate('/app')
                    }
                });

                const urlParams = new URLSearchParams(window.location.search)
                const productId = urlParams.get('product_id')
                if (productId) {
                    const productRef = doc(db, DB_COLLECTIONS.ADULT_JOURNALS, productId)
                    const docSnap = await getDoc(productRef);
                    console.log(docSnap, docSnap.exists(), docSnap.data())
                    if (docSnap.exists()) {
                        setAdultJournalState((prev: AdultJournalInformation) => ({...prev, ...docSnap.data() as AdultJournalInformation}))
                        setOriginalJournalState((prev: AdultJournalInformation) => ({...prev, ...docSnap.data() as AdultJournalInformation}))
                        setIsLoading(false)
                    }
                }
            })()
            // notify(`Don't forget to save after changes`)
        }, []
    );
    console.log("ADULT Journal State", adultJournalState)
    return {originalJournalState, adultJournalState, setAdultJournalState, setOriginalJournalState}
}

function useAdultJournalEdit(): useAdultJournalEditInterface {
    const {adultJournalState, setAdultJournalState} = useContext(AdultJournalStateContext)
    return {
        profilePicture: {
            value: adultJournalState.profilePicture,
            onChange: (profilePicture: Asset[]) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, profilePicture}))
            }
        },
        name: {
            value: adultJournalState.name,
            onChange: (name: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, name}))
            }
        },
        birthDate: {
            value: adultJournalState.birthDate,
            onChange: (birthDate: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, birthDate}))
            }
        },
        gender: {
            value: adultJournalState.gender,
            onChange: (gender: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, gender}))
            }
        },
        personalIdNumber: {
            value: adultJournalState.personalIdNumber,
            onChange: (personalIdNumber: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, personalIdNumber}))
            }
        },
        address: {
            value: adultJournalState.address,
            onChange: (address: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, address}))
            }
        },
        phone: {
            value: adultJournalState.phone,
            onChange: (phone: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, phone}))
            }
        },
        medicalRecordNumber: {
            value: adultJournalState.medicalRecordNumber,
            onChange: (medicalRecordNumber: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, medicalRecordNumber}))
            }
        },
        previousConditions: {
            value: adultJournalState.previousConditions,
            onChange: (previousConditions: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, previousConditions}))
            }
        },
        medication: {
            value: adultJournalState.medication,
            onChange: (medication: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, medication}))
            }
        },
        allergies: {
            value: adultJournalState.allergies,
            onChange: (allergies: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, allergies}))
            }
        },
        familyHistory: {
            value: adultJournalState.familyHistory,
            onChange: (familyHistory: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, familyHistory}))
            }
        },
        bloodPressure: {
            value: adultJournalState.bloodPressure,
            onChange: (bloodPressure: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, bloodPressure}))
            }
        },
        pulse: {
            value: adultJournalState.pulse,
            onChange: (pulse: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, pulse}))
            }
        },
        temperature: {
            value: adultJournalState.temperature,
            onChange: (temperature: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, temperature}))
            }
        },
        respiratoryRate: {
            value: adultJournalState.respiratoryRate,
            onChange: (respiratoryRate: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, respiratoryRate}))
            }
        },
        generalPhysicalExamination: {
            value: adultJournalState.generalPhysicalExamination,
            onChange: (generalPhysicalExamination: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, generalPhysicalExamination}))
            }
        },
        laboratoryTests: useCreateMultipleInvestigationsHandler("laboratoryTests"),
        bloodTests: useCreateMultipleInvestigationsHandler("bloodTests"),
        biochemistry: useCreateMultipleInvestigationsHandler("biochemistry"),
        inflammatoryMarkers: useCreateMultipleInvestigationsHandler("inflammatoryMarkers"),
        tumorMarkers: useCreateMultipleInvestigationsHandler("tumorMarkers"),
        hormonalProfiles: useCreateMultipleInvestigationsHandler("hormonalProfiles"),
        urineTests: useCreateMultipleInvestigationsHandler("urineTests"),
        stoolTests: useCreateMultipleInvestigationsHandler("stoolTests"),
        coagulationTests: useCreateMultipleInvestigationsHandler("coagulationTests"),
        INR: useCreateMultipleInvestigationsHandler("INR"),
        xRay: useCreateMultipleInvestigationsHandler("xRay"),
        ultrasound: useCreateMultipleInvestigationsHandler("ultrasound"),
        computedTomography: useCreateMultipleInvestigationsHandler("computedTomography"),
        magneticResonanceImaging: useCreateMultipleInvestigationsHandler("magneticResonanceImaging"),
        scintigraphy: useCreateMultipleInvestigationsHandler("scintigraphy"),
        upperDigestiveEndoscopy: useCreateMultipleInvestigationsHandler("upperDigestiveEndoscopy"),
        colonoscopy: useCreateMultipleInvestigationsHandler("colonoscopy"),
        bronchoscopy: useCreateMultipleInvestigationsHandler("bronchoscopy"),
        electrocardiogram: useCreateMultipleInvestigationsHandler("electrocardiogram"),
        echocardiography: useCreateMultipleInvestigationsHandler("echocardiography"),
        spirometry: useCreateMultipleInvestigationsHandler("spirometry"),
        stressTest: useCreateMultipleInvestigationsHandler("stressTest"),
        geneticTests: useCreateMultipleInvestigationsHandler("geneticTests"),
        pcrTests: useCreateMultipleInvestigationsHandler("pcrTests"),
        boneDensitometry: useCreateMultipleInvestigationsHandler("boneDensitometry"),
        interdisciplinaryConsultations: {
            value: adultJournalState.interdisciplinaryConsultations,
            onChange: (interdisciplinaryConsultations: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, interdisciplinaryConsultations}))
            }
        },
        recommendations: {
            value: adultJournalState.recommendations,
            onChange: (recommendations: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, recommendations}))
            }
        },
        primaryDiagnosis: {
            value: adultJournalState.primaryDiagnosis,
            onChange: (primaryDiagnosis: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, primaryDiagnosis}))
            }
        },
        secondaryDiagnosis: {
            value: adultJournalState.secondaryDiagnosis,
            onChange: (secondaryDiagnosis: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, secondaryDiagnosis}))
            }
        },
        medicationTreatment: useCreateInvestigationHandler("medicationTreatment"),
        surgicalInterventions: {
            value: adultJournalState.surgicalInterventions,
            onChange: (surgicalInterventions: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, surgicalInterventions}))
            }
        },
        lifestyleRecommendations: {
            value: adultJournalState.lifestyleRecommendations,
            onChange: (lifestyleRecommendations: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, lifestyleRecommendations}))
            }
        },
        appointments: {
            value: adultJournalState.appointments,
            onChange: (appointments: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, appointments}))
            }
        },
        monitoringProgress: {
            value: adultJournalState.monitoringProgress,
            onChange: (monitoringProgress: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, monitoringProgress}))
            }
        },
        bloodType: {
            value: adultJournalState.bloodType,
            onChange: (bloodType: string) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, bloodType}))
            }
        },
        europeanHealthCard: {
            value: adultJournalState.europeanHealthCard,
            onChange: (europeanHealthCard: Asset[]) => {
                setAdultJournalState((prev: AdultJournalInformation) => ({...prev, europeanHealthCard}))
            }
        },
        testMultiple: useCreateMultipleInvestigationsHandler("testMultiple")
    }
}

export const AdultJournalEditContext = createContext<useAdultJournalEditInterface | null>(null)
export const AdultJournalStateContext = createContext<useAdultJournalInformation>({
    originalJournalState: defaultInformation,
    adultJournalState: defaultInformation,
    setAdultJournalState: () => {
    },
    setOriginalJournalState: () => {

    }
})

export function AdultJournalStateContextProvider({children}: any) {
    const value = useAdultJournalInformation()
    if (!value) return null
    return <AdultJournalStateContext.Provider value={value}>
        {children}
    </AdultJournalStateContext.Provider>
}

export function AdultJournalEditContextProvider({children}: any) {
    const value = useAdultJournalEdit()
    if (!value) return null
    return <AdultJournalEditContext.Provider value={value}>
        {children}
    </AdultJournalEditContext.Provider>
}

export const ModificationJournalContext = createContext<{
    onWantsToExit: () => void,
    onCancelExit: () => void,
    modalOpen: boolean
}>({
    onWantsToExit: () => {
    },
    onCancelExit: () => {
    },
    modalOpen: false
})

export function ModificationJournalContextProvider({journalType, children}: {
    journalType: 'baby' | 'adult'
    children: any
}) {
    const [modalOpen, setModalOpen] = useState(false)
    const {originalJournalState, adultJournalState} = useContext(AdultJournalStateContext)
    const {originalBabyJournalState, babyJournalState} = useContext(BabyJournalStateContext)
    const [actualState, setActualState] = useState({})
    const [originalState, setOriginalState] = useState({})
    useEffect(() => {
        if (journalType === 'baby') {
            setActualState(babyJournalState)
            setOriginalState(originalBabyJournalState)
        } else {
            setActualState(adultJournalState)
            setOriginalState(originalJournalState)
        }
    }, [babyJournalState, originalJournalState, adultJournalState, originalBabyJournalState]);

    const navigate = useNavigate()
    const productID = getProductIdFromURL()
    const onWantsToExit = () => {
        if (JSON.stringify(originalState) === JSON.stringify(actualState)) {
            navigate(`/manage-device?product_id=${productID}`)
        } else {
            setModalOpen(true)
        }
    }

    const onCancelExit = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // This will prompt the user with a confirmation dialog
            event.preventDefault();
            event.returnValue = ''; // Some browsers require this for the prompt to show

            if (JSON.stringify(originalState) !== JSON.stringify(actualState)) {
                console.log('Attempt to reload or close the page')
            }

        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const value = {onWantsToExit, onCancelExit, modalOpen}

    return <ModificationJournalContext.Provider value={value}>
        {children}
    </ModificationJournalContext.Provider>
}