import { useState } from 'react';
import './App.css';
// Mengimpor komponen TodoList dan tipe data Todo
import TodoList, { type Todo } from './components/TodoList';

function App() {
  // State untuk menyimpan daftar todo
  // Bertipe array Todo
  const [todos, setTodos] = useState<Todo[]>([]);

  // State untuk menyimpan nilai input judul todo
  const [title, setTitle] = useState("");

  // Fungsi untuk menambahkan todo baru
  const addTodo = () => {

    // Jika input kosong atau hanya spasi, hentikan proses
    if (!title.trim()) return;

    // Menambahkan todo baru ke dalam state todos
    setTodos((prev) => [
      // Menyalin todo yang sudah ada
      ...prev, 
      {
        id: Date.now(), 
        title,            
        completed: false,
      },
    ]);
    // Mengosongkan kembali input setelah todo ditambahkan
    setTitle("");
  };

  // Fungsi untuk mengubah status completed sebuah todo
  const toggleTodo = (id: number) => {

    // Melakukan update state todos
    setTodos((prev) =>
      prev.map((todo) =>
        // Jika ID cocok, toggle nilai completed
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo // Jika tidak cocok, kembalikan todo seperti semula
      )
    );
  };

  // Render tampilan utama aplikasi
  return (
    <>
      <div>
        {/* Judul aplikasi */}
        <h1>Todo List</h1>

        {/* Input untuk memasukkan judul todo */}
        <input
          type="text"
          value={title} // Value input dikontrol oleh state title
          placeholder="Tambah todo"
          onChange={(e) => setTitle(e.target.value)}
          // Setiap perubahan input akan mengupdate state title
        />

        {/* Tombol untuk menambahkan todo */}
        <button onClick={addTodo}>Tambah</button>

        {/* Komponen TodoList */}
        {/* Mengirim data todos dan fungsi toggleTodo sebagai props */}
        <TodoList todos={todos} onToggle={toggleTodo} />
      </div>
    </>
  );
}

// Mengekspor komponen App agar bisa digunakan oleh React
export default App;
