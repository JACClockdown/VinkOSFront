<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { show_alert, confirmation } from "@/functions";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token
onMounted( ()=>{
    gethomeworks()
})
const homeworks = ref([])
const load = ref(false)
const gethomeworks =  async () => {
    axios.get('api/homeworks').then( (response) => {
        console.log(response.data.data)
        homeworks.value = response.data.data
        load.value = true
    }).catch( (errors) =>{
        console.log(errors)
    })
}
const deleteHomework = (id,name) => {
    confirmation(name, ('api/homework/'+id), '/home')
}
</script>
<template>
    <h4>
        List of Homeworks 
    </h4>
    <hr>
    <div class="row">
        <div class="col-md-4">
            <div class="d-grid col-10 ">
                <router-link to="/create/homework">
                    <button class="btn btn-info text-white">Add New Homework</button>
                </router-link>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="card border border-white text-center" v-if="!load">

        </div>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created Homework At</th>
                        <th scope="col">Status of Homework</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="homework in homeworks" :key="homework.id">
                        <td>
                            {{  homework.id }}
                        </td>
                        <td>
                            {{  homework.title }}
                        </td>
                        <td>
                            {{  homework.description }}
                        </td>
                        <td>
                            {{  homework.created_homework_at }}
                        </td>
                        <td v-if=" homework.completed == 0">
                            <span class="badge bg-danger">
                                Sin Completar
                            </span>
                        </td>
                        <td v-if=" homework.completed == 1">
                            <span class="badge bg-success">
                                Completado
                            </span>
                        </td>
                        <td>
                            <router-link :to="{ path:'edit/'+homework.id}" class="btn btn-warning">
                                <i class="fa-solid fa-edit"></i>
                                Edit
                            </router-link>
                            &nbsp;
                            <button class="btn btn-danger" @click="$event => deleteHomework(homework.id,homework.title)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>