import { useState } from "react"
import { useTodo } from "../hooks/useTodo";

const TodoForm = () => {
    const [text,setText] = useState("");
    const {createTodo, loading} = useTodo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!text.trim()) return;
        
        createTodo(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type={text} 
            onChange={(e) => setText(e.target.value)}
            className="border text-xl"
            disabled={loading}
            placeholder="Add new task..."
            />
            <button type="submit" disabled={loading} className="ml-2 mb-3">Add</button>
        </form>
    )
}

export default TodoForm