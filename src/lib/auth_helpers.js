const AUTH_BACKEND_BASE_URL = 'https://auth.corona-meldung.de';


export const user_count = () => {
  const endpoint = AUTH_BACKEND_BASE_URL + '/user_count';
  let request = new XMLHttpRequest();

  request.open('GET', endpoint, true);
  request.setRequestHeader('Content-Type', 'application/json');

  return new Promise((resolve, reject) => {
    request.onload = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);
          resolve(JSON.parse(request.responseText).user_count)
        }
        else {
          console.error(request.statusText);
          reject(request.statusText)
        }
      }
    };

    request.send(null);
  });
};




export const auth_register = (email) => {
  const endpoint = AUTH_BACKEND_BASE_URL + '/register';
  let request = new XMLHttpRequest();
  const postString = JSON.stringify({
    'email': email
  });
  request.open('POST', endpoint, true);
  request.setRequestHeader('Content-Type', 'application/json');

  return new Promise((resolve, reject) => {
    request.onload = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);
          resolve()
        } else if (request.status === 409) {
          console.warn("Duplicate E-Mail");
          reject('already_registered');
        }
        else {
          console.error(request.statusText);
          reject(request.statusText)
        }
      }
    };

    request.send(postString);
  });
};


export const auth_confirm = (email, activation_key) => {
  console.log(email, activation_key);
  const endpoint = AUTH_BACKEND_BASE_URL + '/confirm';
  let request = new XMLHttpRequest();
  const postString = JSON.stringify({
    'email': email,
    'activation_key': activation_key
  });
  request.open('POST', endpoint, true);
  request.setRequestHeader('Content-Type', 'application/json');

  return new Promise((resolve, reject) => {
    request.onload = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);
          resolve(JSON.parse(request.responseText).jwk_key)
        } else {
          console.error(request.statusText);
          reject()
        }
      }
    };

    request.send(postString);
  });
};




export const login_request = (email) => {
  const endpoint = AUTH_BACKEND_BASE_URL + '/login';
  let request = new XMLHttpRequest();
  const postString = JSON.stringify({
    'email': email
  });
  request.open('POST', endpoint, true);
  request.setRequestHeader('Content-Type', 'application/json');

  return new Promise((resolve, reject) => {
    request.onload = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);
          resolve()
        }
        else {
          console.error(request.statusText);
          reject(request.statusText)
        }
      }
    };

    request.send(postString);
  });
};

export const login_confirm = (email, login_token) => {
  console.log(email, login_token);
  const endpoint = AUTH_BACKEND_BASE_URL + '/confirmlogin';
  let request = new XMLHttpRequest();
  const postString = JSON.stringify({
    'email': email,
    'login_token': login_token
  });
  request.open('POST', endpoint, true);
  request.setRequestHeader('Content-Type', 'application/json');

  return new Promise((resolve, reject) => {
    request.onload = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);
          resolve(JSON.parse(request.responseText).jwk_key)
        } else {
          console.error(request.statusText);
          reject()
        }
      }
    };

    request.send(postString);
  });
};





