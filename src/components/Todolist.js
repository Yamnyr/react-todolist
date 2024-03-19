import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Todolist() {
    const [input, setInput] = useState(""); // State pour stocker la valeur de l'input
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    // State pour stocker la liste des todos (recupère les to do du local storage si le usestate est vide

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    // met a jour le local storage des todos des que le usestate de to do est mis a jour

    const handleInputChange = (event) => {
        setInput(event.target.value);                 // Mettre à jour la valeur de l'input
    };

    const addTodo = () => {
        if (input.trim() !== "") {
            setTodos([...todos, input]);        // Ajouter le contenu de l'input aux todos
            setInput("");                       // Effacer l'input après l'ajout
        }
    };

    const removeTodo = (indexToRemove) => {
        // Retrouve le to do dans la liste des todos via l'index et l'extrait de la liste des todos avec filter
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
                    inputProps={{ style: { color: '#fdf0d5' } }}
                />
                <Button
                    className={"valid"}
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
                            onClick={() => removeTodo(index)} // Utiliser la fonction de supression de todo
                        ><DeleteOutlineIcon />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todolist;
