import { getReviewsByLocation, getRviewsByUserID } from "./review_crud.js";
import { getUser } from "./user_crud.js";

const cur_location = window.location.pathname.slice(1, -5);
const review_container = document.getElementById("review-container");
const review_list = await getReviewsByLocation(cur_location);

reviewsRender(review_list, review_container)

function reviewsRender(review_list, review_container){
    for (let i = 0; i < review_list.length; i++) {
        const curReviewObject = review_list[i];
        console.log("Printing Current Object:")
        console.log(curReviewObject)
        const cur_user_id = curReviewObject.user_id;
        let cur_user_name = getUser(cur_user_id)
        .then((user) => {
          return user.name;
        })
        // let cur_user = getUser(cur_user_id).then(res => console.log(res.name));
        console.log("Printing Current User");
        console.log(cur_user_name)
        const div = document.createElement('div');
        div.classList.add("review");
        div.innerHTML = review_create_html(i, curReviewObject);

        review_container.appendChild(div);
    }
}

function review_create_html(index, review_object){
    
    const image = ''; // TODO
    return `<div class="sm-img-rounded-container">
    <img class="selectDisable" src="./img/duck.jpeg">
  </div>

  <div class="review-flex-column-container">
    <a id="username" class="review-title">${review_object.user_name}</a>
    <a id="review-number" class="review-number">${review_object.review_num} Review</a>

    <div class="review-flex-row-container">
      <p class="review-rating">Rating:</p>` 
      + review_star_create(review_object.rating) 
      + `<p class="review-number left-margin">${review_object.created_date.slice(0, 10)}</p>
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
    <img class="selectDisable" src="./img/food.png">
  </div>`
}

function review_star_create(num){
    let result = ''
    for (let i = 0; i < num; i++) {
        result+= `<div class="sm-img-container">
        <img src="./img/star.png">
      </div>`
    }
    return result;
}