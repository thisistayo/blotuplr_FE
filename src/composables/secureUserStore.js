import { ref } from 'vue'
import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'

export const useSecureUserStore = defineStore('secureUser', () => {
  const isLoggedIn = ref(false)
  const accessKey = ref('')
  const secretKey = ref('') // This will only be in memory
  const endpoint = ref('')
  const encryptedData = ref(null)

  const login = (credentials) => {
    isLoggedIn.value = true
    accessKey.value = credentials.accessKey
    secretKey.value = credentials.secretKey
    endpoint.value = credentials.endpoint
  }

  const setSecretKey = (key) => {
    secretKey.value = key
  }

  const encryptSensitiveData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey.value).toString()
    encryptedData.value = encrypted
  }

  const decryptSensitiveData = () => {
    if (encryptedData.value) {
      const decrypted = CryptoJS.AES.decrypt(encryptedData.value, secretKey.value)
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
    }
    return null
  }

  const logout = () => {
    isLoggedIn.value = false
    accessKey.value = ''
    secretKey.value = '' // Clear from memory
    endpoint.value = ''
    encryptedData.value = null
  }

  return {
    isLoggedIn,
    accessKey,
    secretKey,
    endpoint,
    login,
    setSecretKey,
    encryptSensitiveData,
    decryptSensitiveData,
    logout
  }
})