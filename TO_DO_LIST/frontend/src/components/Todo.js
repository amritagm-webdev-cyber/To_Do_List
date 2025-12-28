import React,{useState} from 'react'
import axios from 'axios';



const Todo = () => {
    const[currid,setCurrid] = useState("")
    const[uniqueid,setUniqueid] = useState(0)
    const[activity,setActivity] = useState("");
    const[description,setDescription] = useState("");
    const[startdate,setStartdate] = useState("");
    const[enddate,setEnddate] = useState("");
    const[flag,setFlag] = useState(0)
    const[data,setData] = useState([])
    let i = 0
    const handlesubmit = () => {
      setUniqueid(++i)
      const data ={
        uniqueid,activity,description,startdate,enddate
      }
      try{
        axios.post('http://localhost:8001/todo',data)
        alert("Successfully Submitted")
        setActivity("")
        setDescription("")
        setStartdate("")
        setEnddate("")
      }
      catch(err){
        console.log(err)
      }
    };
    const handleview = async () => {
  try {
    const result = await axios.get('http://localhost:8001/todo');
    setData(result.data);

    // 🔥 RESET FORM STATE
    setActivity("");
    setDescription("");
    setStartdate("");
    setEnddate("");
    setCurrid("");

    setFlag(1);
  } catch (err) {
    console.log(err);
  }
};

    const handleback = () => {
  try {
    setActivity("");
    setDescription("");
    setStartdate("");
    setEnddate("");
    setCurrid("");

    setFlag(0);
  } catch (err) {
    console.log(err);
  }
};

    const handledeleteflag = async (id) => {
  try {
    await axios.delete(`http://localhost:8001/todo/${id}`);
    alert("Deleted successfully");
    handleview(); // refresh list after delete
  } catch (err) {
    console.log(err);
  }
};
const handleupdate = async () => {
  try {
    const updatedData = {
      activity,
      description,
      startdate,
      enddate,
    };

    await axios.put(`http://localhost:8001/todo/${currid}`, updatedData);
    alert("Updated successfully");

    setActivity("");
    setDescription("");
    setStartdate("");
    setEnddate("");
    setFlag(1); // go back to view page
    handleview(); // refresh data
  } catch (err) {
    console.log(err);
  }
};
const handleupdateflag = (newid) => {
  try {
    const selectedTodo = data.find(item => item._id === newid);

    setCurrid(newid);
    setActivity(selectedTodo.activity);
    setDescription(selectedTodo.description);
    setStartdate(selectedTodo.startdate);
    setEnddate(selectedTodo.enddate);
    setFlag(2);
  } catch (err) {
    console.log(err);
  }
};

  return ( 
    <div className='body'>
        <h1>Welcome to my TO-DO-LIST Application</h1>
        {flag === 0 &&(
        <>
         <div className="inputs">
          <p>Add new activity/task to be scheduled</p>
          <input className='box' placeholder='Activity' value={activity} onChange={(e) => setActivity(e.target.value)}></input>
          <input className='box' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
          <input className='box' placeholder='Start Date' value={startdate} onChange={(e) => setStartdate(e.target.value)}></input>
          <input className='box' placeholder='End Date' value={enddate} onChange={(e) => setEnddate(e.target.value)}></input>
        </div>
        <div className='btn-box'>
          <button className='submit' onClick={handlesubmit}>Submit</button>
          <button className='view' onClick={handleview}>View To-Do-List</button>
        </div>
        </> 
        )}
        {flag === 1 && (
        <div>
           
           <div className='output'>
            <p>To-Do-List</p>{
           data.map((temp) => {
            return(
              <>
              <p className='final'><span className='incr'>{temp.uniqueid}. </span> Activity: <span className='out'>{temp.activity}</span></p>
              <p className='final'>Description: <span className='out'>{temp.description}</span></p>
              <p className='final'>Start Date: <span className='out'>{temp.startdate}</span></p>
              <p className='final'>End Date: <span className='out'>{temp.enddate}</span></p>
              <div className='btn2'>
                <button className='update' onClick={()=> handleupdateflag(temp._id)}>Update</button>
                <button className='delete' onClick={()=>handledeleteflag(temp._id)}>Delete</button>
              </div>
              <p className='final1'>***********************</p>
              </>
              
            )
          })
        }
        </div>
        <button className='goback' onClick={handleback}>Add new</button>
        </div>
      )}
    { flag ===2 && (
      
           data.map((temp) => {
              if (currid===temp._id){
            return(
        <>
          <div className="inputs">
            <p>Update activity/task</p>
            <input className='box' placeholder={temp.activity} value={activity} onChange={(e) => setActivity(e.target.value)}></input>
            <input className='box' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <input className='box' placeholder='Start Date' value={startdate} onChange={(e) => setStartdate(e.target.value)}></input>
            <input className='box' placeholder='End Date' value={enddate} onChange={(e) => setEnddate(e.target.value)}></input>
          </div>
          <div className='btn-box'>
            <button className='submit' onClick={handleupdate}>Submit</button>
            <button className='view' onClick={handleview}>View To-Do-List</button>
          </div>
        </>

    )}
       
  }
  ))}

    </div>
    )
  
}

export default Todo
