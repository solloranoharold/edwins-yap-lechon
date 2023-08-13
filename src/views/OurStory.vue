<template>
  <v-container fluid>
  
    <v-row>
      <v-col cols="12">
         <VerticalNavBar/>
        </v-col>
        <v-col>
          <v-row>
           
            <!-- <v-col cols="6">
              <center>
                <h2 class="text-center">PICKUP</h2>
              <v-avatar
                  class="profile"
                  color="grey"
                  size="150"
                >
                  <v-img  src="../assets/referrence/pickup.jpg"></v-img>
                </v-avatar>
              </center>
            </v-col> -->
            <v-col  cols="12">
              <center>
                <h2 class="text-center">DELIVERY</h2>
              <v-avatar
              class="profile"
              color="grey"
              size="150"
            >
              <v-img  src="../assets/referrence/delivery.jpg"></v-img>
            </v-avatar>
          </center>
            </v-col>
          </v-row>
        </v-col>
    </v-row>
    <v-container fluid style="background-color:#B71C1C;">
      <v-row>
        <v-col md="9" lg="9" sm="7" xs="7">
          <v-card dark class="green darken-2" :height="300">
            <v-card-text>
              <h1 style="color:white;font-family:'FeelingPassionate' ;">Edwin's Yap Lechon</h1>
              <v-divider style="border:1px solid white"/>
              <br/>
              <p style="color:white;font-size: 20px;">
                Edwin's Yap Pork Lechon established 5 years ago but his business started 30 years ago and was named from his late wife Ellie's Yap.
                He adopted their family business from his childhood, inherit the taste and processing from his parents namely Eddie's Yap Pork Lechon 60 years ago
                Cavite City's most famous and all times favorite Pork Lechon every now and then.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="3" lg="3" xs="5" sm="5">
          <v-card dark class="green darken-2" :height="300" >
            <v-card-text>
              <center>
              <v-img  src="../assets/referrence/edwin.jpg" max-height="280" max-width="320"></v-img>
            </center>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    
    </v-container>
  </v-container>
</template>

<script>
import VerticalNavBar from './VerticalNavBar.vue';
export default {
  components: {
    VerticalNavBar,
  },
  created(){
    this.loadNotifications()
  }
}
</script>

<style>

</style>