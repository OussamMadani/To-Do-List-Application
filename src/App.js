import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen , faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
 // tasks state
  const [toDo , setToDo] = useState([
    {id:1, title:"task1" , status:false},
    {id:2, title:"task2" , status:false}
  ]); 
  const [newTask , setNewTask] = useState('');
  const [updateData , setUpdateData] = useState('');

  // add task function 
  const addTask = () => {
    if(newTask){
      let num = toDo.length + 1 ;
      let newToDo = { id:num , title:newTask , status:false}
      setToDo([...toDo, newToDo]);
      setNewTask('');
    }
     
  };
  // delete task function 
  const deleteTask = (id) => {
     let newTasks = toDo.filter(task => task.id !== id)
     setToDo(newTasks);
  };
  // mark task as done
  const markDone = (id) => {
     let newTask = toDo.map( task => {
      if(task.id === id){
        return ({...task, status: !task.status})
      }
      console.log(task);
      return task;
     })
     setToDo(newTask);
  };
  // cancel update
  const cancelUpdate = () => {
    setUpdateData('');
  };
   // change task for update
   const changeTask = (e) => {
     let newEntry = {
      id: updateData.id,
      title: e.target.value ,
      status: updateData.status ? true : false
     }
     setUpdateData(newEntry)
  };
   // update Task
   const UpdateTask = () => {
     let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
     let updatedObject = [...filterRecords, updateData];
     setToDo(updatedObject);
     setUpdateData('')
  };

  return (
    <div className="container App">
      <br></br>
      <h2>My To Do List App</h2>
      <br></br>
      {updateData ? (
        <>
        {/* update task */}
      <div className='row'>
        <div className='col'>
          <input 
          value={updateData && updateData.title}
          onChange={(e) => changeTask(e)}
          className='form-control form-control-lg'/>
        </div>
        <div className='col-auto'>
          <button 
          onClick={UpdateTask}
          className='btn btn-lg btn-success mr-20'>
            Update
          </button>
          <button className='btn btn-lg btn-warning'>
            Cancel
          </button>
        </div>
      </div>
      <br />
        </>
      ) : (
        <>
         {/* add forms */}
      <div className='row'>
        <div className='col'>
          <input 
          value={newTask}
          onChange={ (e) => setNewTask(e.target.value)}
          className='form-control form-control-lg'/>
        </div>
        <div className='col-auto'>
          <button 
          onClick={addTask}
          className='btn btn-lg btn-success'>
            Add Task
          </button>
        </div>
      </div>
      <br />
        </>
      )}
  
      {/* to do list  */}
      {toDo && toDo.length ? ' ' : 'No tasks founds...'}
      {toDo && toDo
      .sort((a,b) => a.id> b.id ? 1 : -1)
      .map((task, index) => {
      return(
      <React.Fragment key={task.id}>
      <div className='col taskBg'>
        <div className={task.status ? 'done' : ''}>
          <span className='taskNumber'>{index + 1}</span>
          <span className='taskText'>{task.title}</span>
        </div>
        <div className='iconsWrap'>
          <span 
          onClick={(e) => markDone(task.id)}
          title='completed / not completed'>
          <FontAwesomeIcon icon={faCircleCheck} />
          </span>
          {task.status? null : (
            <span 
            onClick={ () => setUpdateData({
            id: task.id,
            title : task.title,
            status: task.status ? true : false  
            }
            )}
            title='edit'>
            <FontAwesomeIcon icon={faPen} />
            </span>
          )}
          <span 
          onClick={ () => deleteTask(task.id)}
          title='delete'>
          <FontAwesomeIcon icon={faTrashCan} />
          </span>
        </div>
      </div>
      </React.Fragment>
      )
    }
      )}
    </div>
  );
}

export default App;
