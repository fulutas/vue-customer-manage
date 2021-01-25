<template>
  <div class="edit container">
    <Alert v-if="alert" :message="alert" />
    <h1 class="page-header">Müşteri Bilgileri Düzenle</h1>
    <form @submit.prevent="updateCustomer">
        <div class="well">
            <h4>Customer Info</h4>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="First Name" v-model="customer.first_name">
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" v-model="customer.last_name">
            </div>
        </div>
        <div class="well">
            <h4>Customer Contact</h4>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email" v-model="customer.email">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" placeholder="Phone" v-model="customer.phone">
            </div>
        </div>

        <div class="well">
            <h4>Customer Location</h4>
            <div class="form-group">
                <label>Address</label>
                <input type="text" class="form-control" placeholder="Address" v-model="customer.address">
            </div>
            <div class="form-group">
                <label>City</label>
                <input type="text" class="form-control" placeholder="City" v-model="customer.city">
            </div>
            <div class="form-group">
                <label>State</label>
                <input type="text" class="form-control" placeholder="State" v-model="customer.state">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Kaydet</button>
    </form>
  </div>
</template>

<script>

import Alert from "./Alert"

export default {
  name: "updateCustomer",
  data() {
    return {
      customer: {},
      alert : ''
    };
  },

  methods : {

      fetchCustomer(id){
            this.$http.get('http://slimapp/api/customer/'+id)
        .then(function(response){
            console.log(response.body)
            this.customer = response.body
        }); 
      },

      updateCustomer(){
          if(!this.customer.first_name || !this.customer.last_name || !this.customer.email){
              this.alert = "Zorunlu alanı girin."
          }
          else {
              let updCustomer = {
                  first_name : this.customer.first_name,
                  last_name : this.customer.last_name,
                  phone : this.customer.phone,
                  email : this.customer.email,
                  address : this.customer.address,
                  city : this.customer.city,
                  state : this.customer.state,
              }

              this.$http.put('http://slimapp/api/customer/update/'+this.$route.params.id, updCustomer)
              .then(response => {
                   this.$router.push({path : "/", query: {alert : 'Müşteri güncellendi'}}) 
              })
          }

      }
  },

  created(){
      this.fetchCustomer(this.$route.params.id);
  },
  
  components : {
      Alert
  }
};
</script>

<style scoped>
</style>
