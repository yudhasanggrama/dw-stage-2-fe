import { createContext } from "react";
import type { Todo } from "../Types/todo";

export interface TodoContentType {
    todos: Todo[]
    createTodo: (text:string) => void
    updateTodo: (id:number, text:string) => void
    deleteTodo: (id:number) => void
    toogleComplete: (id:number) => void
    loading:boolean

}

export const TodoContext = createContext<TodoContentType | undefined>(undefined)