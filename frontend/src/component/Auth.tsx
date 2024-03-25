import { Link, useNavigate } from "react-router-dom";
import { signupSchemaDef, signupSchema } from "@soumik007/notion-common";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "Signup" | "Signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupSchema>({
    name: "",
    email: "",
    password: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      //alert user
      alert("Invalid credentials or user already exists");
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="font-bold text-4xl">
            {type === "Signup" ? "Create an account" : "Login to account"}
          </div>
          <div className="text-lg font-medium text-slate-400 text-center pb-4 pt-2">
            {type === "Signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              to={type === "Signin" ? "/signup" : "/signin"}
              className="pl-2 underline"
            >
              {type === "Signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
          {type === "Signup" ? (
            <LabelledInput
              label="Name"
              placeholder="John Doe"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          ) : (
            ""
          )}
          <LabelledInput
            label="Username"
            placeholder="xyz@gmail.com"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
          />
          <LabelledInput
            label="Password"
            type={"password"}
            placeholder="Use at least 6 characters"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
          <button
            onClick={sendRequest}
            type="button"
            className="text-white w-full mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
