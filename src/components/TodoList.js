import { useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import './ToDoList.css'

import { 
  provideFASTDesignSystem, 
  fastCard, 
  fastButton,
  fastTextField,
  fastListbox,
} from '@microsoft/fast-components';
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import React from 'react';

const { wrap, registry } = provideReactWrapper(
  React
);

const FastCard = wrap(fastCard());
const FastButton = wrap(fastButton())
const FastTextField = wrap(fastTextField())
const FastListBox= wrap(fastListbox())

provideFASTDesignSystem()
    .register(registry)



export default function TodoList() {

    const [todos, setTodos] = useState([])
    const inputRef = useRef(null)

    function removeTodo(id) {
        setTodos(todos.filter( t => t.id != id))
    }

    function addToDo(evt) {
        evt.preventDefault()
        
        setTodos([...todos, {
            text: inputRef.current.value,
            id: todos.length + 1
        }])
        inputRef.current.value = ""
    }

    return (
        <FastCard >
                <h1>FAST UI To-Do app</h1>
                <FastCard  class="no-shadow spaced">
                    <FastTextField 
                        variant="filled" 
                        ref={inputRef}
                    >New Task</FastTextField>
                    <FastButton variant="primary "  onClick={addToDo} >
                        Save
                        <svg class="svg-icon" viewBox="0 0 20 20" slot="end">
                            <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
                        </svg>
                    </FastButton>
                </FastCard>
                <FastCard class="no-shadow ">
                    {todos.length > 0 && <FastListBox>
                        {todos.map( t => <ToDoItem key={t.id} item={t} itemRemover={removeTodo} ></ToDoItem>)}
                    </FastListBox>
                    }
                    <h2>Total pending tasks: {todos.length}</h2>
                </FastCard>
        </FastCard>
    )
}