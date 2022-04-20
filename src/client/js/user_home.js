import { getUserReviews } from "./user_crud.js";
import { getReviewsByLocation, deleteReview } from "./review_crud.js";
import { getImage } from "./image.js";
import { deleteUser } from "./user_crud.js";

await reviewsRender();

async function reviewsRender() {
  const review_container = document.getElementById("review-container");
  review_container.innerHTML = "";
  const review_list = await getUserReviews("userId");
  for (let i = 0; i < review_list.length; i++) {
    const curReviewObject = review_list[i];
    const div = document.createElement('div');
    div.classList.add("review");
    div.innerHTML = await review_create_html(i, curReviewObject);
    review_container.appendChild(div);
    addButtonEvent(i, curReviewObject.id);
  }
}


function addButtonEvent(index, id) {
  document.getElementById(`edit-${index}`).addEventListener("click", async function (e) {
    window.localStorage.setItem('edit-review-id', id);
  });
  document.getElementById(`delete-${index}`).addEventListener("click", async function (e) {
    deleteReview({ id: id });
    await reviewsRender();
  });
}

async function review_create_html(index, review_object) {
  const imageURL = await getImage(review_object.review_img_id);

  return `<div class="sm-img-rounded-container">
    <img src="./img/duck.jpeg">
  </div>

  <div class="flex-column-container">
    <a id="username" class="review-title">${review_object.user_name}</a>
    <a id="review-number" class="review-number">${review_object.review_num} Review</a>

    <div class="flex-row-container">
      <p class="review-rating">Rating:</p>`
    + review_star_create(review_object.rating)
    + `<p class="review-number left-margin">${review_object.created_date.slice(0, 10)}</p>
    </div>

    <div class="review-body-container">
      <p class="review-body">
        ${review_object.review_text}
      </p>
    </div>

    <div class="review-edit flex-row-container">
      <a href="edit-review.html"><button class="button-to-link" id="edit-${index}">Edit</button></a>
      <a> | </a>
      <button class="button-to-link" id="delete-${index}">Delete</button>
    </div>
  </div>

  <div class="review-pic">
    <img src=${imageURL}>
  </div>`
}

function review_star_create(num) {
  let result = ''
  for (let i = 0; i < num; i++) {
    result += `<div class="sm-img-container">
        <img src="./img/star.png">
      </div>`
  }
  return result;
}

// TO DO document.addEventListener("delete-user", )