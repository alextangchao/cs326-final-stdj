import {loginUser, registerUser} from "./user_crud.js";
function getRegisterInfo() {
    const password = document.getElementById("Password").value;
    const confirmpassword = document.getElementById("ConfirmPassword").value
    if (password === confirmpassword) {
        return {
            user_id: 0,
            username: document.getElementById("Username").value,
            password: document.getElementById("Password").value,
            confirmpassword: document.getElementById("ConfirmPassword").value
        };
    } else {
        alert("Your password is different with confirmpassword!");
    }
}

function getLoginInfo() {
    const password = document.getElementById("Password").value;
    const confirmpassword = document.getElementById("ConfirmPassword").value
    if (password === confirmpassword) {
        return {
            user_id: 0,
            username: document.getElementById("Username").value,
            password: document.getElementById("Password").value,
        };
    } else {
        alert("Your password is different with confirmpassword!");
    }
}

const user = getRegisterInfo();
const loginuser = getLoginInfo();

document.getElementById("submit").addEventListener("click", registerUser(user))
document.getElementById("login").addEventListener("click", loginUser(loginuser))