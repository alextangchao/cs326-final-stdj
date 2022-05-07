import { registerUser } from "./user_crud.js";
import { uploadImage } from "./image.js";
import {process_img} from "./post_review.js";

async function getInfo() {
    const password = document.getElementById("Password").value;
    const confirmpassword = document.getElementById("ConfirmPassword").value
    const imgid = await process_img()
    if (password === confirmpassword) {
        return {
            
            username: document.getElementById("Username").value,
            password: document.getElementById("Password").value,
            img_id: imgid
        };
    } else {
        alert("Your password is different with confirm password!");
    }
}

document.getElementById("signup").addEventListener("click", async function() {
    const user = await getInfo();
    registerUser(user)
});