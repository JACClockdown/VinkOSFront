<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from "vue-router";
import { show_alert } from "@/functions";
const router = useRouter()
const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

const form = ref({ 
    name: '',
    phone: '',
    born_date: '',
});

const create_date = async (form) => {
    
    if(form.completed == ''){
        form.completed = false
    }
    
    
    axios.post('api/date',form).then( (response) => {
        console.log(response)
        if(response.status == 200){
            show_alert(response.data.message,'success','')
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
            <div class="card-header">Add New Date</div>
            <div class="card-body">
                <form method="post" @submit.prevent="create_date(form)">
                    <fieldset>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
                            <input type="text" v-model="form.name" class="form-control" placeholder="Enter Name" required>
                        </div>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Phone</label>
                            <input type="number" v-model="form.phone" class="form-control" placeholder="Enter Phone" required>
                        </div>
                        <div>
                            <label for="exampleInputEmail1" class="form-label mt-4">Date</label>
                            <input type="date" v-model="form.born_date" class="form-control" placeholder="Enter date" required>
                        </div>
                        <div class="d-grid col-10 mx-auto mt-3">
                            <button class="btn btn-success">Create</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>