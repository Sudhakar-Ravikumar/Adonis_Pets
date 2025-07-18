<template>
  <div class="homepage">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="logo">🐾</div>
      <ul class="nav-links">
        <li>Home</li>
        <li>About Us</li>
        <li>Service</li>
        <li>Food</li>
      </ul>
      <button class="logout-btn" @click="homeStore.logout">Log Out</button>
    </nav>

    <!-- Hero Section -->
    <div class="hero">
      <h1>Your Pet Care <span class="highlight">Center</span></h1>
      <p>Lorem Ipsum available, but the majority have suffered alteration in some form.</p>

      <div class="cta">
        <button class="shop-now">Shop Now</button>
      </div>

      <!-- Pet Images -->
      <div class="pet-images">
        <img class="side-img" src="/dog-left.png" alt="dog" />
        <img class="center-img" src="/cat-main.png" alt="cat" />
        <img class="side-img" src="/cat-right.png" alt="cat2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from '/stores/homeStore.js'
const homeStore = useHomeStore()
</script>

<style scoped>
.homepage {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding: 50px;
  margin: 30px;
  background-color: #e8f3ff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0.5, 0.5);
  min-height: calc(100vh - 60px);
  max-height: 300px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 24px;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}
.logout-btn {
  background-color: #255860;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
}
.hero {
  text-align: center;
  margin-top: 40px;
}
.highlight {
  color: #f5b478;
}
.cta {
  margin-top: 20px;
}
.shop-now {
  background-color: #f5b478;
  border: none;
  padding: 10px 20px;
  margin-right: 20px;
  border-radius: 25px;
  color: white;
}
.pet-images {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 20px;
}
.center-img {
  height: 200px;
  border-radius: 50%;
}
.side-img {
  height: 120px;
  border-radius: 50%;
}
</style>
