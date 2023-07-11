import { create } from "zustand";

type State = {
  addressFrom: google.maps.places.AutocompletePrediction;
  addressTo: google.maps.places.AutocompletePrediction;
};

type Actions = {
  switch: () => void;
  reset: () => void;
};

const initialState: State = {
  addressFrom: {
    description: "",
    matched_substrings: [],
    place_id: "",
    structured_formatting: {
      main_text: "",
      main_text_matched_substrings: [],
      secondary_text: "",
    },
    terms: [],
    types: [],
  },
  addressTo: {
    description: "",
    matched_substrings: [],
    place_id: "",
    structured_formatting: {
      main_text: "",
      main_text_matched_substrings: [],
      secondary_text: "",
    },
    terms: [],
    types: [],
  },
};

const useAddressStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  switch: () => {
    set((state) => ({ ...state, addressFrom: get().addressTo, addressTo: get().addressFrom }));
  },

  reset: () => {
    set(initialState);
  },
}));

export default useAddressStore;
