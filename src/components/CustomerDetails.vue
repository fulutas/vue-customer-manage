<template>
  <div class="customerdetails container">
       <router-link to="/">Back</router-link>
    <h1 class="page-header">{{customer.first_name}} {{customer.last_name}}
        <span class="pull-right">
            <router-link class="btn btn-primary" :to="'/edit/'+customer.id">Düzenle</router-link>
            <button class="btn btn-danger" @click="deleteCustomer(customer.id)">Sil</button>
            </span>
    </h1>
    <ul class="list-group">
            <h4 class="">İletişim</h4>
            <li class="list-group-item"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span> {{customer.phone}}</li>
            <li class="list-group-item"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> {{customer.email}}</li>
        </ul>

        <ul class="list-group">
            <h4 class="">Adres</h4>
            <li class="list-group-item"> {{customer.address}}</li>
            <li class="list-group-item">{{customer.city}}</li>
            <li class="list-group-item">{{customer.state}}</li>
        </ul>
  </div>
</template>

<script>
export default {
  name: "customerdetails",
  data() {
    return {
        customer : ''
    };
  },

  methods : {

      // GET Request customer
      fetchCustomer(id){
          this.$http.get('http://slimapp/api/customer/'+id)
          .then(function(response){
            console.log(response.body)
            this.customer = response.body
        });
      },

      deleteCustomer(id){
           this.$http.delete('http://slimapp/api/customer/delete/'+id)
          .then(function(response){
              this.$router.push({ path : '/', query : { alert : "Müşteri silindi"}})
        });
      }
  },

  created(){
      this.fetchCustomer(this.$route.params.id); // URL'deki id'sini gönderir.
  }
};
</script>

<style scoped>

</style>
