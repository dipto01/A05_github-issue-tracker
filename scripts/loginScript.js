// login verifier
let loginBtn = document.getElementById('login-btn')
loginBtn.addEventListener("click", () =>{
    console.log("login Clicked!")
    // s-1 get username
    let userId = document.getElementById('user-Id')

    // s-2 get pass
    let pass = document.getElementById('pass')

    //verify upon click!
    if(userId.value == "admin" && pass.value == "admin123"){
        window.location.assign("./home.html")
    }
    else alert("Wrong Credentials!")
})
