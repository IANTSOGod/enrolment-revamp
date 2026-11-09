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
  location: {
    country: null,
    region: null,
    district: null,
    commune: null,
    fokontany: null,
    address: "",
    contact: "",
  },
  idImage: null,
  eyes: { right: null, left: null },
  profiles: { left: null, right: null },
  uploadedImages: {},
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
  setLocation: (location) => set({ location }),
  setIdImage: (idImage) => set({ idImage }),
  setEyeImage: (side, image) =>
    set((state) => {
      const uploadedImages = { ...state.uploadedImages }
      delete uploadedImages[`iris-${side}`]
      return {
        eyes: { ...state.eyes, [side]: image },
        uploadedImages,
      }
    }),
  setProfileImage: (side, image) =>
    set((state) => {
      const uploadedImages = { ...state.uploadedImages }
      delete uploadedImages[`profile-${side}`]
      return {
        profiles: { ...state.profiles, [side]: image },
        uploadedImages,
      }
    }),
  setUploadedImage: (key, metadata) =>
    set((state) => ({
      uploadedImages: { ...state.uploadedImages, [key]: metadata },
    })),
  setFacialImage: (facialImage) =>
    set((state) => {
      const uploadedImages = { ...state.uploadedImages }
      delete uploadedImages.face
      return { facialImage, facialImageValidated: false, uploadedImages }
    }),
  setFacialImageValidated: (facialImageValidated) =>
    set({ facialImageValidated }),
  setInformationConfirmed: (informationConfirmed) =>
    set({ informationConfirmed }),
  setBiometricConsent: (biometricConsent) => set({ biometricConsent }),
  startEnrollment: (procedure) => set({ ...initialData, step: 1, procedure }),
  resetEnrollment: () => set({ ...initialData }),
}))
