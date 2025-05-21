<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from "vue-router";
import { show_alert } from "@/functions";

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

onMounted(
    async () => {  
        
        let rout = `api/date/${route.params.id}`
        
        
        axios.get(rout).then( (response) => {
            if(response.status == 200){
                status.value = response.data.data.completed
                dateID.value = route.params.id
                date.value = response.data.data
                load.value = true
            }
        }).catch( (errors) =>{
            console.log(errors)
        })
            
    }
    
)

const update_date = async () => {
    
    let ruta = `api/date/${dateID.value}`
    
    
    axios.put(ruta,date.value).then( (response) => {
        console.log(response)
        if(response.data.data.date == 1){
            show_alert(response.data.message,'success','')
            date.name = ''
            date.phone = ''
            date.born_date = ''
            router.push('/home')
        }
        
    }).catch( (errors) =>{
        console.log(errors)
    })
       
        
}
const dateID = ref()
const status = ref()
const date = ref({
    name: '',
    phone: '',
    born_date: ''
})

const load = ref(false)
</script>
<template>
    <div class="container">
        <div class="card border border-success">
            <div class="card-header">Edit Date {{ date.name  }}</div>
            <div class="card-body">
                <form method="post" @submit.prevent="update_date(date)">
                    <fieldset>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
                            <input type="text" v-model="date.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" required>
                        </div>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Phone</label>
                            <input type="number" v-model="date.phone" class="form-control" placeholder="Enter Phone" required>
                        </div>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Date</label>
                            <input type="date" v-model="date.born_date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter date" required>
                        </div>
                        

                        <div class="d-grid col-10 mx-auto mt-3">
                            <button class="btn btn-success">Update</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>