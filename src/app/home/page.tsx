'use client'
import { getDisponibility } from "@/store/services/booking";
import { getMovie } from "@/store/services/movie";
import { DisponibilityProps, MovieProps, ReservationProps } from "@/utils/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home () {
  const [movieInfo, setMovieInfo] = useState<MovieProps>()
  const [allDisponibility, setAlldiponibility] = useState<DisponibilityProps[]>()
  const [step, setStep] = useState<number>(1)
  const [auditoriumIndex, setAuditoriumIndex] = useState<number>()
  const rooter = useRouter()
  const [reservationInfo, setReservationInfo] = useState<ReservationProps>({
    movieId: 0,
    auditorium_id: 0,
    hour: "",
    price: 0,
  })

  const handleShowDisponibility = async (movieId: number) => {
    const response = await getDisponibility()
    setAlldiponibility(response.disponibility)
    const movie = await getMovie(movieId)
    setMovieInfo(movie.movie)
  }

  return (
    <div
      className={`gap-9 min-h-screen relative`}
    >
      <div onClick={() => {handleShowDisponibility(1), setReservationInfo({...reservationInfo, movieId: 1})}} className="w-full relative cursor-pointer max-w-[1440px] xl:mx-auto h-[370px] rounded-sm">
        <Image
        src="/home/deadpool-home.png" 
        alt="Movie Home Image"
        layout="fill"
        objectFit="cover"
        className="rounded-md"
        />
      </div>
      <div className="flex w-full h-[450px] max-w-[1440px] xl:mx-auto rounded-b-lg">
        <div className="w-[50%] p-4 bg-gray-900">
          {movieInfo ? (
            <div className="flex h-full">
              <div className="flex flex-col gap-6 pt-5">
              {step === 1 ? allDisponibility?.map((auditorium, index) => (
                <div key={index} className={`ml-5 rounded-lg relative pl-5 ${!auditorium.three && !auditorium.five && !auditorium.seven && "pointer-events-none"}`}>
                  <h3 className={`text-xl rotate-12 left-[18%] top-9 text-gray-300 absolute ${!auditorium.three && !auditorium.five && !auditorium.seven ? "block" : "hidden"}`}> NO DISPONIBLE</h3>
                  <h3 className="text-xl">{auditorium.name}</h3>
                  <div className="flex gap-6">
                    <div onClick={() => {setReservationInfo({...reservationInfo, hour: "1500", auditorium_id: auditorium.auditorium_id}), setAuditoriumIndex(index)}} className={`py-2 px-6 mt-2 bg-white rounded-xl font-semibold ${auditoriumIndex === index && reservationInfo.hour === "1500" && "bg-gray-700/80 text-gray-200"} cursor-pointer text-md ${!auditorium.three && "opacity-20 pointer-events-none"} text-gray-900/80 border border-gray-900/80 duration-300 hover:bg-slate-200/70`}>15:00</div>
                    <div onClick={() => {setReservationInfo({...reservationInfo, hour: "1700", auditorium_id: auditorium.auditorium_id}), setAuditoriumIndex(index)}} className={`py-2 px-6 mt-2 bg-white rounded-xl font-semibold ${auditoriumIndex === index && reservationInfo.hour === "1700" && "bg-gray-700/80 text-gray-200"} cursor-pointer text-md ${!auditorium.five && "opacity-20 pointer-events-none"} text-gray-900/80 border border-gray-900/80 duration-300 hover:bg-slate-200/70`}>17:00</div>
                    <div onClick={() => {setReservationInfo({...reservationInfo, hour: "1900", auditorium_id: auditorium.auditorium_id}), setAuditoriumIndex(index)}} className={`py-2 px-6 mt-2 bg-white rounded-xl font-semibold ${auditoriumIndex === index && reservationInfo.hour === "1900" && "bg-gray-700/80 text-gray-200"} cursor-pointer text-md ${!auditorium.seven && "opacity-20 pointer-events-none"} text-gray-900/80 border border-gray-900/80 duration-300 hover:bg-slate-200/70`}>19:00</div>
                  </div>
                </div>
              )) : (
                <div className="w-full h-full bg-slate-100">
                </div>
              )}
              </div>
              <div className="flex items-end">
                <button onClick={() => setStep(1)} className={`bg-gray-700 h-[40px] hover:bg-gray-800 ${step === 1 && "hidden"} duration-300 w-[150px] rounded-full mb-[7.2rem] ml-16`}>Atras</button>
                <button onClick={() => setStep(2)} disabled={!reservationInfo.hour} className={`bg-gray-400 h-[40px] ${reservationInfo.hour ? "hover:opacity-80" : "opacity-30"} duration-300 w-[150px] rounded-full mb-[7.2rem] ml-16`}>Siguiente</button>
              </div>
            </div>) : null
          }
        </div>
        <div className="relative w-[50%] flex h-full bg-gray-900">
          <div className="w-[50%]">
            <h2 className="text-[2rem] text-red-800 mt-4 flex text-center justify-center">{movieInfo?.title.toUpperCase()}</h2>
            <h3 className="text-md text-gray-300 mt-4">{movieInfo?.description}</h3>
          </div>
          <Image
          src="/home/deadpool-movie.jpg" 
          alt="Movie Image"
          height={450}
          width={300}
          className="p-4 w-[50%] h-full object-cover rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};