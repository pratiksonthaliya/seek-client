import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICodeGeerationSlice { 
    generatedCode: string;
    loading: boolean;
}

const initialState:ICodeGeerationSlice = {
    generatedCode: "",
    loading: false
};

const codeGenerationSlice = createSlice({
  name: "codeGenerationSlice",
  initialState,
  reducers: {
    setGeneratedCode: (state, action:PayloadAction<string>) => {
      state.generatedCode = action.payload;
    },
    setCodeGenerationLoading: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateGeneratedCode: (state, action:PayloadAction<string>) => {
      state.generatedCode = state.generatedCode + action.payload;
    },
  },
});

export const { setGeneratedCode, setCodeGenerationLoading, updateGeneratedCode } = codeGenerationSlice.actions;
export default codeGenerationSlice.reducer;