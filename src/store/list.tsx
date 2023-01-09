import create from "zustand";
import { immer } from "zustand/middleware/immer";

export type State = {
  currentStep: number;
  formIsValid: boolean;
  formValue: {
    authorId: number;
    listName: string;
    dueDate: Date;
    belongsToUser: boolean;
  };
};

export type Actions = {
  setNextStep: () => void;
  setStep: (step: number) => void;
  setListName: (listName: string) => void;
  setDueDate: (dueDate: Date) => void;
  setBelongsToUser: (belongsToUser: boolean) => void;
  setFormIsValid: (isValid: boolean) => void;
};

export const useCreateListStore = create(
  immer<State & Actions>((set) => ({
    currentStep: 1,
    formIsValid: false,
    formValue: {
      authorId: 1,
      listName: "",
      dueDate: new Date(),
      belongsToUser: false,
    },
    setNextStep: () =>
      set((state) => {
        state.currentStep = state.currentStep += 1;
      }),
    setStep: (step: number) =>
      set((state) => {
        state.currentStep = step;
      }),
    setListName: (listName: string) =>
      set((state) => {
        state.formValue.listName = listName;
      }),
    setDueDate: (dueDate: Date) =>
      set((state) => {
        state.formValue.dueDate = dueDate;
      }),
    setBelongsToUser: (belongsToUser: boolean) =>
      set((state) => {
        state.formValue.belongsToUser = belongsToUser;
      }),
    setFormIsValid: (isValid: boolean) =>
      set((state) => {
        state.formIsValid = isValid;
      }),
  }))
);
