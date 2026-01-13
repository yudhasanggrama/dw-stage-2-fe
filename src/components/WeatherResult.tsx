// Interface Weather digunakan untuk mendefinisikan struktur data cuaca
// yang diterima dari API OpenWeather
interface Weather {
    // Nama kota
    name: string;

    // Objek main berisi informasi utama cuaca
    main: {
        // Suhu udara (dalam Celcius)
        temp: number;
    };

    // Array weather berisi kondisi cuaca
    weather: {
        // Deskripsi cuaca (contoh: "clear sky", "light rain")
        description: string;
    }[];
}

// Interface WeatherResultProps digunakan untuk mendefinisikan
// tipe props yang diterima oleh komponen WeatherResult
interface WeatherResultProps {
    // data berisi informasi cuaca dengan tipe Weather
    data: Weather;
}

// Komponen WeatherResult bertugas menampilkan hasil cuaca ke UI
// Menggunakan destructuring untuk mengambil data dari props
export default function WeatherResult({ data }: WeatherResultProps) {
    return (
        // Container utama hasil cuaca
        <div style={{ marginTop: "1rem" }}>

            {/* Menampilkan nama kota */}
            <h3>{data.name}</h3>

            {/* Menampilkan suhu dalam derajat Celcius
                Math.round digunakan untuk membulatkan angka */}
            <p>Suhu: {Math.round(data.main.temp)}°C</p>

            {/* Menampilkan deskripsi cuaca pertama dari array weather */}
            <p>Cuaca: {data.weather[0].description}</p>

        </div>
    );
}
