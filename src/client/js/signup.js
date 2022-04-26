import { registerUser } from "./user_crud.js";

function getInfo() {
    const password = document.getElementById("Password").value;
    const confirmpassword = document.getElementById("ConfirmPassword").value
    if (password === confirmpassword) {
        return {
            username: document.getElementById("Username").value,
            password: document.getElementById("Password").value
        };
    } else {
        alert("Your password is different with confirm password!");
    }
}

document.getElementById("signup").addEventListener("click", async function() {
    const user = getInfo();
    registerUser(user)
});