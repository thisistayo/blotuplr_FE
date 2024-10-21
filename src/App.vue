<template>
  <div id="app">
    <LoginForm v-if="!userStore.isLoggedIn" @login-success="onLoginSuccess" />
    <template v-else>
      <ConfigForm v-if="currentView === 'config'" :config="config" @config-updated="updateConfig" />
      <UploadImage v-else-if="currentView === 'upload'" />
    </template>
  </div>
</template>

<script>
import { useSecureUserStore } from './composables/secureUserStore';
import LoginForm from './components/LoginForm.vue';
import ConfigForm from './components/ConfigForm.vue';
import UploadImage from './components/UploadImage.vue';

export default {
  name: 'App',
  components: {
    LoginForm,
    ConfigForm,
    UploadImage,
  },
  setup() {
    const userStore = useSecureUserStore();
    return { userStore };
  },
  data() {
    return {
      currentView: 'upload',
      config: {
        endpoint: 'https://play.min.io',
      },
    };
  },
  methods: {
    onLoginSuccess(credentials) {
      this.userStore.login(credentials);
      this.currentView = 'upload';
    },
    updateConfig(newConfig) {
      this.userStore.login({
        ...this.userStore.$state,
        ...newConfig,
      });
      this.currentView = 'upload';
    },
  },
};
</script>