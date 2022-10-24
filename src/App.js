import AddTask from './components/AddTask';
import ToDoList from './components/ToDoList';
import UpdateTaskComponent from './components/UpdateTaskComponent';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

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
        <UpdateTaskComponent 
        updateData={updateData} 
        changeTask={changeTask} 
        UpdateTask={UpdateTask} 
        cancelUpdate={cancelUpdate}
        /> 
      ) : (
      <AddTask 
      newTask={newTask} 
      setNewTask={setNewTask} 
      addTask={addTask}
      />
      )}
  
      {/* to do list  */}
      {toDo && toDo.length ? ' ' : 'No tasks founds...'}
      <ToDoList 
      toDo={toDo} 
      markDone={markDone} 
      setUpdateData={setUpdateData} 
      deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
