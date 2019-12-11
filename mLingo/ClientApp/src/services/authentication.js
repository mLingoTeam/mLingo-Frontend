export const authenticationService = {
  register,
  logout
};

function register(username, email, password) {
  console.log(JSON.stringify({ username, email, password }));

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  };

  fetch(`http://localhost:5000/api/account/register`, requestOptions)
    .then(result => result.json())
    .then(user => {
      localStorage.setItem("currentUser", user.Response.Username);
      return user;
    });
}

function logout() {
  localStorage.removeItem("currentUser");
}
