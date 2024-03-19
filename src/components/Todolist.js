import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Todolist() {
    const [input, setInput] = useState(""); // State pour stocker la valeur de l'input
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    }); // State pour stocker les todos

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (event) => {
        setInput(event.target.value); // Mettre à jour la valeur de l'input
    };

    const addTodo = () => {
        if (input.trim() !== "") {
            setTodos([...todos, input]); // Ajouter le contenu de l'input aux todos
            setInput(""); // Effacer l'input après l'ajout
        }
    };

    const removeTodo = (indexToRemove) => {
        const updatedTodos = todos.filter((_, index) => index !== indexToRemove);
        setTodos(updatedTodos);
    };

    return (
        <div className={"container"}>
            <h1>ToDoList</h1>
            <div className={"input"}>
                <TextField
                    className={"textfield"}
                    color={"info"}
                    focused
                    fullWidth
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={input}
                    onChange={handleInputChange} // Utiliser la fonction de gestionnaire d'événements pour mettre à jour l'input
                />
                <Button
                    variant="contained"
                    onClick={addTodo} // Utiliser la fonction d'ajout de todo
                ><AddIcon />
                    ajouter
                </Button>
            </div>


            <div>
                {todos.map((todo, index) => (
                    <div className="row" key={index}>
                    <div key={index}>{todo}</div>
                        <Button
                            className={"delete"}
                            variant="contained"
                            onClick={() => removeTodo(index)}
                        ><DeleteOutlineIcon />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todolist;
