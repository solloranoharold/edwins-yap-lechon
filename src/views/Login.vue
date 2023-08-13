<template>
    <v-container fluid>
        <VerticalNavBar />
        <br/>
        <center>
            <v-flex md3 lg3 xs6 sm6>
                <v-card style="border:1px solid;" flat >
                    <v-card-text>
                        <h2>LOGIN</h2>
                        <h3>Sign in to continue</h3>
                        <br/><br/>
                        <label style="text-align:left;">EMAIL</label>
                        <v-text-field v-model="email" dark hide-details class="text" outlined dense  type="email"></v-text-field><br />
                        <label style="text-align:left;">PASSWORD</label>
                        <v-text-field @keypress.enter="login()" v-model="password" dark hide-details class="text" outlined dense  type="password"></v-text-field><br />
                        <br />
                        <v-btn  @click="login()" dark class="green darken-2">LOGIN</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </center>
    </v-container>
</template>

<script>
import VerticalNavBar from './VerticalNavBar.vue';
import axios from 'axios'
export default {
    components: {
        VerticalNavBar,
    },
    data: () => ({
        date:null,
        menu:false,
        email:'',
        password:''
    }),
    methods: {
        login() {
            if(!this.email || !this.password){
                alert('Please Complete Fields!')
                return false 
            }
            axios.get(`${this.api}login/${this.email}/${this.password}`).then(res=>{
                if(res.data){
                    if(res.data.length > 0 ){
                        // console.log(res.data[0])
                        this.$store.commit('STORE_USERINFO' , res.data[0])
                        alert('Welcome : ' + res.data[0].email)
                        setTimeout(() => {
                            if(res.data[0].type=='ADMIN') this.$router.push('/reports');
                            else this.$router.push('/')
                        }, 500);
                      
                    }else{
                        alert('No Account Found or Password not matched!')
                    }
                }
            })
        }
    },
}
</script>

<style>
    .text{
        background-color: rgb(161, 79, 24);
    }
</style>