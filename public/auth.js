const registerLink = document.querySelector('#register-link');
const loginLink = document.querySelector('#login-link');
const loginContainer = document.querySelector('#login-container');
const registerContainer = document.querySelector('#register-container');
const registerForm = document.querySelector('#register');
const loginForm = document.querySelector('#login');

window.addEventListener('load', () => {
  if (localStorage.getItem('user_access_id')) {
    window.location.replace('./stats.html');
  }
});

registerLink.addEventListener('click', () => {
  loginForm.reset();
  loginContainer.style.display = "none";
  registerContainer.style.display = "block"
});

loginLink.addEventListener('click', () => {
  registerForm.reset();
  registerContainer.style.display = "none"
  loginContainer.style.display = "block";
});

loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const user = {
    username: loginForm.username.value,
    password: loginForm.password.value
  }
  try {
    const res = await fetch(`/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(r => r.json());
    if (!res.error) {
      localStorage.setItem('user_access_id', res._id);
      window.location.replace('./stats.html');
    } else {
      alert(res.error);
    }
  } catch (err) {
    console.log(err);
  }
});

registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  let user = {};
  if (registerForm.name.value) {
    user.name = registerForm.name.value;
  }
  if (registerForm.surname.value) {
    user.surname = registerForm.surname.value;
  }
  user.username = registerForm.username.value;
  user.password = registerForm.password.value;
  try {
    const res = await fetch(`/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(r => r.json());
    if (!res.error) {
      registerForm.reset();
      registerContainer.style.display = "none"
      loginContainer.style.display = "block";
    } else {
      alert(res.error);
    }
  } catch (err) {
    console.log(err);
  }
});