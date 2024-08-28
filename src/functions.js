import Swal from "sweetalert2";
import { nextTick } from "vue";
import { useAuthStore } from './stores/auth'
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const route = useRoute()
const router = useRouter()

export function show_alert( msj, icon, focus){
    if(focus !== ''){
        nextTick( () => focus.value.focus );
    }
    Swal.fire({
        title:msj,
        icon:icon,
        buttonsStyling:true
    });
}

export function confirmation(name, url, redirect){
    const alert = Swal.mixin({ buttonsStyling:true });
    alert.fire({
        title: 'Are you sure to delete ' +name+ ' ? ',
        icon: 'question',showCancelButton:true,

    }).then( (result) =>{ 
        if(result.isConfirmed){
            sendRequest('DELETE',{},url,redirect)
            
        }
    })
}


export async function sendRequest(method, params, url, redirect=''){
    const authStore = useAuthStore()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token
    let res;
    await axios({
        method:method,
        url:url,
        params:params
    }).then( (response) => {
        console.log(response)
        window.location.href = 'http://localhost:5173/home'
        
    }).catch( (errors) =>{
        console.log(errors)
    })
}