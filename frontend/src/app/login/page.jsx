"use client"; // Enables client-side rendering in Next.js

import { loginUser } from "@/store/slices/userSlice"; // Import Redux action
import { useRouter } from "next/navigation"; // Router hook for programmatic navigation
import { useForm } from "react-hook-form"; // React Hook Form for form handling
import { useDispatch } from "react-redux"; // Redux hook to dispatch actions

const Login = () => {
    const dispatch = useDispatch(); // Initialize Redux dispatch function
    const router = useRouter(); // Initialize router for navigation

    // Initialize React Hook Form with default values and error tracking
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '', // Default value for email input
            password: '' // Default value for password input
        }
    });

    // Handle form submission errors
    const onError = (error) => {
        console.log(error); // Log errors for debugging
    };

    // Handle successful form submission
    const onSubmit = async (formData) => {
        try {
            // Dispatch login action and wait for it to complete
            await dispatch(loginUser(formData)).unwrap();
            // Navigate to home page on success
            router.push('/');
        } catch (error) {
            alert(error.message); // Log any errors
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Login form container */}
            <div className="bg-white rounded-lg shadow-lg p-10 w-1/2">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h1>

                {/* Form submission using handleSubmit */}
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    {/* Email input field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="text"
                            id="email"
                            className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.email ? "focus:ring-red-400" : "focus:ring-blue-400"
                            } ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your email"
                            {...register('email', {
                                required: {
                                    value: true, // Make email required
                                    message: "Email is required" // Error message if empty
                                },
                                pattern: {
                                    value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, // Email pattern
                                    message: "Please enter a valid email", // Error message for invalid pattern
                                }
                            })}
                        />
                        <p className="text-red-500 text-xs mb-3">{errors.email?.message}</p> {/* Email error message */}
                    </div>

                    {/* Password input field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.password ? "focus:ring-red-400" : "focus:ring-blue-400"
                            } ${errors.password ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your password"
                            {...register('password', {
                                required: {
                                    value: true, // Make password required
                                    message: "Password is required" // Error message if empty
                                }
                            })}
                        />
                        <p className="text-red-500 text-xs mb-3">{errors.password?.message}</p> {/* Password error message */}
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="bg-blue-600 text-white p-3 w-full mt-4 rounded-lg hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </form>

                {/* Links for signup, forgot password, and change password */}
                <div className="mt-4 text-center text-gray-600">
                    <p>
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-600 font-semibold hover:underline">
                            Sign Up
                        </a>
                    </p>
                    <p>
                        <span onClick={(e)=>{router.push('/forgetPassword')}} className="text-sm text-blue-600 font-semibold hover:cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </p>
                    <p>
                        <span onClick={(e)=>{router.push('/changePassword')}}  className="text-sm text-blue-600 font-semibold hover:cursor-pointer hover:underline">
                            Change Password
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
