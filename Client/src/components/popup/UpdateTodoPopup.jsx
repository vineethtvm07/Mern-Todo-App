import axios from "axios";

export default function UpdateTodoPopup({editTodo, setEditTodo, setUpdatePopupActive, API_URL}) {

    const onChangeEditHandler = (e) => {
      const newEntry = {
        id: editTodo.id ,
        complete: editTodo.complete ? true : false,
        text: e.target.value 
      }
      setEditTodo(newEntry)
    };

    const updateTodoHandler = async (id) => {
      try {
        if(id === editTodo.id){
        const res = await axios(API_URL + '/update/' + id, {
          method:"PUT",
          data: editTodo 
        })
      }
          setUpdatePopupActive(false);
          setEditTodo('');
      
      } catch (error) {
        console.log(error);  
      }
    };
   
  return (
    <>
            <div className="popup">
              <div className="closePopup" onClick={() => setUpdatePopupActive
              (false)}>x</div>
              <div className="content">
                <h3>Update task</h3>
                <input className='add-todo-input' 
                onChange={onChangeEditHandler}
                type="text" value = {editTodo.text}  />
              <div onClick={()=>updateTodoHandler(editTodo.id)} className="button" >Save Task</div>
              </div>
            </div>
          
    </>
  )
}
