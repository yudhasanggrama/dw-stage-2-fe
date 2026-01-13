// Mendefinisikan tipe data Todo
// Digunakan untuk merepresentasikan satu item todo
export type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

// Mendefinisikan tipe Props untuk komponen TodoList
type Props = {
    todos: Todo[];               // Array berisi daftar todo
    onToggle: (id: number) => void; 
    // Fungsi callback untuk mengubah status completed
    // Menerima parameter id dari todo yang diklik
};

// Komponen TodoList menerima props todos dan onToggle
function TodoList({ todos, onToggle }: Props) {

    // Jika tidak ada todo di dalam array
    if (todos.length === 0) {
        // Tampilkan pesan bahwa tidak ada aktivitas
        return <p>Not doing anything</p>;
    }

    // Render daftar todo
    return (
        <>
            <ul>
                {/* Melakukan looping terhadap setiap todo */}
                {todos.map((todo) => (
                    <li
                        key={todo.id} // Key wajib pada list React untuk identifikasi elemen
                        onClick={() => onToggle(todo.id)} 
                        // Ketika item diklik, panggil fungsi onToggle
                        // dengan mengirimkan id todo

                        style={{
                            // Jika completed true, teks dicoret
                            textDecoration: todo.completed ? "line-through" : "none",
                            cursor: "pointer" // Mengubah cursor agar terlihat bisa diklik
                        }}
                    >
                        {/* Menampilkan judul todo */}
                        {todo.title}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TodoList;
