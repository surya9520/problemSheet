"use client";

import { loginUser } from "@/store/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onError = (error) => {
        console.log(error);
    };

    const onSubmit = async (formData) => {
        try {
            await dispatch(loginUser(formData)).unwrap();
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-10 w-1/2">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                                    value: true,
                                    message: "Email is required"
                                },
                                pattern: {
                                    value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                                    message: "Please enter a valid email",
                                }
                            })}
                        />
                        <p className="text-red-500 text-xs mb-3">{errors.email?.message}</p>
                    </div>

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
                                    value: true,
                                    message: "Password is required"
                                }
                            })}
                        />
                        <p className="text-red-500 text-xs mb-3">{errors.password?.message}</p>
                    </div>

                    <button type="submit" className="bg-blue-600 text-white p-3 w-full mt-4 rounded-lg hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center text-gray-600">
                    <p>Don't have an account? <a href="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</a></p>
                    <p><Link href="/forgot-password" className="text-sm text-blue-600 font-semibold hover:underline">Forgot Password?</Link></p>
                    <p><Link href="/change-password" className="text-sm text-blue-600 font-semibold hover:underline">Change Password</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
