import { getReviewsByLocation } from "./review_crud.js";

const review_container = document.getElementById("review-container");
const review_list = await getReviewsByLocation('hampshire');

reviewsRender(review_list, review_container)

function reviewsRender(review_list, review_container){ 
    for (let i = 0; i < review_list.length; i++) {
        const curReviewObject = review_list[i];
        const div = document.createElement('div');
        div.classList.add("review");
        div.innerHTML = review_create_html(i, curReviewObject);
        review_container.appendChild(div);
    }
}

function review_create_html(index, review_object){
    
    const image = ''; // TODO
    return `<div class="sm-img-rounded-container">
    <img src="./img/duck.jpeg">
  </div>

  <div class="flex-column-container">
    <a id="username" class="review-title">${review_object.user_name}</a>
    <a id="review-number" class="review-number">${review_object.review_num} Review</a>

    <div class="flex-row-container">
      <p class="review-rating">Rating:</p>` 
      + review_star_create(review_object.rate) 
      + `<p class="review-number left-margin">${review_object.created_date}</p>
    </div>

    <div class="review-body-container">
      <p class="review-body">
        ${review_object.review_text}
      </p>
    </div>
  </div>

  <div class="review-pic">
    <img src="./img/food.png">
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