'use client'

import { useState } from "react";
import { useDispatch } from "react-redux";
import InputGeneral from "@/components/InputGeneral";
import { AppDispatch } from "@/store";
import { logInAsync } from "@/store/actions/auth";
import GoogleLoginButton from "@/components/GoogleButton";

export default function LogIn() {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [active, setActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (data.email === "" || data.password === "") {
      if (data.email === "") {
        setError("Introduce un Correo electrónico.");
      }
      if (data.password === "") {
        setError(prevState =>
          prevState
            ? (prevState = prevState + " " + "Introduce una Contraseña.")
            : (prevState = "Introduce una Contraseña.")
        );
      }
      return;
    }
    setActive(true);
    dispatch(logInAsync({ data, setActive, setError, dispatch }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-[600px] min-h-[700px] max-h-[800px] bg-white rounded-[8px] lg:px-[2.81rem] px-[35px] pt-0 pb-20 lg:py-10 text-gray-900"
    >
      <div className="flex flex-col w-full pt-10">
        <h2 className="text-[47px] font-regular text-gray-900">
          Inicio de sesión
        </h2>
        <div className="text-[1rem] font-regular gap-2 flex flex-col md:flex-row leading-[100%] opacity-60">
          ¿Sos nuevo en la plataforma?{" "}
          <div
            className="text-yellow-500/60 cursor-pointer opacity-100 hover:text-yellow-500 transition duration-300 ease-in-out"
          >
            Crea una cuenta
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full mt-6">
        <InputGeneral
          onChange={handleChange}
          value={data.email}
          name="email"
          type="text"
          label="Correo electrónico"
          className="text-[16px] text-[#111827CC] font-light lg:h-[64.5px]"
        />
        <InputGeneral
          onChange={handleChange}
          value={data.password}
          name="password"
          type="password"
          label="Contraseña"
          className="text-[16px] text-[#111827CC] font-light lg:h-[64.5px]"
        />
      </div>
      {error ? (
        <p className="text-red-500 text-sm text-wrap text-center max-h-5 px-2 mb-2">
          {Array.isArray(error) ? error.join(" ") : error}
        </p>
      ) : (
        <div className="w-full h-4"></div>
      )}

      <button
        type="submit"
        disabled={active}
        className="w-full py-3 hover:bg-yellow-300/90 mt-4 bg-white duration-300 text-gray-900 text-lg tracking-wider border border-gray-500/60 rounded-md"
      >
        Iniciar sesion
      </button>

      <div
        className="text-yellow-300 cursor-pointer font-regular my-7 transition duration-300 hover:text-yellow-500"
      >
        ¿Olvidaste tu contraseña?
      </div>
      <div className="flex items-center justify-center space-x-[12px] w-full mb-8">
        <div className="bg-[#E9E9E9] flex-grow h-[1px]"></div>
        <div className="text-[#8F8F8F] text-center text-[14px] font-regular leading-[120%]">
          O
        </div>
        <div className="bg-[#E9E9E9] flex-grow h-[1px]"></div>
      </div>
      <GoogleLoginButton label="Iniciar" setError={setError} />
    </form>
  );
};
