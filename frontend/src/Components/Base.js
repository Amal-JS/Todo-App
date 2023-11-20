import React, { useEffect, useState } from 'react';
import './Base.css'
import Task from './Task';
import axios from 'axios'


const Base = () => {



    const [tasks,setTasks] = useState([])


    const fetchData = ()=>{

        axios.get(url)
        .then((response) => {
        
        setTasks(response.data);
        console.log('update   ',response.data)

      })
      .catch((err)=>{
        console.log(err)
      })
      
 
      ;}

    const url = 'http://localhost:8000/tasks/'


  useEffect(() => {
    fetchData()
    
  }, []); 





    
    const deleteTask =(id)=>{
        
        axios.delete(url+id)
        .then((res)=>{
            console.log(res)
            fetchData()
        }).catch(
            err => console.log(err)
        )
        
    }
    const addNewTask = async () => {
        const newData = {
          task: document.getElementById('newTask').value,
        };
      
        try {
          await axios.post(url, newData);
          fetchData();
        } catch (error) {
          console.log(error);
        }
      };
      
      const updateTask = async (id, data) => {
        try {
          
          const response = await axios.put(`${url}${id}/`, data);
          
      
          setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
              task.id === id
                ? {
                    ...task,
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
                        <input type='text' id='newTask' placeholder=' Add a new task' className='mx-3'></input>
                        <button id='addNewTaskBtn' onClick={addNewTask} className='btn btn-success'>Add</button>
                    </div>
                   </div>

                    {
                        tasks.length !== 0 ? (
                        tasks.map((element)=>{

                            return (

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