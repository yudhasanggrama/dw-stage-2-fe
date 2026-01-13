import { useState } from "react";
import CityInput from "./components/CityInput";
import WeatherResult from "./components/WeatherResult";
import Loading from "./components/Loading";
import "./App.css"

// mendefinisikan struktur data yang diterima dari API Openweather
interface Weather {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

// mengambil API_KEY dari file .env
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;;

// komponen utama
function App() {
  // state managemen
  // menyimpan nama kota yang diinput user dengan default string kosong
  const [city, setCity] = useState("");
  // menyimpan data cuaca bisa berupa weather = jika berhasil atau null = jika belum ada data
  const [weather, setWeather] = useState<Weather | null>(null);
  // menyimpan status loading, true = sedang fetch data dan false = fetch selesai
  const [loading, setLoading] = useState(false);
  // menyimpan pesan error
  const [error, setError] = useState<string | null>(null);
  // fungsi delay untuk menunda eksekusi selama beberapa milidetik
  const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

  // fungsi async fetch weather untuk mengambil data cuaca dari API
  const fetchWeather = async () => {
    // validasi input kota apakah kosong atau hanya spasi, jika iya hentikan fungsi(tidak fetch api)
  if (!city.trim()) return;

  try {
    // set state sebelum fetch
    // tampilkan loading
    setLoading(true);
    // hapus error sebelumnya
    setError(null);
    // reset data lama agar tidak menampilkan data lama
    setWeather(null); 

    // menunggu 2 detik sebelum fetch api
    await delay(2000);

    // fetch api dari OpenWeather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},ID&units=metric&appid=${API_KEY}`
    );

    // validasi response
    if (!res.ok) {
      throw new Error("Kota tidak ditemukan");
    }

    // ambil data json, mengubah respon ke json dan menyimpan data ke state
    const data = await res.json();
    setWeather(data);

  } catch (err) {
    setError((err as Error).message);
    // selalu dijalankan, menghentingkan loading, baik sukses maupun gagal
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* judul aplikasi */}
      <h1 style={{ textAlign: "center" }}>Weather App</h1>
      {/* input kota , lalu update state city, dan trigger fetch cuaca*/}
      <CityInput city={city} onChange={setCity} onSubmit={fetchWeather} />
      {/* menampilkan komponen loading saat loading = true */}
      {loading && <Loading />}
      {/* menampilkan pesan error jika data tersedia */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {/* menampilkan hasil cuaca jika data tersedia */}
      {weather && <WeatherResult data={weather} />}
    </>
  );
}

export default App;
