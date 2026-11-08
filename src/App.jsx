import { useState ,useEffect} from "react";
import Login from "./Login";
import "./App.css";
import Register from "./Register";
function App() {
          

  const [inp, setInp] = useState("");
  const [showRegister, setshowRegister] = useState(
  !localStorage.getItem("User")
);const [loginName, setLoginName] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("User"));
    return savedUser ? savedUser.username : "";
});

const [showlogin, setshowLogin] = useState(
  Boolean(localStorage.getItem("User")) &&
  localStorage.getItem("isLoggedIn") !== "true"

);
const [isAuthenticated, setIsAuthenticated] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);
  const[passWord,setPassWord]=useState("")

  const [tasks, setTasks] = useState(()=>{
  try{
    const SavedTasks=localStorage.getItem("tasks")
    const parsedTasks = SavedTasks ? JSON.parse(SavedTasks):[];
    return Array.isArray(parsedTasks) ? parsedTasks :[]
  }
  catch(error){
     return[] 
  }
  });
 
  const[editid,setEditid]=useState(null)
  const[search,setSearch]=useState("")
  const[filter,setFilter]=useState("All")
  const [priority, setPriority] = useState("Medium");
  const [priorityFilter, setPriorityFilter] = useState("All");
  function handleAdd() {
    if (inp.trim() === "") {
        alert("Please enter a task!");
      return;
    }
    const duplicate=tasks.some((t)=>t.taskname.toLowerCase()===inp.trim().toLowerCase() && t.id!==editid)
        if (duplicate) {
      alert("Task already exists!");
      return;
    }
    if(editid !== null){
         setTasks((prev)=>prev.map((p)=>{
        if(p.id === editid){
            return{
                ...p,
                taskname:inp,
                priority:priority
                
            }

        }
        return p
    }))
    setEditid(null)
    setPriority("Medium")

    }
    else{
        setTasks([
      ...tasks,
      {
        id: Date.now(),
        taskname: inp,
        completed: false,
        priority:priority
      }
    ]);

    }
    setInp("");

    
  }
  function handleComplete(id){
    setTasks((prev)=>prev.map((p)=>{
        if(p.id === id){
            return{
                ...p,
                completed:!p.completed
            }
        }
        return p
    })

    )
  }
  function handleDelete(id){
    setTasks((prev)=>prev.filter((p)=>p.id!==id))
  }
//   function SearchBox() {
//   return tasks.filter((t) =>
//     t.taskname.toLowerCase().includes(
//       search.toLowerCase()
//     )
//   );
// }
// function FilterSearch(){
//   return tasks.filter((t)=>{
//     if(filter==="Completed"){
//       return t.completed===true
//     }
//      if (filter === "Pending") {
//       return t.completed === false;
//     }
//     return true
//   }
//   )
// }
function PrioritMgmt(){
  return tasks.filter((t)=>{
    if(priorityFilter === "High"){
      return t.priority === "High"
    }
     if (priorityFilter === "Medium") {
      return t.priority === "Medium";
    }
    if(priorityFilter==="Low"){
      return t.priority === "Low"
    }
    return true
  })
}
function cancelEdit(){
  setInp("")
  setEditid(null)
  setPriority("Medium")
}
useEffect(()=>{
  try{
    localStorage.setItem("tasks",JSON.stringify(tasks))

  }
  catch(error){
    console.error("Unable to save tasks:", error);

  }
},[tasks])


const pendingTasks=tasks.filter((t)=>t.completed === false)
const PendingCount=pendingTasks.length
const CompletedTasks=tasks.filter((t)=>t.completed===true)
const completedCount=CompletedTasks.length
const totalTasks = tasks.length;

function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  setIsAuthenticated(false);
  setshowLogin(true);
}
if(showRegister){
  return <Register setPass={setPassWord}   pass={passWord} onRegister={()=>{
    setshowRegister(false)
    setshowLogin(true)
    
  }}
  ontoLogin={()=>{
      setshowLogin(true)
      setshowRegister(false)
    }}
  />
}

if (showlogin) {
  return <Login
    registeredPass={passWord}
    onLogin={() => {
      localStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true);
      setshowLogin(false);
    }}
    onGoToRegister={() => {
      setshowLogin(false);
      setshowRegister(true);
    }}
  />;
}


  return (
    <div className="app-layout">
     <header className="top-navbar">

  <div className="brand">
    <img src="/task-logo.png" alt="Task Manager Logo" />

    <h2 className="logo">Task Manager</h2>
  </div>

  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>

</header>
  
    <main className="app-main">
<div className="welcome">
  <h1 >Welcome {loginName} </h1> 
  <img className="craion" src="craiyon_153257_image.png" alt="" />
</div>

<div className="stats-container">

  <div className="stat-card total-card">
    <span>📋</span>
    <h3>Total Tasks</h3>
    <h2>{totalTasks}</h2>
  </div>

  <div className="stat-card pending-card">
    <span>⏳</span>
  <h3>Pending Tasks</h3>
    <h2>{PendingCount}</h2>
  </div>

  <div className="stat-card completed-card">
    <span>✅</span>
    <h3>Completed Tasks</h3>
    <h2>{completedCount}</h2>
  </div>

</div>
      <h3>Search </h3>
<input
  type="text"
  placeholder="Search tasks..."  
  value={search}
  onChange={(event) => setSearch(event.target.value)}
/>
 <button onClick={()=>setFilter("Completed")}>Completed</button>
               <button  onClick={()=>setFilter("Pending")}>pending</button>
               <button  onClick={()=>setFilter("All")}>All</button>
              <h3>Priority  </h3>
               <button onClick={()=>setPriorityFilter("High")}>High</button>
               <button onClick={()=>setPriorityFilter("Medium")}>Medium</button>
               <button onClick={()=>setPriorityFilter("Low")}>Low</button>
               <button onClick={() => setPriorityFilter("All")}>All Priorities</button>
      <h3>Add your Task and leave the stress of managing!</h3>

      <input
        value={inp}
        onChange={(event) => setInp(event.target.value)}
        type="text"
        placeholder="Enter your Task"
      />
      <select value={priority}
      onChange={(e)=>setPriority(e.target.value)} >
        <option value="High">High</option>
                <option value="Low">Low</option>
                        <option value="Medium">Medium</option>


      </select>

      <button onClick={handleAdd}>{editid !== null ? "Update Task": "Add Task"}</button>
      <button onClick={()=>{
        if(window.confirm("Delete All Task ?")){
          setTasks([])
          setEditid(null)
        }
      }}>Clear ALL</button>

      
      <div className="powerup">
  <div className="powerup-content">
    <h2>Get Ready, Finish Off the Tasks!</h2>
    <h3>Let's do this, {loginName} 🚀</h3>
    <p>One task at a time. You're doing great!</p>
  </div>

  <img
    src="/funny-orange-purple-superhero-flying-cartoon-illustration_1120554-69999.avif"
    alt="Task superhero"
  />
</div>
      

      {PrioritMgmt().filter(
        (t)=> t.taskname.toLowerCase().includes(search.toLowerCase())).filter(
          (t)=>{
            if(filter==="Completed"){
      return t.completed===true
    }
     if (filter === "Pending") {
      return t.completed === false;
    }
    return true
            
            }).map((t) => (
<div
  className="task-card"
  key={t.id}
  style={{
    backgroundColor: t.completed
      ? "green"
        :  "#171a35"
  }}
>               <p style={{textDecoration:t.completed ? "line-through":"none"}}> {t.taskname}</p>
               <p>{t.priority}</p>
               <button  onClick={()=>handleComplete(t.id)}>complete</button>
               <button onClick={()=>{
                setInp(t.taskname)
                setEditid(t.id)
                setPriority(t.priority)                
                }}>Edit</button>
{editid !== null && (
  <button onClick={cancelEdit}>Cancel Edit</button>
)}               <button onClick={()=>handleDelete(t.id)}>Delete</button>
              
               <p >Status:{t.completed ? " completed" : "pending"}</p>
               

    </div>
      ))}
      </main>
    </div>
  );
}

export default App;
