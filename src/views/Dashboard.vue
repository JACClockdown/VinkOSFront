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
const dates = ref([])
const load = ref(false)
const gethomeworks =  async () => {
    axios.get('api/dates').then( (response) => {
        console.log(response.data.data)
        dates.value = response.data.data
        load.value = true
    }).catch( (errors) =>{
        console.log(errors)
    })
}
const deleteHomework = (id,name) => {
    confirmation(name, ('api/date/'+id), '/home')
}
</script>
<template>
    <h4>
        List of Dates 
    </h4>
    <hr>
    <div class="row">
        <div class="col-md-4">
            <div class="d-grid col-10 ">
                <router-link to="/create/date">
                    <button class="btn btn-info text-white">Add New Date</button>
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
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Born Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="date in dates" :key="date.id">
                        <td>
                            {{  date.id }}
                        </td>
                        <td>
                            {{  date.name }}
                        </td>
                        <td>
                            {{  date.phone }}
                        </td>
                        <td>
                            {{  date.born_date }}
                        </td>
                        <td>
                            <router-link :to="{ path:'edit/'+date.id}" class="btn btn-warning">
                                <i class="fa-solid fa-edit"></i>
                                Edit
                            </router-link>
                            &nbsp;
                            <button class="btn btn-danger" @click="$event => deleteHomework(date.id,date.name)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>