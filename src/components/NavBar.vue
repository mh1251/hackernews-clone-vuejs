<template>
     <div id="nav-bar">
        <div>
          <i><font-awesome-icon icon="fas fa-newspaper" /></i>
          <router-link :to="{ path: '/stories/newstories' }">NEW</router-link> 
        </div>
        <div>
          <i><font-awesome-icon icon="fas fa-fire" /></i>
          <router-link :to="{ path: '/stories/topstories' }">TOP</router-link> 
        </div>
        <div>
          <i><font-awesome-icon icon="fas fa-money-bill-1-wave" /></i>
          <router-link :to="{ path: '/stories/jobstories' }">JOBS</router-link>
        </div>
        <div>
          <i><font-awesome-icon icon="fas fa-question-circle" /></i>
          <router-link :to="{ path: '/stories/askstories' }">ASK HN</router-link> 
        </div>
        <div>
          <i><font-awesome-icon icon="fas fa-bullhorn" /></i>
          <router-link :to="{ path: '/stories/showstories' }">SHOW HN</router-link> 
        </div>
      </diV>
</template>

<script>
export default {
   name: 'NavBar'
}
</script>

<style scoped>
#nav-bar {
  padding-top: 15px;
  background-color: rgb(243, 243, 243);
  height: 100vh;
  position: fixed;
  width: inherit
}

#nav-bar > div {
    height: 50px;
    color: rgb(59, 59, 59);
    padding-left: 10px;
    display: flex;
    align-items: center;
}

#nav-bar > div:hover {
    background-color: rgba(182, 182, 182, 0.445);
    color: rgb(255, 116, 24)
}

a {
   text-decoration: none;
   width: 100%;
   color: rgb(255, 116, 24)
}

a:hover {
  color:rgb(255, 116, 24)
}

i {
  margin-right: 15px;
}



@media only screen and (max-width: 576px) {
  #nav-bar  {
    display: flex;
    flex-direction: row;
    height: auto;
    justify-content: center;
    gap: 10px;
    position: relative;
  }
}

</style>