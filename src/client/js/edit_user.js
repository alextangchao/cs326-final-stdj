import {getUser, updateUser} from "./user_crud.js";
import {uploadImage} from "./image.js";
import {process_img} from "./post_review.js";



async function getUpdateInfo() {
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
        alert("Your password is different with confirmpassword!");
    }
}


const user = await getUpdateInfo();


document.getElementById("submit").addEventListener("click", updateUser(user))
