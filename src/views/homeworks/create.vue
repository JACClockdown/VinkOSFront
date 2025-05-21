<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from "vue-router";
const router = useRouter()
const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

const form = ref({ 
    title: '',
    description: '',
    created_homework_at: '',
    completed: ''
});

const create_homework = async (form) => {
    
    if(form.completed == ''){
        form.completed = false
    }
    
    
    axios.post('api/homework',form).then( (response) => {
        console.log(response)
        if(response.status == 200){
            form.title = ''
            form.description = ''
            form.created_homework_at = ''
            form.completed = ''
            router.push('/home')
        }
        
    }).catch( (errors) =>{
        console.log(errors)
    })
    
}
</script>
<template>
    <div class="container">
        <div class="card border border-success">
            <div class="card-header">Add New Homework</div>
            <div class="card-body">
                <form method="post" @submit.prevent="create_homework(form)">
                    <fieldset>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Title</label>
                            <input type="text" v-model="form.title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" required>
                        </div>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Description</label>
                            <textarea v-model="form.description" class="form-control" id="exampleTextarea" rows="3" required></textarea>
                        </div>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Date</label>
                            <input type="date" v-model="form.created_homework_at" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter date" required>
                        </div>
                        <fieldset>
                            <legend class="mt-4">Status of Homework</legend>
                            <div class="form-check form-switch">
                                <input class="form-check-input" v-model="form.completed" type="checkbox" id="flexSwitchCheckDefault" >
                                <label class="form-check-label" for="flexSwitchCheckDefault">Status</label>
                            </div>
                        </fieldset>


                        <div class="d-grid col-10 mx-auto mt-3">
                            <button class="btn btn-success">Create</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>