import { create } from "zustand"

const initialData: EnrollmentData = {
  step: 0,
  procedure: null,
  identify: {
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    nomMere: "",
    nomPere: "",
  },
  idImage: null,
  eyes: { right: null, left: null },
  profiles: { left: null, right: null },
  facialImage: null,
  facialImageValidated: false,
  informationConfirmed: false,
  biometricConsent: false,
}
export const useEnrollmentStore = create<EnrollmentStore>((set) => ({
  ...initialData,
  setStep: (step) => set({ step }),
  setProcedure: (procedure) => set({ procedure }),
  setIdentify: (identify) => set({ identify }),
  setIdImage: (idImage) => set({ idImage }),
  setEyeImage: (side, image) =>
    set((state) => ({ eyes: { ...state.eyes, [side]: image } })),
  setProfileImage: (side, image) =>
    set((state) => ({ profiles: { ...state.profiles, [side]: image } })),
  setFacialImage: (facialImage) =>
    set({ facialImage, facialImageValidated: false }),
  setFacialImageValidated: (facialImageValidated) =>
    set({ facialImageValidated }),
  setInformationConfirmed: (informationConfirmed) =>
    set({ informationConfirmed }),
  setBiometricConsent: (biometricConsent) => set({ biometricConsent }),
  startEnrollment: (procedure) => set({ ...initialData, step: 1, procedure }),
  resetEnrollment: () => set({ ...initialData }),
}))
