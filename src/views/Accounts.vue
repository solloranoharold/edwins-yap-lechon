<template>
  <v-container fluid>
    <VerticalNavBarVue v-if="userInfo == null || userInfo.type!='ADMIN'"/>

        <br/>
        <h2 class="text-center">ACCOUNTS</h2>

        <v-data-table dense :items="Accounts" :headers="Headers" >
            <template v-slot:[`item.status`]="{item}">
                <v-chip class="ma-2" text-color="white" :color="item.status==1 ? 'success' : 'red'">
                    {{item.status == 1 ?'Active':'Ban'}}
                </v-chip>
            </template>
            <template v-slot:[`item.action`]="{item}">
                <v-tooltip bottom v-if="item.status == 0 ">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="indigo" @click="updateStatus(item ,  1 )"  v-bind="attrs" v-on="on">mdi-toslink</v-icon>
                    </template>
                    <span>Activate</span>
                </v-tooltip>
                <v-tooltip bottom v-else-if="item.status == 1 ">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="red" @click="updateStatus(item ,  0 )"  v-bind="attrs" v-on="on">mdi-toslink</v-icon>
                    </template>
                    <span>Deactivate</span>
                </v-tooltip>
            </template>
        </v-data-table>

  </v-container>
</template>

<script>
import VerticalNavBarVue from './VerticalNavBar.vue'
import axios from 'axios'
export default {
    components:{
        VerticalNavBarVue
    },
    created(){
        this.loadAccounts()
    },
    data:()=>({
        Headers:[
            {text:'Fullname' , align:'center',value:'fullname'},
            {text:'Email',align:'left',value:'email'},
            {text:'Status',align:'center',value:'status'},
            {text:'Actions',align:'center',value:'action'}
        ],
        Accounts:[]
    }),
    methods:{
        loadAccounts(){
            axios.get(`${this.api}loadAccounts`).then(res=>{
                if(res.data){
                    this.Accounts = res.data.filter(rec=>{
                        return rec.fullname != 'ADMINISTRATOR'
                    })
                }
            })
        },
        updateStatus(item , val ){
            if(confirm('Are you sure you want to update this account ? ')){
                item.method =1 
                item.status = val 
                axios.post(`${this.api}addEditAccount` , item ).then(res=>{
                    if(res.data){
                        alert('Data has been updated!')
                        this.loadAccounts()
                    }
                })
            }
        }
    }
}
</script>

<style>

</style>