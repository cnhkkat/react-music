const devBaseURL = 'https://demo-netease-cloud-music-api-cnhkkat.vercel.app/'
const proBaseURL = 'http://123.207.32.32:9001'
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 5000
