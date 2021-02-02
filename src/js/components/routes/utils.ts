function requestToServer(creds: {username:string, password:string}, path: string): Promise<any> {
  return fetch(`https://rscloneapi.glitch.me/${path}`, {
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
