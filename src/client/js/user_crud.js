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
    const data = await response.json();
    document.cookie = `jwt_token=${data.token}`;
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
export async function getUserWithID(id) {
  const response = await fetch(`/user?id=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}
// JWT Token
export async function getUserWithToken(token) {
  const response = await fetch(`/user?token=${token}`, {
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

// check user login status
export function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}

export async function getLoginUser() {
  const jwt_token = getCookie('jwt_token');
  if (jwt_token === null) {
    location.replace("/login.html");
    // alert("Please first login!");
  }
  else {
    return (await getUserWithToken(jwt_token))[0];
  }
}