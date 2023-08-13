<template>
    <v-container fluid>
       
        <v-layout class="pt-4">
        <v-spacer/>
        <v-btn small v-if="addedit==true" @click="addedit = !addedit" dark color="primary" > <v-icon>mdi-eye</v-icon>SHOW MENU </v-btn>
        <v-btn small v-else @click="openAddEdit({})" dark color="success" > <v-icon>mdi-plus</v-icon>ADD NEW ITEMS</v-btn>
    </v-layout>
        <v-data-table dense :headers="Headers" :items="Shippings" v-if="addedit==false">
            <template v-slot:[`item.action`]="{item}">
                <v-btn @click="openAddEdit(item)" x-small dark color="success">edit</v-btn>
                <v-btn @click="deleteItem(item)" x-small dark color="red">delete</v-btn>
            </template>
        </v-data-table>

        <v-card flat dark color="transparent" v-else>
        <h2 class="text-center"> {{editedIndex == -1 ? 'ADD NEW ' : 'UPDATE'}} SHIPPING FEE</h2>
        <v-divider style="border:2px solid;"/>
        <center>    
           <v-flex md5 lg5 xs6 sm6>
                <label style="color:black;">MUNICIPALITY</label>
                <v-text-field dense hide-details class="text1" v-model="addObj.municipality"></v-text-field>
           </v-flex>
           <v-flex md5 lg5 xs6 sm6>
                <label style="color:black;">SHIPPING FEE</label>
                <v-text-field type="number" min="1" dense hide-details class="text1" v-model="addObj.fees"></v-text-field>
           </v-flex>
           <br/>
           <v-btn dark color="success" @click="insertUpdateFees()">save</v-btn>
        </center>
    </v-card>

    </v-container>

</template>

<script>
import axios from 'axios'
export default {
    components: {
      
    },
    data: () => ({
        Shippings:[],
        Headers:[
            {text:'Municipality',value:'municipality',align:'center'},
            {text:'Shipping Fee',value:'fees',align:'center'},
            {text:'Actions',value:'action' ,align:'right'}
        ],
        addedit:false ,
        editedIndex:-1,
        addObj:{}
    }),
    created(){
       this.loadShippings()
       this.loadNotifications()
    },
    methods:{
        openAddEdit(item){
            this.addedit = true 
            this.editedIndex = this.Shippings.indexOf(item)
            if(this.editedIndex==-1 ){
                this.addObj={}
                this.addObj.method = 0 
            }else{
                this.addObj = JSON.parse(JSON.stringify(item))
                this.addObj.method=1
            }
        },
        loadShippings(){
            axios.get(`${this.api}loadShippingFees`).then(res=>{
                if(res.data){
                    this.Shippings = res.data 
                }
            })
        },
        deleteItem(item){
            if(confirm('Are you sure you want to delete this ? ')){
                axios.get(`${this.api}deleteShippingFees/${item.shipping_id}`).then(res=>{
                if(res.data){
                alert(`Data has been deleted`)
                   this.loadShippings()
                }
            })
            }
        },
        insertUpdateFees(){
            if(!this.addObj.municipality || !this.addObj.fees){
                alert('Please complete fields!')
                return false 
            }

            if(this.editedIndex == -1 ){
                let index = this.Shippings.findIndex(x=>x.municipality.toUpperCase() == this.addObj.municipality.toUpperCase())
                if(index > -1 ){
                    alert("Data already exists!")
                    return false 
                }
            }

            axios.post(`${this.api}insertUpdateFees` , this.addObj).then(res=>{
                if(res.data){
                    alert(`Data has been ${this.editedIndex == -1 ? 'save' :'update'}d`)
                    this.addedit = false 
                    this.loadShippings()
                }
            })
        }
    }
}
</script>

<style>
    .text1{
        background-color: rgb(6, 121, 32);
    }
</style>