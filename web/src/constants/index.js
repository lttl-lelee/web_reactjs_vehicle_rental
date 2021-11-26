export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

export const StorageKeys = {
  USER: "user",
  TOKEN: "access_token",
};

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const NOTI = {
    container: "top-center",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],    
    slidingEnter: {
        duration: 300,
      },
      slidingExit: {
        duration: 300,
      },
}