import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import appwriteService from "../../../appwrite/auth";

const initialState = []

const todoSlice = createSlice({
    name: "Todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.push(todo)
     
            // const documentData = {text : todo.text}
            // console.log(documentData);
            // const dbTodoRes = appwriteService.createTodo(documentData)
            localStorage.setItem('Todos', JSON.stringify(state))
        },
        removeTodo: (state, action) => {
            const idToRemove = action.payload;
            const idx = state.findIndex(todo => todo.id === idToRemove);
            if (idx !== -1) {
                state.splice(idx, 1);
            }

            localStorage.setItem('Todos', JSON.stringify(state))
        },
        removeAll: (state) => {
            state.length = 0; // Clear the existing array in place
            localStorage.setItem('Todos', JSON.stringify(state));
        }
    }
})

export default todoSlice.reducer
export const { addTodo, removeTodo, removeAll } = todoSlice.actions