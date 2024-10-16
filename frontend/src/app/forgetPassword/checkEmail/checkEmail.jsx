"use client";

import { useRouter } from "next/navigation";

const CheckEmail = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-10 w-1/2">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Check Your Email</h1>
                <p className="text-gray-700 text-center mb-4">
                    A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
                </p>
                <p className="text-gray-700 text-center mb-6">
                    If you don't see the email, please check your spam or junk folder.
                </p>
                <button
                    onClick={() => router.push('/login')}
                    className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default CheckEmail;
