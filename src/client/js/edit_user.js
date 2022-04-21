import {getUser, updateUser} from "./user_crud.js";
import {uploadImage} from "./image.js";

const ls = window.localStorage;
const IMAGE_ID = "image_id";

function getUpdateInfo() {
    const password = document.getElementById("Password").value;
    const confirmpassword = document.getElementById("ConfirmPassword").value
    if (password === confirmpassword) {
        return {
            user_id: 0,
            username: document.getElementById("Username").value,
            password: document.getElementById("Password").value,
            confirmpassword: document.getElementById("ConfirmPassword").value,
            review_img_id: ls.getItem(IMAGE_ID),
        };
    } else {
        alert("Your password is different with confirmpassword!");
    }
}

async function process_img() {
    const img = document.getElementById("img").files[0];
    const id = await uploadImage(img);
    if (id !== null) {
        ls.setItem(IMAGE_ID, id);
    } else {
        alert("Failed to upload img!")
    }
}

const user = getUpdateInfo();

document.getElementById("img").addEventListener("change", process_img);
document.getElementById("submit").addEventListener("click", updateUser(user))
document.getElementById("user-name").innerText = (await getUser("id")).name;