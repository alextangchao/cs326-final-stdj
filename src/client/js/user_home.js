import { getLoginUser } from "./user_crud.js";
import { deleteReview, getRviewsByUserID } from "./review_crud.js";
import { getImage } from "./image.js";
import { deleteUser } from "./user_crud.js";
import { navbarlogin } from "./diningHall.js";

const cur_user = await getLoginUser();
const cur_user_id = cur_user._id;
const navcontainer = document.getElementById("nav-bar");
navbarlogin(navcontainer, cur_user_id);
document.getElementById("user-name").innerText = cur_user.username;

document
    .getElementById("delete-user")
    .addEventListener("click", async () => deleteUser({ id: cur_user_id }));

await reviewsRender();

async function reviewsRender() {
    const review_container = document.getElementById("review-container");
    review_container.innerHTML = "";
    const review_list = await getRviewsByUserID(cur_user_id);
    const user_name = cur_user.username;
    const user_previous_review_nums = review_list.length;
    for (let i = 0; i < review_list.length; i++) {
        const curReviewObject = review_list[i];

        const image_id = curReviewObject.review_img_id;
        curReviewObject.username = user_name;
        curReviewObject.review_num = user_previous_review_nums;

        const div = document.createElement("div");
        div.classList.add("review");
        div.innerHTML = await review_create_html(i, curReviewObject, image_id);
        review_container.appendChild(div);

        addButtonEvent(i, curReviewObject._id);
    }
}

function addButtonEvent(index, id) {
    document
        .getElementById(`edit-${index}`)
        .addEventListener("click", async function (e) {
            window.localStorage.setItem("edit-review-id", id);
        });
    document
        .getElementById(`delete-${index}`)
        .addEventListener("click", async function (e) {
            deleteReview(id);
            await reviewsRender();
        });
}

async function review_create_html(index, review_object, image_id) {
    let imageURL = "./img/no_image.png";
    if (image_id !== undefined && image_id !== null) {
        imageURL = await getImage(image_id);
    }

    return (
        `<div class="sm-img-rounded-container">
            <img class="selectDisable" src="./img/duck.jpeg">
          </div>

          <div class="review-flex-column-container">
            <p id="username" class="review-title">${review_object.username}</a>
            <p id="review-number" class="review-number">${review_object.review_num} Review</a>

            <div class="review-flex-row-container">
              <p class="review-rating">Rating:</p>` +
        review_star_create(review_object.rating) +
        `<p class="review-number left-margin">${review_object.visited_date.slice(
            0,
            10
        )}</p>
            </div>

            <div class="review-flex-row-container">
              <p class="review-rating">Location: ${review_object.location}</p>
            </div>

            <div class="review-body-container">
              <p class="review-body">
                ${review_object.review_text}
              </p>
            </div>

            <div class="review-edit review-flex-row-container">
              <a href="edit-review.html"><button class="button-to-link" id="edit-${index}">Edit</button></a>
              <a> | </a>
              <button class="button-to-link" id="delete-${index}">Delete</button>
            </div>
          </div>

          <div class="review-pic selectDisable">
            <img class="selectDisable" src=${imageURL}>
          </div>`
    );

    //     `<div class="sm-img-rounded-container">
    //   <img src="./img/duck.jpeg">
    // </div>

    // <div class="flex-column-container">
    //   <a id="username" class="review-title">${review_object.username}</a>
    //   <a id="review-number" class="review-number">${review_object.review_num} Review</a>

    //   <div class="flex-row-container">
    //     <p class="review-rating">Rating:</p>`
    //   + review_star_create(review_object.rating)
    //   + `<p class="review-number left-margin">${review_object.visited_date.slice(0, 10)}</p>
    //   </div>

    //   <div class="review-body-container">
    //     <p class="review-body">
    //       ${review_object.review_text}
    //     </p>
    //   </div>

    //   <div class="review-edit flex-row-container">
    //     <a href="edit-review.html"><button class="button-to-link" id="edit-${index}">Edit</button></a>
    //     <a> | </a>
    //     <button class="button-to-link" id="delete-${index}">Delete</button>
    //   </div>
    // </div>

    // <div class="review-pic">
    //   <img src=${imageURL}>
    // </div>`
}

function review_star_create(num) {
    let result = "";
    for (let i = 0; i < num; i++) {
        result += `<div class="sm-img-container">
        <img src="./img/star.png">
      </div>`;
    }
    return result;
}
