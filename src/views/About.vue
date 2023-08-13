<template>
  <div>
    <v-toolbar dense>
    <v-tabs
      dark
      background-color="success"
      grow
    >
      <v-tab>
        <v-badge
          color="pink"
          dot
        >
          Item One
        </v-badge>
      </v-tab>

      <v-tab>
        <v-badge
          color="green"
          content="6"
        >
          Item Two
        </v-badge>
      </v-tab>

      <v-tab>
        <v-badge
          color="deep-purple accent-4"
          icon="mdi-vuetify"
        >
          Item Three
        </v-badge>
      </v-tab>
    </v-tabs>
  </v-toolbar>
    <v-carousel v-model="model">
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <v-sheet
        :color="color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            Slide {{ i + 1 }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>
<script>
  export default {
    data: () => ({
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }),
  }
</script>