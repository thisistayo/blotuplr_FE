<template>
  <div class="bucket-list">
    <h2>MinIO Bucket Lister</h2>
    <button @click="listBuckets">List Buckets</button>
    <div v-if="buckets.length">
      <h3>Buckets:</h3>
      <ul>
        <li v-for="bucket in buckets" :key="bucket.Name">
          {{ bucket.Name }}
        </li>
      </ul>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { useSecureUserStore } from '../composables/secureUserStore';
import AWS from 'aws-sdk';

export default {
  name: 'BucketList',
  setup() {
    const userStore = useSecureUserStore();
    return { userStore };
  },
  data() {
    return {
      buckets: [],
      error: null,
    };
  },
  methods: {
    listBuckets() {
      console.log('Access Key:', this.userStore.accessKey);
      console.log('Secret Key:', this.userStore.secretKey);
      console.log('Endpoint:', this.userStore.endpoint);

      const s3 = new AWS.S3({
        accessKeyId: this.userStore.accessKey,
        secretAccessKey: this.userStore.secretKey,
        endpoint: this.userStore.endpoint,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      });

      s3.listBuckets((err, data) => {
        if (err) {
          this.error = `Error: ${err.message}`;
          console.error('Error:', err);
        } else {
          console.log(data)
          this.buckets = data.Buckets;
          this.error = null;
        }
      });
    },
  },
};
</script>
  
  <style scoped>
  .bucket-list {
    max-width: 600px;
    margin: 0 auto;
  }
  
  button {
    background-color: #28a745;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  </style>