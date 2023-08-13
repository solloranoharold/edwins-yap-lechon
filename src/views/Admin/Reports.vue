<template>
      <div  v-if="loading==true">
        <br/><br/><br/>
        <center>
            <v-progress-circular
            :size="50"
           indeterminate
           color="green"
           ></v-progress-circular>
           <h2>LOADING</h2>
        </center>
       
       </div>
  <v-container fluid v-else>
    <v-dialog v-model="reportdialog" max-width="500px">
        <v-card>
            <v-toolbar  dense dark color="green" flat> 
                <v-toolbar-title>Generate Sales {{year}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container fluid>
                    <v-autocomplete v-model="selectedmonth" dense outlined rounded label="Select Month" :items="Months" item-text="str" item-value="month"></v-autocomplete>
                    <v-btn small rounded block @click="generate()">GENERATE</v-btn>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
     <v-row>
        <v-col lg="4" md="4" xs="12" sm="12">
            <v-card>
                <v-card-text>
                    <h3>THIS YEAR SALES ( {{ year }} ) </h3>
                    <v-row>
                        <v-col cols="3">
                            <v-layout>
                               <strong style="font-size:40px;color:green">₱</strong>
                                <v-spacer/>
                                <span style="font-size:35px;color:black"> <strong>{{ getTotalSalesYear }}</strong></span>
                            </v-layout>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col lg="4" md="4" xs="12" sm="12">
            <v-card>
                <v-card-text>
                    <h3>MONTHLY SALES ( {{ getMonth.toUpperCase() }} )</h3>
                    <v-row>
                        <v-col cols="3">
                            <v-layout>
                               <strong style="font-size:40px;color:green">₱</strong>
                                <v-spacer/>
                                <span style="font-size:35px;color:black"> <strong>{{ getTotalSalesMonth }}</strong></span>
                            </v-layout>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col lg="4" md="4" xs="12" sm="12">
            <v-card>
                <v-card-text>
                    <h3>DAILY SALES</h3>
                    <v-row>
                       <v-col cols="3">
                        <v-layout>
                               <strong style="font-size:40px;color:green">₱</strong>
                                <v-spacer/>
                                <span style="font-size:35px;color:black"> <strong>{{ getTotalSalesDaily }}</strong></span>
                            </v-layout>
                       </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    <v-col lg="4" md="4" xs="12" sm="12">
        <v-card>
        <v-card-text>
            <h3>PENDING ORDER'S</h3>
            <v-row>
                <v-col cols="3">
                    <v-layout>
                        <v-icon x-large color="indigo">mdi-cart</v-icon>
                        <span style="font-size:35px;color:black"> <strong>{{ getPendingOrders }}</strong></span>
                    </v-layout>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    </v-col>
    <v-col lg="4" md="4" xs="12" sm="12">
        <v-card>
        <v-card-text>
            <h3>CANCELLED ORDER'S </h3>
            <v-row>
                <v-col cols="3">
                    <v-icon x-large color="red">mdi-cancel</v-icon>
                    <span class="pb-15"  style="font-size:35px;color:black"> <strong>{{ getCancelledOrders }}</strong></span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    </v-col>
    <v-col lg="4" md="4" xs="12" sm="12">
        <v-card>
        <v-card-text>
            <h3>DELIVERED ORDER'S </h3>
            <v-row>
                <v-col cols="3">
                    <v-icon x-large color="cyan">mdi-truck</v-icon>
                    <span class="pb-15"  style="font-size:35px;color:black"> <strong>{{ getDeliveredOrders }}</strong></span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    </v-col>
    
    <v-col lg="4" md="4" xs="12" sm="12">
            <v-card>
                <v-card-text>
                    <h3>TOTAL NO. OF ORDERS</h3>
                    <v-row>
                        <v-col cols="3">
                            <v-icon x-large color="orange">mdi-receipt-text-arrow-right</v-icon>
                            <span class="pt-7"  style="font-size:35px;color:black"> <strong>{{ Records.length }}</strong></span>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col lg="4" md="4" xs="12" sm="12">
        <v-card>
        <v-card-text>
            <h3>CUSTOMER'S</h3>
            <v-row>
                <v-col cols="3">
                    <v-icon x-large color="primary">mdi-account-badge-outline</v-icon>
                    <span class="pt-7"  style="font-size:35px;color:black"> <strong>{{ Accounts.length }}</strong></span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    </v-col>
    
     </v-row>
     <v-divider style="border:1px solid;"/>
     <br/>
     <h1 class="text-center"><v-icon x-large>mdi-chart-bar-stacked</v-icon>OVERALL CHART DATA</h1>
     <v-layout>
        <v-btn small rounded color="green" dark @click="openGeneratesales()"><v-icon>mdi-cash-multiple</v-icon>Generate Sales</v-btn>
        <v-spacer/>
       <v-flex md1>
        <v-autocomplete @change="LoadRecords()" v-model="year" hide-details dense outlined item-text="year" :items="Years"/>
       </v-flex>
       <v-flex md1>
        <v-autocomplete v-model="chart" hide-details dense outlined :items="charts"/>
       </v-flex>
     </v-layout>
     <LineChart v-if="chart=='Line'" :chartdata="chartData" :options="options"/>
     <BarChart v-else :chartdata="chartData" :options="options"/>
  </v-container>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import LineChart from './Charts/LineChart.vue'
import BarChart from './Charts/BarChart.vue'
export default {
    components:{
        LineChart,BarChart
    },
    data:()=>({
         reportdialog:false ,
         selectedmonth: null, 
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
        year: null,
        Years:[],
        Records:[],
        Accounts:[],
        loading:false ,
        charts:['Bar','Line'],
        chart:'Bar',
        chartData: {
            labels: ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'],
            
        },
        options: {
            animation: {
                easing: 'easeOutQuart',
                duration: 1000
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        enabled: true,
                        fontFamily: 'Arial',
                        fontStyle: 'bold'
                    },

                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        enabled: true,
                        fontFamily: 'Arial',
                        fontStyle: 'bold'
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
           
        },
    }),
    created(){
        this.year = moment().format('YYYY')
        this.loadYears()
        this.LoadRecords()
        this.loadAccounts()
    },
    computed:{
        getMonth(){
            return moment().format('MMMM') 
        },
        getTotalSalesYear(){
            let total = 0 
            this.Records.filter(rec=>{ 
                total+= rec.total_price
            })
            return total.toFixed(2)
        },
        getTotalSalesMonth(){
            let total = 0 
            this.Records.filter(rec=>{ 
               if(rec.created_at.includes(`${this.year}-${moment().format('MM')}`)){
                total+= rec.total_price
               }
            })
            return total.toFixed(2)
        },
        getTotalSalesDaily(){
            let total = 0 
            this.Records.filter(rec=>{ 
               if(rec.created_at.includes(`${this.year}-${moment().format('MM')}-${moment().format('DD')}`)){
                total+= rec.total_price
               }
            })
            return total.toFixed(2)
        },
        getDeliveredOrders(){
            return this.Records.filter(rec=>{ 
                return rec.status==4
            }).length
        },
        getPendingOrders(){
            return this.Records.filter(rec=>{ 
                return rec.status==1
            }).length
        },
        getCancelledOrders(){
            return this.Records.filter(rec=>{ 
                return rec.status==3
            }).length
        }
    },
    methods:{ 
        generate(){
            if(!this.selectedmonth){
                alert('Please select month')
                return false 
            }
            this.$router.push(`/sales/${this.year}/${this.selectedmonth}`)
        },
        openGeneratesales(){
            this.reportdialog = true 
        },
        loadYears(){
            axios.get(`${this.api}loadYears`).then(res=>{ 
                if(res.data){
                    // console.log(res.data)
                    this.Years = res.data
                }
            })
        },
        LoadRecords(){
            
          

            this.loading=true 
            axios.get(`${this.api}loadRecords/${this.year}`).then(res=>{
                if(res.data){
                    let data =  this.Months.map(item=>{ 
                        res.data.filter(rec=>{ 
                            if(rec.created_at.includes(`${this.year}-${item.month}`)) item.x+=rec.total_price
                        })
                        return item.x.toFixed(2).toString()
                    })
                    this.chartData.datasets=[{
                        label: `Total Sales of ${this.year}`,
                        backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                        data: data
                    }]
                    // console.log(this.chartData)
                    this.Records = res.data 
                    this.loading=false
                }
            })
        },
        loadAccounts(){
            axios.get(`${this.api}loadAccounts`).then(res=>{
                if(res.data){
                    this.Accounts = res.data.filter(rec=>{
                        return rec.fullname != 'ADMINISTRATOR'
                    })
                }
            })
        },
    }
}
</script>

<style>

</style>