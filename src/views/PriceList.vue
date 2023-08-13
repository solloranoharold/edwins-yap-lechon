<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <VerticalNavBar />
            </v-col>
        </v-row>
        <v-container fluid class="green darken-2" >
            <v-divider style="border:2px solid white;"/>

        <v-carousel height="100%"  cycle >
            <v-carousel-item src="../../public/img/1.png"></v-carousel-item>
            <v-carousel-item src="../../public/img/2 (1).png"></v-carousel-item>
            <v-carousel-item src="../../public/img/3.png"></v-carousel-item>
        </v-carousel>
        </v-container>
    </v-container>
</template>

<script>
import VerticalNavBar from './VerticalNavBar.vue';
export default {
    components: {
        VerticalNavBar
    },
    data: () => ({
     
        Products:[],
        Whole:[],
        Variety:[],
        Dishes:[],
    }),
    created(){
        this.loadNotifications()
    },
    methods:{
      
    }
}
</script>

<style>

</style>