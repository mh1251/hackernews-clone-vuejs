<template>
<div id="form">
  <div id="container">
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      content-cols-sm
      label="Enter your name"
      label-for="input-horizontal"
    >
<b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>
 
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      content-cols-sm
      label="Enter your email"
      label-for="input-horizontal"
     
    >
    <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group> 
    <b-button variant="primary">Log In</b-button>
  </div>
</div>
</template>

<script>
export default {
    name: 'LogIn'
  }
</script>

<style scoped>
#form {
  margin: 20px
}
#fieldset-horizontal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin: 15px;
  width: auto;
  }

input {
  width: 300px;
}
</style>