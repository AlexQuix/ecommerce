export function setTokenCookie(token:string){
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/`;
}


export function getTokenCookie() {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
    if (!tokenCookie) {
      return null;
    }
  
    const token = tokenCookie.split('=')[1];
    return token;
}

export function deleteTokenCookie() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}