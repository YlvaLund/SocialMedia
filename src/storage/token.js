export async function retrieveToken() {
  // Check if we have a stored token
  // No stored token - check if we are logged in - or redirect
  // We are logged in but without token - retrieve a new token.
  // If all other failes - redirect to login and refresh!
  let token = await getToken();
  return token;
}

export function storeToken(token, expirationDate, name, email, avatar, banner) {
  let tokenObject = {
    token: token,
    exp: expirationDate,
    name: name,
    email,
    avatar,
    banner,
  };

  console.log(tokenObject);
  let stringToken = JSON.stringify(tokenObject);

  localStorage.setItem("token", stringToken);
}

function getToken() {
  try {
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Parse the token to the token object
      let tokenObject = JSON.parse(storedToken);
      let expiration = new Date(tokenObject.exp);
      let rightNow = new Date();
      if (expiration.getTime() > rightNow.getTime()) {
        return tokenObject.token;
      }
    }
  } catch (err) {
    console.error(err);
    console.error(err.response);
  }

  return;
}

export function getProfile() {
  try {
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Parse the token to the token object
      let tokenObject = JSON.parse(storedToken);
      return { name: tokenObject?.name, email: tokenObject?.email, avatar: tokenObject?.avatar, banner: tokenObject?.banner };
    }
  } catch (err) {
    console.error(err);
    console.error(err.response);
  }

  return;
}

// eslint-disable-next-line
function logout() {
  localStorage.clear();
}
