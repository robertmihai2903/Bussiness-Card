import {Asset} from "../baby-journal-settings";
import {Investigation, MultipleInvestigations} from "../adult-journal-settings";

interface VitalSignsConfig {
    bloodPressure: string,
    pulse: string,
    temperature: string,
    respiratoryRate: string,
}

interface MultipleConfig<T> {
    [key: string]: T
}

interface config {
    profilePicture: Asset[],
    name: string,
    birthDate: string,
    gender: string,
    personalIdNumber: string,
    address: string,
    phone: string,
    medicalRecordNumber: string,
    bloodType: string,
    previousConditions: string,
    medication: string,
    allergies: string,
    familyHistory: string,
    europeanHealthCard: Asset[],
    vitalSigns: MultipleConfig<VitalSignsConfig>
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
    consultations: MultipleConfig<{
        interdisciplinaryConsultations: string,
        recommendations: string,
    }>
    diagnosis: MultipleConfig<{
        primaryDiagnosis: string,
        secondaryDiagnosis: string,
    }>
    treatmentPlan: MultipleConfig<{
        medicationTreatment: Investigation,
        surgicalInterventions: string,
        lifestyleRecommendations: string,
    }>
    followUp: MultipleConfig<{
        appointments: string,
        monitoringProgress: string,
    }>

    testMultiple: MultipleInvestigations
}