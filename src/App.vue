<!-- <template>
  <PetsView />
  <CustomersView />
  <SalesView />
</template>

<script setup>
import PetsView from './views/PetsView.vue'
import CustomersView from './views/CustomersView.vue'
import SalesView from './views/SalesView.vue';
</script> -->

<!-- App.vue -->
<template>
  <router-view />
</template>
<!-- <style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #cdd9ff; /* Your outer background */
}
</style> -->
<style>
body.bg-default {
  background-color: #cdd9ff;
}

body.bg-pets {
  background-color: #fffbe6; /* light creamy yellow for pets page */
}

body.bg-customers {
  background-color: #e6f7ff; /* light blue for customers */
}

body.bg-sales {
  background-color: #f5f5f5; /* soft gray for sales */
}
</style>
