import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SingUpInput } from "../../../common/src/zod";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<SingUpInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div>
            <div className=" text-4xl font-semibold text-left mt-4">
              Create an account
            </div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account"
                : " Already have an account?"}
              <Link
                className="pl-2 underline font-bold hover:text-black"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signin" ? "signup" : "signin"}
              </Link>
            </div>
          </div>
          <div>
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Suresh Alabani.."
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : (
              ""
            )}
            <LabelledInput
              label="email"
              placeholder="suresh@gmail.com"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="password"
              placeholder="***********"
              type="password"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signin" ? "signin" : "signup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface labelledInputType {
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
}: labelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-90">
          {label}
        </label>
        <input
          type={type || "text"}
          id="first_name"
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
