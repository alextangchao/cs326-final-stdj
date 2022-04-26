import { loginUser } from "./user_crud.js";

function getInfo() {
    return {
        username: document.getElementById("Username").value,
        password: document.getElementById("Password").value
    };
}

document.getElementById("login").addEventListener("click", async function() {
    const user = getInfo();
    loginUser(user)
});