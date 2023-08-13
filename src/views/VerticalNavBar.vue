<template>
    <div>
        <div class="green darken-2 d-md-block d-lg-block d-none">
            <center>
                <a @click="$router.push('/')" style="color:white;padding-left:30px;font-size:20px" dark>HOME</a>
                <a @click="$router.push('/story')" style="color:white;padding-left:30px;font-size:20px" dark>OUR STORY</a>
                <a @click="$router.push('/menu')" style="color:white;padding-left:30px;font-size:20px" dark>MENU</a>
                <!-- <a @click="$router.push('/price_list')" style="color:white;padding-left:30px;font-size:20px" dark>PRICE LIST</a> -->
            </center>
        </div>
        <div class="green darken-2 d-none d-md-none d-lg-none d-xl-none  d-xs-block d-sm-block">
            <center>
            <a @click="$router.push('/')" style="color:white;padding-left:30px;font-size:20px" dark>HOME</a>
            <a @click="$router.push('/story')" style="color:white;padding-left:30px;font-size:20px" dark>OUR STORY</a>
            <a @click="$router.push('/menu')" style="color:white;padding-left:30px;font-size:20px" dark>MENU</a>
            <!-- <a @click="$router.push('/price_list')" style="color:white;padding-left:30px;font-size:20px" dark >PRICE LIST</a> -->
        </center>
        </div>
        <v-container fluid style="background-color:#B71C1C;" v-if="$route.name=='Home'">
        <v-carousel hide-delimiters  cycle  
        hide-delimiter-background >
            <v-carousel-item v-for="(item , i ) in Products" :key="i" :src="`${filelister}products/${item.img_product}`">
                <v-overlay absolute>
                    <h2 style="color:white; " class=" text-center header">EDWIN YAP</h2>
                    <h4 style="color:white;" class="text-center banner1">LECHON</h4>
                </v-overlay>
            </v-carousel-item>
        </v-carousel>
    </v-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data: () => ({
        Products:[]
    }),
    created(){
        this.loadProducts()
    },
    methods:{
        loadProducts(){
            axios.get(`${this.api}loadProducts`).then(res=>{
                if(res.data){
                    this.Products = res.data
                }
            })
        }
    }
}
</script>
<style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
li{
    display:inline;
    float: left;
}
li a {
    display: block;
    padding: 8px;
    background-color:'';
}

</style>