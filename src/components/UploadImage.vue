<template>
  <div class="upload-image">
    <h2>Upload Image</h2>

    <!-- Show loading or error messages -->
    <div v-if="loading" class="loading">Loading buckets...</div>
    <div v-if="error" class="error">Error: {{ error }}</div>

    <!-- Only show form when loading is complete and no errors -->
    <form v-if="!loading && !error" @submit.prevent="uploadFile" class="upload-form">
      <div class="form-group">
        <label for="bucket">Select a Bucket:</label>
        <select id="bucket" v-model="selectedBucket" required>
          <option value="">Select a bucket</option>
          <option v-for="bucket in buckets" :key="bucket" :value="bucket">
            {{ bucket }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="file">Select File:</label>
        <input type="file" id="file" @change="onFileSelected" accept="image/*" required />
      </div>

      <div class="form-group">
        <label for="bucketPath">Path within Bucket (optional):</label>
        <input id="bucketPath" v-model="bucketPath" type="text" placeholder="folder/subfolder/" />
      </div>

      <div class="form-group">
        <label for="newFileName">File Name (optional):</label>
        <input id="newFileName" v-model="newFileName" type="text" placeholder="Enter new file name" />
      </div>

      <button type="submit" class="submit-btn" :disabled="!selectedBucket || !selectedFile">Upload</button>
    </form>
  </div>
</template>

<script>
const API_URL = 'https://blotuplr.hbvu.su';

export default {
  data() {
    return {
      buckets: [], // Holds the fetched bucket names (as strings)
      selectedBucket: '',
      selectedFile: null,
      bucketPath: '',
      newFileName: '',
      loading: true, // To manage loading state
      error: null, // To store error message if fetch fails
    };
  },
  methods: {
    async fetchBuckets() {
      try {
        // Fetch buckets from backend (expecting an array of strings)
        const response = await fetch(API_URL + '/buckets');
        if (!response.ok) {
          throw new Error('Failed to fetch buckets');
        }

        const data = await response.json();
        console.log('Fetched buckets:', data); // Check the response
        this.buckets = data;
      } catch (err) {
        this.error = err.message;
        console.error('Error fetching buckets:', err);
      } finally {
        this.loading = false;
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile || !this.selectedBucket) {
        alert('Please select a bucket and a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('bucket', this.selectedBucket);
      formData.append('folderPath', this.bucketPath);
      formData.append('newFileName', this.newFileName || this.selectedFile.name);

      try {
        const response = await fetch(API_URL + '/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('File upload failed');
        }

        alert('File uploaded successfully');
      } catch (err) {
        alert('Upload error: ' + err.message);
        console.error('Error during file upload:', err);
      }
    }
  },
  mounted() {
    this.fetchBuckets();
  }
};
</script>

<style scoped>
.upload-image {
  max-width: 500px;
  margin: 0 auto;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #343a40;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  color: #dc3545;
}

form.upload-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .upload-image {
    padding: 15px;
  }

  h2 {
    font-size: 1.25rem;
  }

  .form-group label {
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group select {
    font-size: 0.9rem;
  }

  .submit-btn {
    font-size: 0.9rem;
  }
}
</style>
