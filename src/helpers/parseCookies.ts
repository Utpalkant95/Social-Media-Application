function parseCookies(cookies: string | null) {
    if (!cookies) return {};
    return Object.fromEntries(
      cookies.split('; ').map(cookie => {
        const [key, value] = cookie.split('=');
        return [key, decodeURIComponent(value)];
      })
    );
  }
  
  export default parseCookies