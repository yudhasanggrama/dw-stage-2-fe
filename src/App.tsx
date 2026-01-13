import { useEffect, useState } from "react";
import CityInput from "./components/CityInput";
import WeatherResult from "./components/WeatherResult";
import Loading from "./components/Loading";
import "./App.css";

// struktur data cuaca dari API OpenWeather
interface Weather {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

// mengambil API key dari .env
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  // state input kota (controlled form)
  const [city, setCity] = useState("");

  // state data cuaca
  const [weather, setWeather] = useState<Weather | null>(null);

  // state loading
  const [loading, setLoading] = useState(false);

  // state error
  const [error, setError] = useState<string | null>(null);

  // useEffect untuk debounce + API fetch
  useEffect(() => {
    // validasi input kosong
    if (!city.trim()) {
      setWeather(null);
      setError(null);
      return;
    }

    // debounce timer
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},ID&units=metric&appid=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error("Kota tidak ditemukan");
        }

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setWeather(null);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }, 800); // debounce 800ms

    // cleanup function → membatalkan timer jika user masih mengetik
    return () => clearTimeout(timer);

  }, [city]); // useEffect akan dijalankan setiap city berubah

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Weather App</h1>

      {/* controlled form */}
      <CityInput
        city={city}
        onChange={setCity}
        onSubmit={() => {}} // submit tidak dipakai lagi
      />

      {/* loading state */}
      {loading && <Loading />}

      {/* error state */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* hasil cuaca */}
      {weather && <WeatherResult data={weather} />}
    </>
  );
}

export default App;
