<template>
  <div class="sidebar bg-color d-flex flex-column align-center">
    <v-img
      max-height="70"
      max-width="100"
      src="../assets/logo.png"
      class="sidebar mt-5 mt-10 hidden-md-and-down"
    ></v-img>
    <h3 class="text-h5 font-weight-bold">Weatherist</h3>

    <v-list dense class="bg-color sidebar list-item mt-10">
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          class=" mb-4 py-4 "
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-content class="d-flex ">
            <v-icon class="text-center"  v-text="item.icon"></v-icon>
            <v-list-item-title class="text-center" v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SideBarMenu",
  data: () => ({
    selectedItem: 0,
    items: [
      { text: "Weather", icon: "mdi-apple-icloud" },
      { text: "Cities", icon: "mdi-google-maps" },
      { text: "Setting", icon: "mdi-cog-outline" },
    ],
  }),
};
</script>

<style scoped>
.sidebar {
  border-radius: 0.5rem;
}
.bg-color {
  background-color: #eaecef;
}
.list-item {
  width: 100%;
}
</style>