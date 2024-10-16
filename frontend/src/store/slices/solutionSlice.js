import { url } from "@/helper";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSolutions = createAsyncThunk(
  "fetchSolutions",
  async (questionid) => {
    const response = await fetch(`${url}api/solution`, {
      method: "GET",
      headers: {
        quistionid: questionid,
      },
    });
    let solutions = await response.json();
    return solutions;
  }
);
export const submitSolutions = createAsyncThunk(
  "fetchSolutions",
  async (payload) => {
    const { questionId, solutionCode, language,approachName } = payload;
    const response = await fetch(`${url}api/solution`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        questionId,
        solutionCode,
        language,
        approachName
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Something went wrong"); 
    }
    else{
        alert("solution submitted sucessfully")
    }
  }
);

const solutionSlice = createSlice({
  name: "solution",
  initialState: {
    solution: [],
    isLoading: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSolutions.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(fetchSolutions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.solution = action.payload;
    });
    builder.addCase(fetchSolutions.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error.message;
    });
  },
});

export default solutionSlice.reducer;
