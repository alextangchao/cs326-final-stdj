import { createReview } from "./review_crud.js";
import { uploadImage } from "./image.js";
import { getUserWithToken } from "./user_crud.js";

const ls = window.localStorage;
const IMAGE_ID = "image_id";

window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

const jwt_token =window.getCookie('jwt_token')
const cur_user = await getUserWithToken(jwt_token)
const cur_user_id = cur_user[0]._id;

function gather_review_info() {
    console.log("Gathering Information")
    return {
        user_id: cur_user_id,
        location: document.getElementById("diningHall").value,
        review_text: document.getElementById("comment").value,
        review_img_id: ls.getItem(IMAGE_ID),
        rating: document.getElementById("rating").value,
        visited_date: document.getElementById("date").value
    };
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

async function post_review() {
    const review = gather_review_info();
    
    const resp = await createReview(review);
    if (resp === null) {
        alert("Failed to post review! Please Try Again");
    }
    else {
        console.log("=====")
        console.log(review)
        window.location.href = `${review.location}.html`;
        ls.removeItem(IMAGE_ID)
    }
    
}

document.getElementById("img").addEventListener("change", process_img);
document.getElementById("post").addEventListener("click", post_review);