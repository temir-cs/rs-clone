function requestToServer(creds, path) {
  return fetch(`https://rscloneapi.herokuapp.com/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
      }).then((data) => data.json());
}

function getCredentials():{username:string, password:string} {
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    return { username, password };
  }

export { requestToServer, getCredentials };
