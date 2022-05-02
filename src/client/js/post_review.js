import { createReview } from "./review_crud.js";
import { uploadImage } from "./image.js";
import { getLoginUser } from "./user_crud.js";

const cur_user = await getLoginUser();
const cur_user_id = cur_user._id;

function gather_review_info() {
    console.log("Gathering Information")
    return {
        user_id: cur_user_id,
        location: document.getElementById("diningHall").value,
        review_text: document.getElementById("comment").value,
        rating: document.getElementById("rating").value,
        visited_date: document.getElementById("date").value
    };
}

export async function process_img() {
    const img_files = document.getElementById("img").files
    if (img_files === undefined || img_files.length === 0) {
        return null;
    }
    const img = img_files[0];
    const id = await uploadImage(img);
    if (id === null) {
        alert("Failed to upload img!")
        return null;
    }
    return id;
}

async function post_review() {
    const review = gather_review_info();
    review.review_img_id = await process_img();

    const resp = await createReview(review);
    if (resp === null) {
        alert("Failed to post review! Please Try Again");
    }
    else {
        console.log("=====")
        console.log(review)
        window.location.href = `${review.location}.html`;
    }

}

document.getElementById("post").addEventListener("click", post_review);