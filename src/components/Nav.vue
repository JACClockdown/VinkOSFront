<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div class="container-fluid" v-if="authStore.user">
            <p class="text-white mt-3">
                Welcome Back {{ authStore.user.name }}
            </p>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <RouterLink to="/home" class="nav-link">
                            Homeworks
                        </RouterLink>
                    </li>
                </ul>
                <form class="d-flex">
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click="authStore.logout()">Cerrar Sesion</button>
                </form>
            </div>
            
        </div>

        <div class="container-fluid"v-if="!authStore.user">
            <RouterLink  to='/register' class="btn btn-primary">Register</RouterLink>
            &nbsp;
            <RouterLink  to='/login' class="btn btn-primary ml-4">Login</RouterLink>

            <div class="collapse navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>