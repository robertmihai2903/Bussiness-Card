import {createContext, useContext, useEffect, useState} from "react";
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

const defaultInvestigation: Investigation = {
    description: "",
    assets: []
}

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
    laboratoryTests: Investigation,
    bloodTests: Investigation,
    biochemistry: Investigation,
    inflammatoryMarkers: Investigation,
    tumorMarkers: Investigation,
    hormonalProfiles: Investigation,
    urineTests: Investigation,
    stoolTests: Investigation,
    coagulationTests: Investigation,
    INR: Investigation,
    xRay: Investigation,
    ultrasound: Investigation,
    computedTomography: Investigation,
    magneticResonanceImaging: Investigation,
    scintigraphy: Investigation,
    upperDigestiveEndoscopy: Investigation,
    colonoscopy: Investigation,
    bronchoscopy: Investigation,
    electrocardiogram: Investigation,
    echocardiography: Investigation,
    spirometry: Investigation,
    stressTest: Investigation,
    geneticTests: Investigation,
    pcrTests: Investigation,
    boneDensitometry: Investigation,
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
    europeanHealthCard: Asset[]
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
    laboratoryTests: defaultInvestigation,
    bloodTests: defaultInvestigation,
    biochemistry: defaultInvestigation,
    inflammatoryMarkers: defaultInvestigation,
    tumorMarkers: defaultInvestigation,
    hormonalProfiles: defaultInvestigation,
    urineTests: defaultInvestigation,
    stoolTests: defaultInvestigation,
    coagulationTests: defaultInvestigation,
    INR: defaultInvestigation,
    xRay: defaultInvestigation,
    ultrasound: defaultInvestigation,
    computedTomography: defaultInvestigation,
    magneticResonanceImaging: defaultInvestigation,
    scintigraphy: defaultInvestigation,
    upperDigestiveEndoscopy: defaultInvestigation,
    colonoscopy: defaultInvestigation,
    bronchoscopy: defaultInvestigation,
    electrocardiogram: defaultInvestigation,
    echocardiography: defaultInvestigation,
    spirometry: defaultInvestigation,
    stressTest: defaultInvestigation,
    geneticTests: defaultInvestigation,
    pcrTests: defaultInvestigation,
    boneDensitometry: defaultInvestigation,
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
    europeanHealthCard: []
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
    laboratoryTests: InvestigationHandler,
    bloodTests: InvestigationHandler,
    biochemistry: InvestigationHandler,
    inflammatoryMarkers: InvestigationHandler,
    tumorMarkers: InvestigationHandler,
    hormonalProfiles: InvestigationHandler,
    urineTests: InvestigationHandler,
    stoolTests: InvestigationHandler,
    coagulationTests: InvestigationHandler,
    INR: InvestigationHandler,
    xRay: InvestigationHandler,
    ultrasound: InvestigationHandler,
    computedTomography: InvestigationHandler,
    magneticResonanceImaging: InvestigationHandler,
    scintigraphy: InvestigationHandler,
    upperDigestiveEndoscopy: InvestigationHandler,
    colonoscopy: InvestigationHandler,
    bronchoscopy: InvestigationHandler,
    electrocardiogram: InvestigationHandler,
    echocardiography: InvestigationHandler,
    spirometry: InvestigationHandler,
    stressTest: InvestigationHandler,
    geneticTests: InvestigationHandler,
    pcrTests: InvestigationHandler,
    boneDensitometry: InvestigationHandler,
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
    europeanHealthCard: EditContext<Asset[]>
}

interface useAdultJournalInformation {
    originalJournalState: AdultJournalInformation
    adultJournalState: AdultJournalInformation,
    setAdultJournalState: any,
    setOriginalJournalState: any
}

function useCreateInvestigationHandler(field: keyof AdultJournalInformation) {
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
    console.log()
    const {setIsLoading} = useContext(LoadingScreenContext)

    useEffect(() => {
            (async () => {
                setIsLoading(true)
                const auth = getAuth();
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                    } else {
                        // navigate('/app')
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
        laboratoryTests: useCreateInvestigationHandler("laboratoryTests"),
        bloodTests: useCreateInvestigationHandler("bloodTests"),
        biochemistry: useCreateInvestigationHandler("biochemistry"),
        inflammatoryMarkers: useCreateInvestigationHandler("inflammatoryMarkers"),
        tumorMarkers: useCreateInvestigationHandler("tumorMarkers"),
        hormonalProfiles: useCreateInvestigationHandler("hormonalProfiles"),
        urineTests: useCreateInvestigationHandler("urineTests"),
        stoolTests: useCreateInvestigationHandler("stoolTests"),
        coagulationTests: useCreateInvestigationHandler("coagulationTests"),
        INR: useCreateInvestigationHandler("INR"),
        xRay: useCreateInvestigationHandler("xRay"),
        ultrasound: useCreateInvestigationHandler("ultrasound"),
        computedTomography: useCreateInvestigationHandler("computedTomography"),
        magneticResonanceImaging: useCreateInvestigationHandler("magneticResonanceImaging"),
        scintigraphy: useCreateInvestigationHandler("scintigraphy"),
        upperDigestiveEndoscopy: useCreateInvestigationHandler("upperDigestiveEndoscopy"),
        colonoscopy: useCreateInvestigationHandler("colonoscopy"),
        bronchoscopy: useCreateInvestigationHandler("bronchoscopy"),
        electrocardiogram: useCreateInvestigationHandler("electrocardiogram"),
        echocardiography: useCreateInvestigationHandler("echocardiography"),
        spirometry: useCreateInvestigationHandler("spirometry"),
        stressTest: useCreateInvestigationHandler("stressTest"),
        geneticTests: useCreateInvestigationHandler("geneticTests"),
        pcrTests: useCreateInvestigationHandler("pcrTests"),
        boneDensitometry: useCreateInvestigationHandler("boneDensitometry"),
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
        }
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