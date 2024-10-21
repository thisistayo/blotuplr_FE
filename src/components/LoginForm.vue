<template>
  <div class="login-form">
    <h2>Access the File Upload System</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" class="login-btn">Login</button>
    </form>
  </div>
</template>

<script>
const API_URL = 'https://blotuplr.hbvu.su';
export default {
  name: 'LoginForm',
  methods: {
    async handleLogin() {
    try {
      const response = await fetch(API_URL + '/login', { // Use the actual URL where the /login endpoint is hosted
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      // Emit login success if authentication is valid
      this.$emit('login-success', { username: this.username });
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  },

  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #0056b3;
}

.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
