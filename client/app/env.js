export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'andrewgreenlaw.us.auth0.com'
export const audience = 'https://gregDemo.com'
export const clientId = 'PLtSKuaSsuaanmruITN4vXZPeAcCEauR'