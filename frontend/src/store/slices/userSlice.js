import { url } from "@/helper"; // Import the base API URL from a helper file.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Import Redux Toolkit functions.

/**
 * Async thunk for submitting user data to the signup API.
 * It sends user data to the backend and handles success or error responses.
 */
export const submitUsers = createAsyncThunk("submitUser", async (userData) => {
  console.log("userdata1", userData); // Log the user data for debugging.
  const { firstname, lastname, phone, email, password } = userData;

  try {
    const response = await fetch(`${url}users/signup`, {
      method: "POST", // Use POST request for creating a new user.
      headers: {
        "Content-Type": "application/json", // Send data in JSON format.
      },
      body: JSON.stringify({
        firstname,
        lastname,
        phone,
        email,
        password, // Send user details in the request body.
      }),
      credentials: "include", // Include cookies in the request.
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse error message from the response.
      throw new Error(errorData.msg || "Something went wrong"); // Throw an error if the request fails.
    }
    const data = await response.json(); // Parse the successful response.
    return data; // Return the user data on success.
  } catch (error) {
    console.log("Submission error:", error); // Log any errors.
    throw error; // Re-throw the error for Redux to handle.
  }
});

/**
 * Async thunk for logging in a user.
 * It sends email and password to the login API and retrieves user details on success.
 */
export const loginUser = createAsyncThunk("loginUser", async (userData) => {
  const { email, password } = userData;
  const response = await fetch(`${url}users/login`, {
    method: "POST", // Use POST for authentication.
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }), // Send credentials in the body.
    credentials: "include", // Include cookies for session management.
  });

  if (!response.ok) {
    const errorData = await response.json(); // Parse the error response.
    throw new Error(errorData.msg || "Something went wrong"); // Throw an error if login fails.
  }
  let user = await response.json(); // Parse the user data on success.
  return user; // Return the user details.
});

/**
 * Async thunk for logging out a user.
 * It sends a POST request to the logout API and clears user data from localStorage.
 */
export const logoutUser = createAsyncThunk("logoutUser", async () => {
  await fetch(`${url}users/logout`, {
    method: "POST", // Logout request with POST.
    credentials: "include", // Include cookies to clear the session.
  });

  // Clear local storage on successful logout.
  localStorage.removeItem("userData");
});

/**
 * Create a slice for user-related state management.
 * This slice handles user signup, login, and logout actions.
 */
const userSlice = createSlice({
  name: "user", // Name of the slice.
  initialState: {
    data: { name: "", email: "", phone: "", role: "" }, // Initial user data.
    isLoading: false, // Indicates if a request is in progress.
    error: null, // Holds any error messages.
  },
  extraReducers: (builder) => {
    // Handle pending state for submitUsers.
    builder.addCase(submitUsers.pending, (state) => {
      state.isLoading = true; // Set loading state to true.
    });

    // Handle fulfilled state for submitUsers.
    builder.addCase(submitUsers.fulfilled, (state, action) => {
      console.log(action.payload.firstname); // Log firstname for debugging.
      if (action.payload.user) {
        const { firstname, lastname, email, phone, role } = action.payload.user; // Extract user details.
        console.log(action.payload); // Log the entire payload.
        state.data.name = `${firstname} ${lastname}`; // Update user name.
        state.data.email = email;
        state.data.phone = phone;
        state.data.role = role;
      }

      localStorage.setItem("userData", JSON.stringify(state.data)); // Save user data in localStorage.
      state.isLoading = false; // Set loading state to false.
    });

    // Handle rejected state for submitUsers.
    builder.addCase(submitUsers.rejected, (state, action) => {
      state.isLoading = false; // Set loading state to false.
      state.error = action.error.message; // Store the error message.
      console.log("Submission failed:", action.error.message); // Log the error.
    });

    // Handle pending state for loginUser.
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true; // Set loading state to true.
    });

    // Handle fulfilled state for loginUser.
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("action.payload", action.payload); // Log payload for debugging.
      if (action.payload) {
        const { firstname, lastname, email, phone, role } = action.payload.user; // Extract user details.
        console.log(action.payload); // Log the entire payload.
        state.data.name = `${firstname} ${lastname}`; // Update user name.
        state.data.email = email;
        state.data.phone = phone;
        state.data.role = role;
      }
      console.log("Updated state data:", JSON.stringify(state)); // Log updated state.

      localStorage.setItem("userData", JSON.stringify(state.data)); // Save user data in localStorage.
      state.isLoading = false; // Set loading state to false.
    });

    // Handle rejected state for loginUser.
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false; // Set loading state to false.
      state.error = action.error.message; // Store the error message.
      console.log("Submission failed:", action.error.message); // Log the error.
    });

    // Handle fulfilled state for logoutUser.
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.data = { name: "", email: "", phone: "", role: "" }; // Clear user data.
    });
  },
});

export default userSlice.reducer; // Export the reducer.
