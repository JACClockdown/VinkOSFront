<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'


const authStore = useAuthStore()
const form = ref({
    email:'',
    password:''
});
</script>
<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card border border-success">
                <div class="card-header">Login</div>
                <div class="card-body">
                    <form @submit.prevent="authStore.login(form)" method="post">
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-at">
                                    
                                </i>
                            </span>
                            <input autofocus type="email" v-model="form.email" class="form-control" placeholder="Email" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-at">
                                    
                                </i>
                            </span>
                            <input autofocus type="password" v-model="form.password" class="form-control" placeholder="Password" required>
                        </div>
                        <div class="d-grid col-10 mx-auto">
                            <button class="btn btn-success">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>