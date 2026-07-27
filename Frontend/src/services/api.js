import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function checkHealth() {
  const response = await client.get('/health')
  return response.data
}

export async function askQuestion(question) {
  const response = await client.post('/ask', { question })
  return response.data
}

export default client
