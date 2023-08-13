<template>
<v-container fluid>
  <v-row>
      <v-col cols="12">
         <VerticalNavBarVue v-if="userInfo == null || userInfo.type!='ADMIN'"/>
         <AdminNavBarVue v-if="userInfo && userInfo.type=='ADMIN'"/>
        </v-col>
        <v-col cols="12">
          <v-container fluid style="background-color:#B71C1C;">
              <h1 class="text-center" style="font-size:35px;color:white;"> BEST SELLERS </h1>
              <v-row class="green darken-2" no-gutters>
                <v-col v-for="(item , i ) in Products" :key="i">
                  <center>
                     <v-avatar
                      @click="orderNow()"
                      class="profile"
                      color="grey"
                      size="250"
                    >
                      <v-img :src="`${filelister}products/${item.img_product}`"></v-img>
                      <v-overlay absolute  class="d-none a">
                        {{item.product_name}}
                      </v-overlay>
                    </v-avatar>
                  </center>
                </v-col>
              </v-row>
          </v-container>
        </v-col>
  </v-row>
 
</v-container>
</template>

<script>

import AdminNavBarVue from './AdminNavBar.vue'
import VerticalNavBarVue from './VerticalNavBar.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    VerticalNavBarVue,AdminNavBarVue
  },
  data: () => ({
    Products:[],
    items: [
      {
        src: '../assets/referrence/IMG_3.jpg',
      },
      {
        src: '../assets/referrence/IMG_4.jpg',
      },
      {
        src:'../assets/referrence/IMG_5.jpg',
      },
      {
        src:'../assets/referrence/IMG_6.jpg',
      },
      {
        src:'../assets/referrence/IMG_7.jpg',
      },
      {
        src:'../assets/referrence/IMG_8.jpg',
      },
      {
        src:'../assets/referrence/IMG_6.jpg',
      },
    ],

  }),
  created(){
    this.loadProduct()
    this.loadMyCart()
    this.loadNotifications()
  },
  methods:{
    loadProduct(){
      axios.get(`${this.api}loadProducts`).then(res=>{
                if(res.data){
                    res.data.forEach(rec=>{
                        if(rec.category == 2 )  this.Products.push(rec);
                    })
                }
            })
    },
    orderNow(){
      if(this.userInfo){
        this.$router.push('/menu')
      }else{
        alert('Please login first')
        this.$router.push('/login')
      }
    },
  }
}
</script>

<style >


  .profile:hover .a{
    
    background:#c5cdc594;
    color:white;
    font-size:20px;
    padding-top:45%;

    display:block !important;
  }
</style>

