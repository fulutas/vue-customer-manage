<template>
  <div class="customers container">
    <!-- alert verisini message prop adıyla alert componente göndeririz. -->
    <Alert v-if="alert" :message="alert" />
    <h1 class="page-header">Müşteriler</h1>
    <input type="text" class="form-control" placeholder="Müşteri soyadı..." v-model="filterInput">
    <br>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Email</th>
            <th>Ülke</th>
            <th>Şehir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in filterBy(customers, filterInput)" :key="customer.id">
            <td> {{ customer.first_name}} </td>
            <td> {{ customer.last_name}} </td>
            <td> {{ customer.email}} </td>
            <td> {{ customer.state}} </td>
            <td> {{ customer.city}} </td>
            <td><router-link class="btn btn-default" :to="'/customer/'+customer.id">Detay</router-link></td>
          </tr>
        </tbody>
      </table>

  </div>
</template>

<script>

import Alert from "./Alert"

export default {
  name: "customers",
  data() {
    return {
        customers : [],
        alert : '',
        filterInput : '',
      
    };
  },

  methods : {
    fetchCustomers(){
        this.$http.get('http://slimapp/api/customers')
        .then(function(response){
            this.customers = response.body
        })
    },

    filterBy(list,value){
    return list.filter(function(customer){
             value = value.charAt(0).toUpperCase() + value.slice(1);
             return customer.last_name.indexOf(value) > -1;
    });
    },

  },

  

  created(){

      // Sayfa yönlendirmede uyarı mesajı gönderilmiş ise gösterir.
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert
        }
      
      // İki saniye sonra alert kaybol!
      setTimeout(() => {
        this.alert = ""
      }, 2000);

      // query ile gelen link temizler.
       setTimeout(() => {
          this.$router.replace({'alert': null});
      }, 1);

     
      this.fetchCustomers();
  },

  // updated(){
  //     this.fetchCustomers();
  // },

  components : {
      Alert
  }
};
</script>

<style scoped>
</style>
