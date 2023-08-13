<template>
    <v-container fluid>
        <VerticalNavBarVue v-if="userInfo == null || userInfo.type!='ADMIN'"/>
       
      <v-container>
        <v-btn block v-if="selectedItem.length > 0 " @click="dialog = !dialog" rounded dark color="green darken-2"><v-icon>mdi-cart</v-icon> PROCEED TO CHECK OUT  </v-btn>
        <v-btn block v-if="selectedItem.length > 0 " @click="deleteFromCart()" rounded dark color="red darken-2"><v-icon>mdi-delete</v-icon> DELETE CART  </v-btn>
        
        <br/><br/>
        <v-simple-table dense style=" border-collapse: collapse;">
        <thead>
            <tr>
                <th><input type="checkbox" class="larger" v-model="checkAll"/></th>
                <th class="text-center" >
                        IMAGE
                </th>
                <th class="text-center">NAME</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL PRICE </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item , i ) in MyCart" :key="i">
               <td > <input type="checkbox" :value="item" v-model="selectedItem" class="larger"/></td>
               <td align="center" style="padding:0px;">
               
                <v-img class="pr-5" max-width="100" :src="`${filelister}products/${item.img_product}`" />
                </td>
                <td align="center"><h3>{{ item.product_name }}</h3></td>
               <td align="center">{{ item.quantity }}</td>
                <td align="center">PHP : {{ item.total_price.toFixed(2) }}</td>
            </tr>
        </tbody>
        
       </v-simple-table>
       <TotalandDelivery :dialog="dialog" :data="selectedItem" :type="'cart'" @closeDialog="closeDialog"/>
      </v-container>
    <center v-if="MyCart.length == 0 "><v-icon x-large >mdi-eye</v-icon>NO ITEMS FOUND</center>
    </v-container>
</template>

<script>
import VerticalNavBarVue from './VerticalNavBar.vue';
import TotalandDelivery from './TotalandDelivery.vue'; 
import axios from 'axios'
export default {
    components: {
    VerticalNavBarVue,TotalandDelivery
  },
  created(){
    this.loadMyCart()
    this.loadNotifications()
  },
  watch:{
    checkAll(val){
        if(val == true ) this.selectedItem = this.MyCart;
        else this.selectedItem=[]
    }
  },
    data: () => ({
       checkAll:false , 
        selectedItem:[],
        dialog:false, 
   }),
   methods:{
    closeDialog(val){
        this.dialog = val 
        window.location.reload()
    },
    deleteFromCart(){
      axios.post(`${this.api}deleteToCart` , this.selectedItem).then(res=>{ 
        if(res.data){
          alert('Selected item has been deleted!')
          window.location.reload()
        }
      })
    }
   }
}
</script>

<style>
input.larger{
  width: 20px;
  height: 20px;
}
</style>