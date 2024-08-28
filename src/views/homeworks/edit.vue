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
        
        let rout = `api/homework/${route.params.id}`
        
        
        axios.get(rout).then( (response) => {
            if(response.status == 200){
                status.value = response.data.data.completed
                homeworkID.value = route.params.id
                homework.value = response.data.data
                load.value = true
            }
        }).catch( (errors) =>{
            console.log(errors)
        })
            
    }
    
)

const update_homework = async () => {
    
    let ruta = `api/homework/${homeworkID.value}`
    
    
    axios.put(ruta,homework.value).then( (response) => {
        if(response.data.data.homework == 1){
            show_alert(response.data.message,'success','')
            homework.title = ''
            homework.description = ''
            homework.created_homework_at = ''
            homework.completed = ''
            router.push('/home')
        }
        
    }).catch( (errors) =>{
        console.log(errors)
    })
       
        
}
const homeworkID = ref()
const status = ref()
const homework = ref({
    title: '',
    description: '',
    created_homework_at: '',
    completed: 1
})

const load = ref(false)

</script>
<template>
    <div class="container">
        <div class="card border border-success">
            <div class="card-header">Edit Homework {{ homework.id  }}</div>
            <div class="card-body">
                <form method="post" @submit.prevent="update_homework(homework)">
                    <fieldset>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Title</label>
                            <input type="text" v-model="homework.title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" required>
                        </div>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Description</label>
                            <textarea v-model="homework.description" class="form-control" id="exampleTextarea" rows="3" required></textarea>
                        </div>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Date</label>
                            <input type="date" v-model="homework.created_homework_at" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter date" required>
                        </div>
                        
                            <fieldset>
                                <legend class="mt-4">Status of Homework</legend>
                                <div class="form-check form-switch" v-if="status == 0">
                                    <input class="form-check-input" v-model="homework.completed" type="checkbox" id="flexSwitchCheckDefault">
                                    <label class="form-check-label" for="flexSwitchCheckDefault">turn off</label>
                                </div>
                                <div class="form-check form-switch" v-else>
                                    <input class="form-check-input" v-model="homework.completed"  type="checkbox" id="flexSwitchCheckChecked" checked="">
                                    <label class="form-check-label" for="flexSwitchCheckChecked">turn on</label>
                                </div>
                            </fieldset>


                        <div class="d-grid col-10 mx-auto mt-3">
                            <button class="btn btn-success">Update</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>