import React from 'react';
import './todo.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useEffect } from 'react';

const getLocaldata =()=>{
    const lists = localStorage.getItem("Todolist");
    return(lists ? JSON.parse(lists): []);
}

const Todo =  () => {
    const [Task, setTask] = useState("");
    const [List,setList] = useState(getLocaldata());
    const [editList, setEditList] = useState(false);
    const [editedIndex, setEditedIndex]=useState(null);

    const addList = () =>{
        setList([...List,Task]);
        setTask('');
    }

    const deleteSelected = (id) =>{
      // setList(List.filter((Task,index)=>index !== id))
      //console.log(id);
      const selectArray = [...List]
      //console.log(selectArray)clear
      selectArray.splice(id,1);
      setList(selectArray);
    }

    const deleteAll = () =>{
        setList([]);
    }

    useEffect(()=>{
        localStorage.setItem("Todolist",JSON.stringify(List))
    },[List])

    const editTask = (id) =>{
        //console.log(id)
       setTask(List[id]);
       setEditList(true);
       setEditedIndex(id);
    }

    const editExistingTask = () =>{
        setEditList(false);
        setTask("");
        const editedArray = [...List];
        editedArray.splice(editedIndex,1,Task);
        setList(editedArray);
    }


    return(
        <>
        <div className='Main_div'>
        <div className='child_div'>

        {/*list  heading  */}
        <div className='inner_div'>
        <div className='list_heading'>
            <img className='list_logo' src="./images/todo/notepad.png"  alt="ToDoImage" />
            <h6>Add Your List Here 📝</h6>
        </div>

            {/* input to List update */}
            <div className='add_items_div'>
                <input className='add_item_input' 
                onChange={(e)=>setTask(e.target.value)} 
                value={Task} 
                type="text" 
                placeholder='✍ Add Items'/>
                
                <Button className='add_list_btn' size='sm' variant="outline-success" disabled={!Task.trim()} onClick={editList ? editExistingTask : addList}>{editList ? 'Save' : 'Add'}</Button>
                <Button className='clr_btn' size='sm' variant="outline-danger" disabled={!List.length > 0 } onClick={editList ? editExistingTask : deleteAll}>{editList ? 'Cancel' : 'Clear All'}</Button> 
            </div>
              
            
            {/* added items to List */}
            <div className='display_list'>
            {List.length === 0 && 'No Item Added'}
            {List.map((curElem,id)=>{
                return(
                <div className='each_item' key={id}>
                <p className='added_list'>{`${id}) ${curElem}`}</p>
                
                <div className='list_btn'>
                <i className="fa-solid fa-pen-to-square , list_edit_btn" onClick={()=>editTask(id)}></i>
                <i className="fa-solid fa-delete-left , list_delete_btn" onClick={()=>deleteSelected(id)}></i>
                </div>
                </div> 
                )
                
            })}
            
          
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Todo;