import { useState } from "react"
import "./App.css";
function Login({onLogin, registeredPass,onGoToRegister }){
    const[name,setName]=useState("")
    const[pass,setPass]=useState("")
    const SavedUser = JSON.parse(localStorage.getItem("User"));

    function LoginBtn(){

        if(name.trim() === "" ) {
            alert("kindly fill the name Field")
            return
        }
        if(pass.trim()===""){
            alert("kindly fill the password Field")
            return
        }
        
        if(!SavedUser){
            alert("please Register first")
            return
        }
        if (name.trim() !== SavedUser.username) {
            alert("Username not registered!");
            return;
        }
        if(pass!==registeredPass){
            alert("Invalid Password,please try again!")
            return
        }
        
        onLogin()
        
    }
    // function Loginn(){
    //     if(username !==name && password!==pass){
    //         alert("The username is Registerd ,kindly Register")
    //     }
    // }
    return(

 <div className="former">
        <header className="top-navbar">

  <div className="brand">
    <img src="/task-logo.png" alt="Task Manager Logo" />

    <h2 className="logo">Task Manager</h2>
  </div>

              <button type="button" onClick={onGoToRegister}>
  Register
</button>

</header>

<form >
    <div className="LWelcome">
        <h1>Welcome Back</h1>
          <img className="craiony" src="craiyon_153257_image.png" alt="" />

    </div>
            
            <p>Login to your Task Manager</p>
            <label>UserName : </label>
            <input type="text" value={name} placeholder="enter your username" onChange={(e)=>setName(e.target.value)}/>
            <label htmlFor="">Password :</label>
            <input type="password" value={pass} placeholder="enter your password" onChange={(e)=>setPass(e.target.value)}/>
            <button type="button" onClick={LoginBtn} loginName={name}>Login</button>

        </form>
        </div>
        
        
    )
}
export default Login