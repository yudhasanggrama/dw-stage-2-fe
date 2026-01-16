import { useState } from "react"
import { useTodo } from "../hooks/useTodo"
import type { Todo } from "../Types/todo"


const TodoItem = ({todo} : {todo: Todo}) => {
    const {updateTodo,deleteTodo,toogleComplete,loading} = useTodo()
    const [isEditing, setIsEditing] = useState(false)
    const [text,setText] = useState(todo.text)

    const handleUpdate = () => {
        updateTodo(todo.id,text)
        setIsEditing(false)
    }
    return (
        <div className="flex items-center justify-between gap-4 bg-zinc-800 p-3 rounded-lg">
            <div className="flex items-center gap-3 flex-1">
                <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toogleComplete(todo.id)}
                className="w-4 h-4"
                />

                {isEditing ? (
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={loading}
                    className="border rounded px-2 py-1 w-full"
                />
                ) : (
                <span
                    className={`${
                    todo.completed ? "line-through text-zinc-400" : ""
                    }`}
                >
                    {todo.text}
                </span>
                )}
            </div>

            <div className="flex gap-2">
                {isEditing ? (
                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="min-w-17.5 px-3 py-1 rounded bg-green-600 hover:bg-green-500"
                >
                    Save
                </button>
                ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    disabled={loading}
                    className="min-w-17.5 px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
                >
                    Edit
                </button>
                )}

                <button
                onClick={() => deleteTodo(todo.id)}
                disabled={loading}
                className="min-w-17.5 px-3 py-1 rounded bg-red-600 hover:bg-red-500"
                >
                Delete
                </button>
            </div>
        </div>
    )
}

export default TodoItem