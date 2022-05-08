import { getReviewsByLocation, getRviewsByUserID } from "./review_crud.js";
import { getUserWithID } from "./user_crud.js";
import { getImage } from "./image.js";
import { getLoginUser } from "./user_crud.js";
const cur_location = window.location.pathname.slice(1, -5);
const review_container = document.getElementById("review-container");
const review_list = await getReviewsByLocation(cur_location);

if (getLoginUser() !== null) {
    const cur_user = await getLoginUser();
    const cur_user_id = cur_user._id;
    const navcontainer = document.getElementById("nav-bar");
    navbarlogin(navcontainer, cur_user_id);
}

export async function navbarlogin(navcontainer, cur_user_id) {
    navcontainer.innerHTML = "";
    navcontainer.innerHTML = navloginhtml(cur_user_id);
}

function navloginhtml(cur_user_id) {
    return `<ul>
        <li class="left"><a href="">Home</a></li>
        <li class="left"><a href="beclassNamere.html">Berkshire</a></li>
        <li class="left"><a href="haclassNamere.html">Hampshire</a></li>
        <li class="left"><a href="frclassNamen.html">Franklin</a></li>
        <li class="left"><a href="woclassNameer.html">Worcester</a></li>
        <li class="right"><a href="uclassNameome.html">${cur_user_id}</a></li>
        <li class="right"><a href="uclassNameome.html">Profile</a></li>
    </ul>`;
}

reviewsRender(review_list, review_container);

async function reviewsRender(review_list, review_container) {
    for (let i = 0; i < review_list.length; i++) {
        const curReviewObject = review_list[i];
        const cur_user_id = curReviewObject.user_id;
        const cur_user = await getUserWithID(cur_user_id);
        const user_reviews = await getRviewsByUserID(cur_user_id);
        const user_name = cur_user[0].username;
        const user_previous_review_nums = user_reviews.length;

        const image_URL = curReviewObject.review_img_id;
        curReviewObject.username = user_name;
        curReviewObject.review_num = user_previous_review_nums;

        const div = document.createElement("div");
        div.classList.add("review");
        div.innerHTML = await review_create_html(i, curReviewObject, image_URL);

        review_container.appendChild(div);
    }
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
  </div>

  <div class="review-pic selectDisable">
    <img class="selectDisable" src=${imageURL}>
  </div>`
    );
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
