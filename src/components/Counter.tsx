type CounterProps = {
    text:number;
}

function Counter({text}: CounterProps) {
    return <p>Nilai Counter : {text}</p>
}

type CounterProfile = {
    text:string;
}

export function CounterProfile ( {text} : CounterProfile) {
    return (
        <>
        <hr />
        <p>{text}</p> 
        </>
    );
}

export default Counter