import { readReview, updateReview } from "./review_crud.js";
import { uploadImage } from "./image.js";
import { getLoginUser } from "./user_crud.js";
import { navbarlogin } from "./diningHall.js";

const cur_user = await getLoginUser();
const cur_user_id = cur_user._id;
const navcontainer = document.getElementById("nav-bar");
navbarlogin(navcontainer, cur_user_id);
const review_id = window.localStorage.getItem("edit-review-id");
const review = await readReview(review_id);

document.getElementById("user-name").innerText = cur_user.username;
fillInData();

function fillInData() {
    document.getElementById("diningHall").value = review.location;
    document.getElementById("comment").value = review.review_text;
    document.getElementById("rating").value = review.rating;
    document.getElementById("date").value = review.visited_date;
}

function gather_review_info() {
    return {
        location: document.getElementById("diningHall").value,
        review_text: document.getElementById("comment").value,
        rating: document.getElementById("rating").value,
        visited_date: document.getElementById("date").value,
    };
}

// async function process_img() {
//     const img_files = document.getElementById("img").files
//     if (img_files === undefined || img_files.length === 0) {
//         return null;
//     }
//     const img = img_files[0];
//     const id = await uploadImage(img);
//     if (id === null) {
//         alert("Failed to upload img!")
//         return null;
//     }
//     return id;
// }

async function update_review() {
    const new_review = gather_review_info();
    new_review.review_id = review._id;
    // new_review.review_img_id = await process_img();

    const resp = await updateReview(new_review);
    if (resp === null) {
        alert("Failed to post review! Please Try Again");
    } else {
        window.localStorage.removeItem("edit-review-id");
        window.location.href = "user-home.html";
    }
}

document.getElementById("post").addEventListener("click", update_review);
