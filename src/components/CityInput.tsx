interface CityInputProps {
  city: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function CityInput({
  city,
  onChange,
  onSubmit,
}: CityInputProps) {
  return (
    <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}
        style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
        }}
        >
        <input type="text" placeholder="Masukkan nama kota" value={city} onChange={(e) => onChange(e.target.value)}/>

        <button type="submit">Submit</button>
    </form>
    );
}
export default CityInput
