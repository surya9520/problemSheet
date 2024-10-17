"use client";

import { submitUsers } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Password validation function
  const validatePassword = (value) => {
    const error =
      !value
        ? "Please enter your password."
        : value.length < 8 || value.length > 12
        ? "Password must be between 8 and 12 characters."
        : !/[A-Z]/.test(value)
        ? "Password must contain at least one uppercase letter."
        : !/[a-z]/.test(value)
        ? "Password must contain at least one lowercase letter."
        : !/\d/.test(value)
        ? "Password must contain at least one number."
        : !/[!@#$%^&*]/.test(value)
        ? "Password must contain at least one special character."
        : true;

    return error;
  };

  const validateConfirmPassword = (value) =>
    value === watch("password") ? true : "Passwords don't match.";

  const onSubmit = async (FormData) => {
    try {
      await dispatch(submitUsers(FormData)).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-10 w-1/2">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* First Name */}
          <div className="flex justify-between mb-4">
            <div className="w-full mr-2">
              <label htmlFor="firstName" className="block text-gray-700 font-semibold">
                First Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstname ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400 border-gray-300"
                }`}
                {...register("firstname", {
                  required: "First name is required",
                  minLength: { value: 3, message: "Minimum 3 characters required" },
                })}
              />
              <p className="text-red-500 text-xs mb-3">{errors.firstname?.message}</p>
            </div>

            {/* Last Name */}
            <div className="w-full ml-2">
              <label htmlFor="lastName" className="block text-gray-700 font-semibold">
                Last Name (optional)
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className="border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                {...register("lastname")}
              />
            </div>
          </div>

          {/* Phone and Email */}
          <div className="flex justify-between mb-4">
            <div className="w-full mr-2">
              <label htmlFor="phone" className="block text-gray-700 font-semibold">
                Phone Number<span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400 border-gray-300"
                }`}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: { value: /^[1-9]\d{9}$/, message: "Please enter a valid number" },
                })}
              />
              <p className="text-red-500 text-xs mb-3">{errors.phone?.message}</p>
            </div>

            <div className="w-full ml-2">
              <label htmlFor="email" className="block text-gray-700 font-semibold">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400 border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <p className="text-red-500 text-xs mb-3">{errors.email?.message}</p>
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex justify-between mb-4">
            <div className="w-full mr-2">
              <label htmlFor="password" className="block text-gray-700 font-semibold">
                Password<span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400 border-gray-300"
                }`}
                {...register("password", { validate: validatePassword })}
              />
              <p className="text-red-500 text-xs mb-3">{errors.password?.message}</p>
            </div>

            <div className="w-full ml-2">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">
                Confirm Password<span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400 border-gray-300"
                }`}
                {...register("confirmPassword", { validate: validateConfirmPassword })}
              />
              <p className="text-red-500 text-xs mb-3">{errors.confirmPassword?.message}</p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 w-full mt-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
