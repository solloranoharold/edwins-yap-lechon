<template>
    <v-container fluid>
       <div  v-if="loading==true">
        <center>
            <v-progress-circular
            :size="50"
           indeterminate
           color="green"
           ></v-progress-circular>
           <h2>LOADING</h2>
        </center>
       
       </div>
        <VerticalNavBar  v-if="loading==false"/>
        <br/>
        <center v-if="loading==false">
            <v-flex md3 lg3 xs6 sm6 >
                <v-card style="border:1px solid;" flat >
                    <v-card-text>
                        <v-form>
                        <h2>Create new Account</h2>
                        <h3>Already Registered ? <a @click="$router.push('/login')">Login Here </a></h3>
                        <br/><br/>
                        <label style="text-align:left;">NAME</label>
                        <v-text-field v-model="addObj.fullname" dark hide-details class="text" outlined  dense ></v-text-field>
                        <br/>
                        <label style="text-align:left;">EMAIL</label>
                        <v-text-field v-model="addObj.email" dark hide-details class="text" outlined dense  type="email"></v-text-field><br />
                        <label style="text-align:left;">PASSWORD</label>
                        <v-text-field  v-model="addObj.password" dark hide-details class="text" outlined dense  type="password"></v-text-field><br />
                        <label style="text-align:left;">CONFIRM PASSWORD</label>
                        <v-text-field v-model="addObj.cpass"  dark hide-details class="text" outlined dense  type="password"></v-text-field><br />
                        <label style="text-align:left;">MUNICIPALITY</label>
                        <v-autocomplete v-model="addObj.shipping_id" :items="Shippings" item-text="municipality" item-value="shipping_id" dark hide-details class="text" outlined dense ></v-autocomplete><br />
                        <label style="text-align:left;">BARANGAY</label>
                        <v-text-field v-model="addObj.brgy" dark hide-details class="text" outlined dense ></v-text-field><br />
                        <label style="text-align:left;">COMPLETE ADDRESS</label>
                        <v-textarea v-model="addObj.address"  dark hide-details class="text" outlined dense ></v-textarea>
                        <br />
                        </v-form>
                        <v-btn dark class="green darken-2" @click="signUp()">SIGN UP</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
           
        </center>
        <v-dialog v-model="otpDialog" persistent max-width="450px">
            <v-card>
                <v-toolbar flat dense dark class="green darken-2">
                    <v-toolbar-title>Verification</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <h3 class="text-center">Our team send you a email verification for your OTP.</h3>
                    <h4 class="text-center"> Please check </h4>
                    <center>
                        <v-otp-input
                        v-model="otp"
                        ref="otpInput"
                        input-classes="otp-input"
                        separator="-"
                        :num-inputs="6"
                        :should-auto-focus="true"
                        :is-input-num="false"
                        @on-change="handleOnChange()"
                        @on-complete="handleOnComplete()"
                        />
                        <v-btn block @click="verifyOTP()">SEND</v-btn>
                    </center>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>



<script>
import VerticalNavBar from './VerticalNavBar.vue';
import axios from 'axios'
import OtpInput from "@bachdgvn/vue-otp-input";

const characters ='01234567891234567890123';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


export default {
    components: {
        VerticalNavBar,
        "v-otp-input": OtpInput
    },
    data: () => ({
        loading:false, 
        date:null,
        menu:false,
        Shippings:[],
        addObj:{},
        Accounts:[],
        otpDialog:false,
        otp:null , 
        generatedOTP:null
    }),
    created(){
        this.loadShippings()
        this.loadAccounts()
    },
    
    methods:{
        handleOnComplete(value) {
            console.log('OTP changed: ', value);
            this.otp = value
        },
        handleOnChange(value) {
            console.log('OTP changed: ', value);
            this.otp = value
        },
        loadShippings(){
            axios.get(`${this.api}loadShippingFees`).then(res=>{
                if(res.data){
                    this.Shippings = res.data 
                }
            })
        },
        loadAccounts(){
            axios.get(`${this.api}loadAccounts`).then(res=>{
                if(res.data){
                    this.Accounts = res.data 
                }
            })
        },
        signUp(){
            if(!this.addObj.fullname || !this.addObj.email || !this.addObj.password || !this.addObj.cpass || !this.addObj.shipping_id || !this.addObj.brgy || !this.addObj.address){
                alert('Please complete fields!')
                return false 
            }
            this.addObj.method = 0
            let i = this.Accounts.findIndex(x=>x.email.toUpperCase() == this.addObj.email.toUpperCase())
            if(i>-1){
                alert('Email already Exists!')
                return false 
            }
            if(this.addObj.password.toUpperCase() == this.addObj.cpass.toUpperCase()){
                this.generatedOTP = generateString(6).toUpperCase()
                this.loading= true
                axios.post(`${this.api}email/sendOTP`,{email: this.addObj.email , otp: this.generatedOTP }).then((r)=>{ 
                    // console.log(r)
                    if(r.data!='error'){
                        this.otpDialog=true
                    }else{
                        alert('Please check your email if it is valid!')
                    }
                    this.loading = false 
                    
                })
            }else{
                alert('Password and Confirm password not matched!')
            }
            
        },
        verifyOTP(){
            if(!this.otp){
                alert('Insert OTP')
                return false 
            }
            if(this.otp.toString().trim() == this.generatedOTP.toString().trim()){
                axios.post(`${this.api}addEditAccount` , this.addObj).then(res=>{
                    if(res.data){
                        alert('Account has been registered!')
                        this.$router.push('/login')
                    }
                })
            }else{
                alert('Please check correcty your OTP on your email!')
                return false 
            }
        }
    }
}
</script>



<style>
  .text{
        background-color: rgb(161, 79, 24);
    }
  .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>