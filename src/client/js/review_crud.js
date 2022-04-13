// import { response } from "express";

export async function updateReview(review) {
  const response = await fetch(`/review/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  const data = await response.json();
  return data;
}

export async function deleteReview(review) {
  const response = await fetch(`/review/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  const data = await response.json();
  return data;
}

export async function createReview(review) {
  const response = await fetch(`/review/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  const data = await response.json();
  return data;
}

export async function readReview(review_id) {
  const response = await fetch(`/review?id=${review_id}`, {
    method: 'GET'
  });
  const data = await response.json();
  return data;
}

export async function getReviewsByLocation(review_location) {
  const response = await fetch(`/review/location?name=${review_location}`,{
    method: 'GET'
  });
    const data = await response.json();
    return data;
}