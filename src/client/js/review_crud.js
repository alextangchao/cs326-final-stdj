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