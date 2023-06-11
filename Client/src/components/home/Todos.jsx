import axios from 'axios';
import UpdateTodoPopup from '../popup/UpdateTodoPopup';


export default function Todos({API_URL, todo, toDos, setToDos, updatePopupActive, 
        setUpdatePopupActive, editTodo, setEditTodo }) {

    const completeTodo = async (id) => {
        const {data} = await axios(API_URL + '/complete/' + id)
          
            setToDos(toDos => toDos.map(todo => {
              if(todo._id === data._id) {
                todo.complete = data.complete;
              }
              return todo;
            }))
      };

    const deleteTodo = async (id) => {
        try {
          const res = await axios.delete(API_URL + '/delete/' + id)
          const newListItems = toDos.filter(todo => todo._id !== id)
          setToDos(newListItems)
        } catch (error) {
          console.log(error);
          
        }
      };

  return (
    <>
      <div className="todo" key={todo._id}>
            <div className={`todo-list ${todo.complete ? "is-Complete" : ""}`
            }  onClick={()=> completeTodo(todo._id)}>
             
            <div className="checkbox"></div>
  
            <div className="text"> {todo.text} </div>
            </div> 
            <div className='edit-btn'> <i onClick={()=>{setUpdatePopupActive(true); 
                  setEditTodo({
                    id:todo._id, 
                    text:todo.text, 
                    complete:todo.complete ? true : false})}}  
                 className="fa fa-pencil" aria-hidden="true"></i> </div>
            <div onClick={() => deleteTodo(todo._id)} className="delete-todo" >x</div>
            </div>

        <>
        {updatePopupActive && (
            <UpdateTodoPopup API_URL={API_URL} setUpdatePopupActive={setUpdatePopupActive} 
             editTodo={editTodo} setEditTodo={setEditTodo} setToDos={setToDos} />
        )}
        </>
    </>
  )
}
