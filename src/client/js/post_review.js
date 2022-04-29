import { createReview } from "./review_crud.js";
import { uploadImage } from "./image.js";

const ls = window.localStorage;
const IMAGE_ID = "image_id";

function gather_review_info() {
    return {
        user_id: 0, // process logic TBD
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
        window.location.href = `${review.location}.html`;
        ls.removeItem(IMAGE_ID)
    }
    
}

document.getElementById("img").addEventListener("change", process_img);
document.getElementById("post").addEventListener("click", post_review);