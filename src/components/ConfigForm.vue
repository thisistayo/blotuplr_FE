<template>
    <div class="config-form">
        <h2>S3 Configuration</h2>
        <form @submit.prevent="saveConfig">
            <div>
                <label for="endpoint">Endpoint:</label>
                <input id="endpoint" v-model="formConfig.endpoint" required />
            </div>
            <button type="submit">Save Configuration</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ConfigForm',
    props: {
        config: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            formConfig: { ...this.config },
        };
    },
    methods: {
        saveConfig() {
            this.$emit('config-updated', { ...this.formConfig });
        },
    },
};
</script>


<style scoped>
.config-form {
    max-width: 400px;
    margin: 0 auto;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 5px;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
}
</style>