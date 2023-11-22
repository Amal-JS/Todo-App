import React, { useEffect, useState } from 'react';
import './Base.css'
import Task from './Task';
// fetch data from the server
import axios from 'axios'


const Base = () => {


    //state for storing the task objects array
    const [tasks,setTasks] = useState([])
    //state for storing the new task text
    const [newtask,setNewTask] = useState('')
    // data access url
    const url = 'http://localhost:8000/tasks/'
    //function for the fetch data and set the array in the tasks state
    const fetchData = ()=>{

        axios.get(url)

        .then((response) => {
        
        //passing the array
        setTasks(response.data);
       

      })
      .catch((err)=>{
        console.log(err)
      })
      
 
      ;}



//useEffect for the initial fetch of the data
  useEffect(() => {
    fetchData()
    
  }, []); 





    //function to handle the delete the task object , gets the task id passing that id with the url with the method to delete

    const deleteTask =(id)=>{
        
        axios.delete(url+id)

        .then((res)=>{
            //if deletion is success fetch the data update the array state
            fetchData()
        }).catch(
            err => console.log(err)
        )
        
    }

    //function to add the new task
    const addNewTask = async () => {

        const newData = {
          task: newtask,
        };
      
        // passing the new object with the data to the url with the axios post request
        try {
          await axios.post(url, newData);
          //if success then update the array
          //empty the input field
          
          
          fetchData();
          setNewTask('');
        } catch (error) {
          console.log(error);
        }
      };
      
      //update the task recives the object with update data from the task component 
      const updateTask = async (id, data) => {
        try {
          
          //sending the data using put method along with the id of object
          const response = await axios.put(`${url}${id}/`, data);
          
      
          //updating the array by using filter method and previous state of the tasks
          setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
              task.id === id
                ? {
                    ...task, //destructing the except tasks
                    task: data.task !== undefined ? data.task : task.task,
                    completed: data.completed !== undefined ? data.completed : task.completed,
                  }
                : task
            );
            
            return [...updatedTasks]; 
          });
      
       
        } catch (error) {
          console.log(error, 'updation failed');
        }
      };


    return(

        <div>
        <div className='container-div'>

            <h2 className='header'>Todo App</h2>

            <div  className='todo-div'>
                <div className='main-div' style={{}}>

                   <div>
                

                    <div className='d-flex justify-content-center m-5'>
                      {/* onchange the value will be set to the newtask state */}
                        <input type='text' id='newTask' placeholder=' Add a new task' className='mx-3'  value={newtask}  onChange={(evt=> setNewTask(evt.target.value))}></input>
                        <button id='addNewTaskBtn' onClick={addNewTask} className='btn btn-success'>Add</button>
                    </div>
                   </div>

                    {
                        tasks.length !== 0 ? (
                        tasks.map((element)=>{

                            return (
                              // key = id task completed object because when key,value change then only re render else the object is same 
                              //if you give only id or the value to the key 
                                <Task key={`${element.id}${element.task}${element.completed}`} task={element} deleteTask={()=>deleteTask(element.id)} updateTask={updateTask}/>
                            )
                        })
                        )
                        : <h2>No tasks added</h2>
                    }

                    

                </div>
            </div>
        </div>
        </div>
    )
}

export default Base;