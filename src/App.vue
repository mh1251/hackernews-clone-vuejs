<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <b-container fluid>
      <b-row>
        <b-col sm="3" cols="12" class="m-0 p-0"><NavBar></NavBar></b-col>
        <b-col class="m-0 p-0 routerView" sm="9" cols="12" ><router-view /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import HeaderComponent from "./components/Header.vue";
export default {
  name: "App",
  components: {
    NavBar,
    HeaderComponent,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;800&display=swap");

#app {
  font-family: "Poppins", sans-serif;
  color: #2c3e50;
  margin: 0;
  margin-top: 10px;
  overflow: hidden;
  background-color: rgb(243, 243, 243);
}

.routerView {
  text-align: center;
}
button {
  border: none;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
