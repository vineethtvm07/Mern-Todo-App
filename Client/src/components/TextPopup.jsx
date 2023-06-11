import axios from "axios";

export default function TextPopup({popupActive, setPopupActive, 
           toDos, setToDos, newTodo, setNewTodo, API_URL}) {

    const addTodo = async () => {
        try {
          const {data} = await axios.post(API_URL + '/new', {text: newTodo})
          setToDos([...toDos, data]);
          setPopupActive(false);
          setNewTodo("");
        } catch (error) {
          console.log(error);
        }
      }

      const keyHandler = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
          if (newTodo){
            addTodo()
          }
        }};
      
  return (
    <>
    <div className="addPopup" onClick={()=>setPopupActive(true)}>+</div>
      {popupActive ? (
            <div className="popup">
              <div className="closePopup" onClick={() => setPopupActive
              (false)}>x</div>
              <div className="content">
                <h3>Add task</h3>
                <input onKeyDown={keyHandler} type="text" 
                className='add-todo-input' placeholder="Add new Todo..." 
                onChange={e => setNewTodo(e.target.value)}
                value={newTodo} />
              <div className="button" onClick={addTodo}>Create Task</div>
              </div>
            </div>
          ) : ""}
    </>
  )
}
