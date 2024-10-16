"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const validateConfirmPassword = (value) => {
        const newPassword = watch("newPassword");
        return value === newPassword || "Passwords don't match";
    };

    const validateNewPassword = (value) => {
        if (!value) return "Please enter your new password.";
        if (value.length < 8 || value.length > 12) return "Password must be between 8 and 12 characters.";
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
        if (!/\d/.test(value)) return "Password must contain at least one number.";
        if (!/[!@#$%^&*]/.test(value)) return "Password must contain at least one special character.";
        return true;
    };

    const onError = (errors) => {
        console.log(errors);
    };

    const onSubmit = async (formData) => {
        // Implement your password change logic here (e.g., API call)
        console.log('Old Password:', formData.oldPassword);
        console.log('New Password:', formData.newPassword);
        // Simulate a successful change
        router.push('/'); // Redirect to the home page or login page
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-10 w-1/2">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Change Password</h1>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="mb-4">
                        <label htmlFor="oldPassword" className="block text-gray-700 font-semibold">Old Password<span className="text-red-600">*</span></label>
                        <input
                            type="password"
                            id="oldPassword"
                            className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.oldPassword ? "focus:ring-red-400" : "focus:ring-blue-400"
                            } ${errors.oldPassword ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your old password"
                            {...register("oldPassword", {
                                required: "Old password is required.",
                            })}
                        />
                        <p className="text-red-500 text-xs mb-3">{errors.oldPassword?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700 font-semibold">New Password<span className="text-red-600">*</span></label>
                        <input
                            type="password"
                            id="newPassword"
                            className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.newPassword ? "focus:ring-red-400" : "focus:ring-blue-400"
                            } ${errors.newPassword ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter your new password"
                            {...register("newPassword", {
                                validate: validateNewPassword,
                            })}
                        />
                        <p className="text-red-500 text-xs mb-3">{errors.newPassword?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Confirm New Password<span className="text-red-600">*</span></label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.confirmPassword ? "focus:ring-red-400" : "focus:ring-blue-400"
                            } ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Confirm your new password"
                            {...register("confirmPassword", {
                                validate: validateConfirmPassword,
                            })}
                        />
                        <p className="text-red-500 text-xs mb-3">{errors.confirmPassword?.message}</p>
                    </div>

                    <button type="submit" className="bg-blue-600 text-white p-3 w-full mt-4 rounded-lg hover:bg-blue-700 transition duration-200">
                        Change Password
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Remembered your password? <a href="/login" className="text-blue-600 font-semibold hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default ChangePassword;
