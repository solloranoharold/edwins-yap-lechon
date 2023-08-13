<template>
    <v-container>
        <!-- <span>Date : {{getDate}}</span> -->
        <h2 class="text-center">Total Sales as of {{getMonth}} {{$route.params.year}} </h2> <v-btn small @click="printRecord()" v-if="isPrint==false">Print </v-btn>
        <v-divider style="border:1px solid;"/>
        <v-simple-table dense>
            <thead>
                <tr>
                    <th>Invoice</th>
                     <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item , i ) in Records" :key="i">
                    <td v-if="item && item.invoice_id">{{item.invoice_id}}</td>
                    <td v-if="item && item.total_price">₱{{item.total_price.toFixed(2)}}</td>
                </tr>
                <tr>
                    <td align="left">Total</td>
                    <td>   <span style="font-weight:bold;">₱{{total_sales.toFixed(2)}}</span></td>
                </tr>
            </tbody>
        </v-simple-table>

     
    </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    data:()=>({
        isPrint: false ,
        Records:[],
        total_sales: 0,
         Months:[ 
            {x:0,month:'01',str:'JANUARY' },
            {x:0,month:'02',str:'FEBRUARY' },
            {x:0,month:'03',str:'MARCH' },
            {x:0,month:'04',str:'APRIL' },
            {x:0,month:'05',str:'MAY' },
            {x:0,month:'06',str:'JUNE' },
            {x:0,month:'07',str:'JULY' },
            {x:0,month:'08',str:'AUGUST' },
            {x:0,month:'09',str:'SEPTEMBER' },
            {x:0,month:'10',str:'OCTOBER' },
            {x:0,month:'11',str:'NOVEMBER' },
            {x:0,month:'12' ,str:'DECEMBER'}
            ],
    }),
    created(){
        this.LoadRecords()
    },
    computed:{
        getDate(){
            return moment().format('YYYY-MM-DD')
        },
        getMonth(){
           let i = this.Months.findIndex(x=> x.month == this.$route.params.month)
           if(i>-1) return this.Months[i].str
           else return ''
        }
    },
    methods:{ 
        printRecord(){
            this.isPrint = true 
            setTimeout(() => {
                 window.print()
            }, 500);
        },
         LoadRecords(){
            console.log(this.$route.params)
            axios.get(`${this.api}loadRecords/${this.$route.params.year}`).then(res=>{
                if(res.data && res.data.length > 0 ){
                    this.Records =res.data.map(rec=>{ 
                            if(rec.created_at.includes(`${this.$route.params.year}-${this.$route.params.month}`)){
                                 this.total_sales+=rec.total_price
                                  return rec 
                            }
                           
                        })
                    if(this.total_sales == 0 ){
                        alert('No Invoice to Print')
                        this.$router.push('/reports')
                
                    }
                }else{
                    alert('No Invoice to Print')
                    this.$router.push('/reports')
                }
            })
        },
    }
}
</script>

<style>

</style>