import axios from 'axios'
import TextPopup from '../TextPopup';
import { useState, useEffect } from 'react';
import Todos from './Todos';

export default function Home() {

const API_URL = "http://localhost:3007/todos"

const [toDos, setToDos] = useState([]);
const [newTodo, setNewTodo] = useState("");
const [editTodo, setEditTodo] = useState('');  
const [popupActive, setPopupActive] = useState(false);
const [updatePopupActive, setUpdatePopupActive] = useState(false);

useEffect(() => {
  GetTodos();
  
}, [editTodo]);

const GetTodos = async () => {
 try {
  const response = await axios(API_URL);
 setToDos(response.data);

 } catch (error) {
  console.log(error);
 }
};
   
  return (

    <>
      <h1>Welcome, Todo List</h1>
      <h4>Your Tasks</h4>
      <div className="todos">
      
       {
          toDos && toDos.map((todo) => (

           <Todos key={todo._id} API_URL={API_URL} todo={todo} toDos={toDos} setToDos={setToDos}
            updatePopupActive={updatePopupActive} setUpdatePopupActive={setUpdatePopupActive} 
            editTodo={editTodo} setEditTodo={setEditTodo}  />

          ))
        }
        
            <TextPopup toDos={toDos} newTodo={newTodo} setNewTodo={setNewTodo} 
            API_URL={API_URL} popupActive={popupActive} setPopupActive={setPopupActive}  
            setToDos={setToDos} />

       </div>       
    </>
    
  )
}
