import { AppDispatch } from "@/store";
import Image from "next/image";
import { useDispatch } from "react-redux";


const GoogleLoginButton = ({
  label,
  setError,
}: {
  label: string;
  setError: (error: string | null) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      type="button"
      className="border--gray-900 text-gray-900 text-[18px] font-medium w-full border h-14 rounded-[0.5rem] flex items-center gap-3 justify-center bg-[#F9FAFB] bg-opacity-5 hover:bg-gray-100 transition duration-300 ease-in-out uppercase"
    >
      <Image 
      width={24}
      height={24}
      src={'/google.svg'}
      alt=""
      />
      {label} con Google
    </button>
  );
};

export default GoogleLoginButton;
