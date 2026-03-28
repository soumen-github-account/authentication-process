
const registerForm = document.getElementById("registerForm")

if(registerForm){
    registerForm.addEventListener("submit", async(e)=>{
        e.preventDefault();

        const userName = document.getElementById("userName")?.value;
        const email = document.getElementById("email")?.value;
        const password = document.getElementById("password")?.value;

        console.log(userName, email, password);
        

        const res = await fetch("/auth/register", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({userName, email, password})
        })
        const data = await res.json()
        console.log(data);
        
        if(data.success){
            alert(data.message);
        } else{
            alert(data.message)
        }
    })  
}

const loginForm = document.getElementById("loginForm")

if(loginForm){
    loginForm.addEventListener("submit", async(e)=>{
        e.preventDefault();

        const userName = document.getElementById("userName")?.value;
        const password = document.getElementById("password")?.value;

        console.log(userName, password);
        

        const res = await fetch("/auth/login", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({userName, password})
        })
        const data = await res.json()
        console.log(data);
        
        if(data.success){
            alert(data.message);
        } else{
            alert(data.message)
        }
    })  
}

const logoutBtn = document.querySelector(".logoutBtn")

if(logoutBtn){
    logoutBtn.addEventListener('click', async(e)=>{
        console.log("click")
        const res = await fetch("/auth/logout", {
            method: "GET"
        })

        const data = await res.json();
        alert(data.message)
    })
}