"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
        },
    });

    const onError = (errors) => {
        console.log(errors);
    };

    const onSubmit = async (formData) => {
        // Implement your password reset logic here (e.g., API call)
        console.log('Password reset request for:', formData.email);
        // Simulate a successful request
        router.push('/check-email'); // Redirect to a confirmation page
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-10 w-1/2">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Forgot Password</h1>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email<span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            id="email"
                            className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.email ? "focus:ring-red-400" : "focus:ring-blue-400"
                            } ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your email"
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                                pattern: {
                                    value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                                    message: "Please enter a valid email",
                                },
                            })}
                        />
                        <p className="text-red-500 text-xs mb-3">{errors.email?.message}</p>
                    </div>

                    <button type="submit" className="bg-blue-600 text-white p-3 w-full mt-4 rounded-lg hover:bg-blue-700 transition duration-200">
                        Reset Password
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Remembered your password? <a href="/login" className="text-blue-600 font-semibold hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
