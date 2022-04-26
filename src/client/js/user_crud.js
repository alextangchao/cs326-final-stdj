export async function updateUser(user) {
  const response = await fetch(`/user/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}

export async function deleteUser(user) {
  const response = await fetch(`/user/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}

//user login
export async function loginUser(user) {
  const response = await fetch(`/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.status === 401) {
    alert("Incorrect login credientials");
  } else {
    location.replace("/index.html");
  }
}

//register
export async function registerUser(user) {
  const response = await fetch(`/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    alert("Signup successful!");
  }
}

//get user
export async function getUser(id) {
  const response = await fetch(`/user?id=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export async function getUserReviews(id) {
  const response = await fetch(`/user/reviews?id=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}