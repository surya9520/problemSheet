import { url } from "@/helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const submitUsers = createAsyncThunk("submitUser", async (userData) => {
  console.log("userdata1", userData);
  const { firstname, lastname, phone, email, password } = userData;

  try {
    const response = await fetch(`${url}users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        phone,
        email,
        password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Submission error:", error);
    throw error;
  }
});

export const loginUser = createAsyncThunk("loginUser", async (userData) => {
  const { email, password } = userData;
  const response = await fetch(`${url}users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Something went wrong");
  }
  let user = await response.json();
  return user;
});
export const logoutUser = createAsyncThunk("logoutUser", async () => {
  await fetch(`${url}users/logout`, {
    method: "POST",
    credentials: "include",
  });

  // Clear local storage on logout
  localStorage.removeItem("userData");
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: { name: "", email: "", phone: "", role: "" },
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(submitUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(submitUsers.fulfilled, (state, action) => {
      console.log(action.payload.firstname); // Log firstname for debugging
      if (action.payload.user) {
        const { firstname, lastname, email, phone, role } = action.payload.user;
        console.log(action.payload); // Corrected line
        state.data.name = firstname + " " + lastname;
        state.data.email = email;
        state.data.phone = phone;
        state.data.role = role;
      }
      
      localStorage.setItem("userData", JSON.stringify(state.data));
      state.isLoading = false;
    });
    
    builder.addCase(submitUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      console.log("Submission failed:", action.error.message);
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("action.payload",action.payload)
      if (action.payload) {
        const { firstname, lastname, email, phone, role } = action.payload.user;
        console.log(action.payload);
        state.data.name = firstname + " " + lastname;
        state.data.email = email;
        state.data.phone = phone;
        state.data.role = role;
      }
      console.log("Updated state data:", JSON.stringify(state));

      localStorage.setItem("userData", JSON.stringify(state.data));
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      console.log("Submission failed:", action.error.message);
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.data = { name: "", email: "", phone: "", role: "" };
    });
  },
});

export default userSlice.reducer;
