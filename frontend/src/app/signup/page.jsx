"use client";

import { submitUsers } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Signup = () => {
 const dispatch=useDispatch();
 const router=useRouter();
  let {
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
      password: "",
    },
  });
  const validateConfirmPassword = (value) => {
    const password = watch("password");
    if (value != password) {
      return "password don't match";
    }
    return true;
  };
  const validatePassword = (value) => {
    const error = {};

    if (!value) {
      error.password = "Please enter your password.";
    }
    if (value.length < 8 || value.length > 12) {
      error.password = "Password must be between 8 and 12 characters.";
    }
    if (!/[A-Z]/.test(value)) {
      error.password = "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(value)) {
      error.password = "Password must contain at least one lowercase letter.";
    }
    if (!/\d/.test(value)) {
      error.password = "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(value)) {
      error.password = "Password must contain at least one special character.";
    }

    return error.password ? error.password : true;
  };
  const onerror = (errors) => {
    console.log(errors);
  };

  //submit function
  const onSubmit = async(FormData) => {
  try{
    await dispatch(submitUsers(FormData)).unwrap();
    router.push('/')
  }catch(error){
    console.log("error",error);
  }

  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-10 w-1/2">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit, onerror)}>
          <div className="flex justify-between mb-4">
            <div className="w-full mr-2">
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-semibold"
              >
                First Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstname
                    ? "focus:ring-red-400"
                    : "focus:ring-blue-400"
                }  ${errors.firstname ? "border-red-500" : "border-gray-300"} `}
                placeholder="Enter your first name"
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "name is required",
                  },
                  minLength: {
                    value: 3,
                    message: "please enter minimum 3 charchter",
                  },
                })}
              />
              <p className="text-red-500 text-xs mb-3">
                {errors.firstname?.message}
              </p>
            </div>
            <div className="w-full ml-2">
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-semibold"
              >
                Last Name (optional)
              </label>
              <input
                type="text"
                id="lastName"
                className="border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                placeholder="Enter your last name (optional)"
                {...register("lastname")}
              />
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="w-full mr-2">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold"
              >
                Phone Number<span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone ? "focus:ring-red-400" : "focus:ring-blue-400"
                }  ${errors.phone ? "border-red-500" : "border-gray-300"} `}
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "phone no. is required",
                  },
                  pattern: {
                    value: /^[1-9]\d{9}$/,
                    message: "please enter a valid number",
                  },
                })}
              />
              <p className="text-red-500 text-xs mb-3">
                {errors.phone?.message}
              </p>
            </div>
            <div className="w-full ml-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="email"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "focus:ring-red-400" : "focus:ring-blue-400"
                }  ${errors.email ? "border-red-500" : "border-gray-300"} `}
                placeholder="Enter your email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                  pattern: {
                    value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                    message: "please enter a valid mail",
                  },
                })}
              />
              <p className="text-red-500 text-xs mb-3">
                {errors.email?.message}
              </p>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="w-full mr-2">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password<span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="password"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password?.message
                    ? "focus:ring-red-400"
                    : "focus:ring-blue-400"
                }  ${
                  errors.password?.message
                    ? "border-red-500"
                    : "border-gray-300"
                } `}
                placeholder="Enter your password"
                {...register("password", {
                  validate: validatePassword,
                })}
              />
              <p className="text-red-500 text-xs mb-3">
                {errors.password?.message}
              </p>
            </div>
            <div className="w-full ml-2">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold"
              >
                Confirm Password<span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword?.message
                    ? "focus:ring-red-400"
                    : "focus:ring-blue-400"
                } ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  validate: validateConfirmPassword,
                })}
              />
              <p className="text-red-500 text-xs mb-3">
                {errors.confirmPassword?.message}
              </p>
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
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
