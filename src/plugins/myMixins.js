import {
    mapState,
    mapMutations
} from 'vuex'
import axios from 'axios'
import _ from 'lodash'
const myPlugins = {
    install(Vue) {
        Vue.mixin({
            data: () => ({
                api: process.env.VUE_APP_URL,
                filelister: process.env.VUE_APP_FILELISTER,
                MyCart:[],
            }),
            computed: {
                ...mapState([
                    'userInfo','Notifications','notseen'
                ]),
            },
            methods: {
                ...mapMutations([
                    'STORE_USERINFO','STORE_NOTIFICATIONS','NOT_SEEN'
                ]),
                loadMyCart(){
                    axios.get(`${this.api}loadCart/${this.userInfo.acc_id}`).then(res=>{ 
                        if(res.data){
                            res.data.forEach(rec=>{ 
                                let i = this.MyCart.findIndex(x=>x.product_id == rec.product_id)
                                if(i>-1){
                                    this.MyCart[i].quantity += rec.quantity
                                    this.MyCart[i].total_price += rec.total_price
                                }else{
                                    this.MyCart.push(rec)
                                }
                            })
                        }
                    })
                },
                loadNotifications(){
                    let id = this.userInfo.fullname !='ADMINISTRATOR' ?  this.userInfo.acc_id : -1 
                      axios.get(`${this.api}loadLogs/${id}`).then(res=>{ 
                        if(res.data){
                         let noseen = res.data.filter(rec=>{
                            return rec.notify == 1 
                         }).length
                         this.$store.commit('NOT_SEEN' ,noseen )
                         this.$store.commit('STORE_NOTIFICATIONS' , _.orderBy( res.data  , ['createDate'],['desc']))
                        }
                      })
                  },
            }
        })
    }
}

export default myPlugins