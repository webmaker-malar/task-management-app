import { useState } from "react"

function generateCaptcha(){
    const charactes = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let captcha = ""
    for(let i=0;i<6;i++){
        const RandomIndex=Math.floor(Math.random()*charactes.length)
        captcha+=charactes[RandomIndex]
    }
    return captcha
}
function Register({onRegister,pass,setPass,ontoLogin}){
        const[Fullname,setFullName]=useState("")
        const[username,setUsername]=useState("")
        const [captcha, setCaptcha] = useState(() => generateCaptcha())

        const [captchaInput, setCaptchaInput] = useState("")
        const[email,setEmail]=useState("")
        const[confirmpass,setconfirmPass]=useState("")

        function RegisterBtn(){
            if(Fullname.trim() === "" ) {
                alert("kindly fill the Fullname Field")
                return
            }
             if(username.trim() === "" ) {
                alert("kindly fill the username Field")
                return
            }
             if(email.trim() === "" ) {
                alert("kindly fill the email Field")
                return
            }
             if(confirmpass.trim() === "" ) {
                alert("kindly fill the confirmpass Field")
                return
            }
            
            if(pass.trim()===""){
                alert("kindly fill the password Field")
                return
            }
            if(pass.length > 8){
                alert("The password should contain 8 character ")
                return
            }
            if(pass !== confirmpass){
                alert("kindly enter right password that is matching orginal password")
                return
            }
        if(captchaInput.trim().toUpperCase() !== captcha) {
    alert("Invalid CAPTCHA. Please try again")
    setCaptcha(generateCaptcha())
    setCaptchaInput("")
    return
}
            const user = {
                Fullname,
                username,
                email
            }
            localStorage.setItem("User", JSON.stringify(user));
           


            onRegister()
            
            
        }
    return(

        <div className="Register">
                    <header className="top-navbar">

  <div className="brand">
    <img src="/task-logo.png" alt="Task Manager Logo" />

    <h2 className="logo">Task Manager</h2>

    <nav>
        <button onClick={ontoLogin} type="button">Login</button>
    </nav>
  </div>


</header>
<form> <div className="RWelcome">
        <h1>Welcome Back</h1>
          <img className="craionyy" src="craiyon_153257_image.png" alt="" />

    </div>
            <p>Register to Task Manager</p>
            <div className="lab">
            <div className="form-group">

            <label>FullName : </label>
            <input type="text" value={Fullname} placeholder="enter your Fullname" onChange={(e)=>setFullName(e.target.value)}/>
            </div>
            <div className="form-group">

            <label>UserName : </label>
            <input type="text" value={username} placeholder="enter your username" onChange={(e)=>setUsername(e.target.value)}/>
            </div>
                        
            <div className="form-group">

            <label>Email : </label>
            <input type="text" value={email} placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
            <div className="form-group">

            <label>Password : </label>
            <input type="password" value={pass} placeholder="enter your password" onChange={(e)=>setPass(e.target.value)}/>
            </div>
                        <div className="form-group">

            <label>ConfirmPassword : </label>
            <input type="password" value={confirmpass} placeholder="enter your confirmpass" onChange={(e)=>{
                setconfirmPass(e.target.value)
                }}/>
                            </div>
                  <div className="captcha-box">
    <span>{captcha}</span>
      <button className="Cbtn" type="button" onClick={()=>{
        setCaptcha(generateCaptcha())
        setCaptchaInput("")
    }}>
        <i className="fa-solid fa-rotate-right"></i>
    
        </button>
    <div className="ref">
         <input
    
    type="text"
    placeholder="Enter CAPTCHA"
    value={captchaInput}
    onChange={(e) => setCaptchaInput(e.target.value)}
/>
  
        </div>    
   

</div>

            </div>
              <button type="button" onClick={RegisterBtn}>Register</button>
        </form>
        </div>
          
    )
}
export default Register