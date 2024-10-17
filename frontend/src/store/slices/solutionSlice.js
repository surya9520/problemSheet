import { url } from "@/helper"; // Import the base URL from a helper file.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Import Redux Toolkit functions.

/* 
Async thunk to fetch solutions for a given question ID. 
Dispatches pending, fulfilled, and rejected actions based on the request status.
*/
export const fetchSolutions = createAsyncThunk(
  "fetchSolutions", // Action name.
  async (questionid) => {
    const response = await fetch(`${url}api/solution`, {
      method: "GET", // Fetching solutions using a GET request.
      headers: {
        quistionid: questionid, // Pass question ID as a header.
      },
    });
    let solutions = await response.json(); // Parse the response JSON.
    return solutions; // Return the solutions as the fulfilled payload.
  }
);

/* 
Async thunk to submit a new solution.
Sends the solution data to the backend and shows alerts based on response status.
*/
export const submitSolutions = createAsyncThunk(
  "fetchSolutions", // Reuses the same action name as above.
  async (payload) => {
    const { questionId, solutionCode, language, approachName } = payload; // Destructure the payload.
    const response = await fetch(`${url}api/solution`, {
      method: "POST", // Submit solution with a POST request.
      headers: {
        "Content-Type": "application/json", // Indicate JSON payload.
      },
      body: JSON.stringify({
        questionId,
        solutionCode,
        language,
        approachName, // Send all required fields in the body.
      }),
      credentials: "include", // Include cookies with the request.
    });

    if (!response.ok) {
      alert("Something went wrong"); // Alert if the submission fails.
      return;
    } else {
      alert("Solution submitted successfully"); // Alert if the submission is successful.
    }
  }
);

/* 
Create a slice of the Redux store to manage solution-related state.
*/
const solutionSlice = createSlice({
  name: "solution", // Name of the slice.
  initialState: {
    solution: [], // Holds the fetched solutions.
    isLoading: false, // Indicates loading status.
    errors: null, // Holds any error messages.
  },
  extraReducers: (builder) => {
    // Handle pending state when fetching solutions.
    builder.addCase(fetchSolutions.pending, (state) => {
      state.isLoading = true;
      state.errors = null; // Clear previous errors.
    });

    // Handle fulfilled state when solutions are successfully fetched.
    builder.addCase(fetchSolutions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.solution = action.payload; // Store fetched solutions.
    });

    // Handle rejected state if fetching solutions fails.
    builder.addCase(fetchSolutions.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error.message; // Store the error message.
    });
  },
});

export default solutionSlice.reducer; // Export the reducer for the slice.
