const registerForm = document.getElementById("registerForm")
const loginForm = document.getElementById ("loginForm")

registerForm.addEventListener("submit", async  (event) => {
   
      //מניעת ניקוי הטופס
    event.preventDefault();
    const newUser = {
        name : event.target[0].value,
        passwordHash : event.target[1].value
    }
    createuser(newUser); 
});

loginForm.addEventListener("submit", async  (event) => {
    //מניעת ניקוי הטופס 
    event.preventDefault();
    const loginUser = {
        name : event.target[0].value,
        passwordHash : event.target[1].value
    }
    loginAndcreateToken(loginUser); 
})
async function loginAndcreateToken(loginUser) {
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
    });
    const data = await response.json();
    if (data.success) {
        saveToken(data.token);
        window.location.href = "play.html";
    } else {
        userNotice("שם משתמש או סיסמה אינם תקינים");
    }
}
async function createuser(newUser) {
    const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
    const data = await response.json();
    const answer =""
    if (data.success) {
        answer = "המשתמש נוצר בהצלחה"
    } else {
        answer = "  חלה שגיאה בהוספת המשתמש"
    }
    userNotice(answer);
}
async function saveToken(token) {
    localStorage.setItem("token", token);
}
async function userNotice(data) {
  console.log(data);
  const notice = document.createElement("div");
  notice.classList.add("notice");
  notice.textContent = data;
  document.body.appendChild(notice);
  setTimeout(() => {
    notice.remove();
  }, 3000);
}
