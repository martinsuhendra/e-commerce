
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>

        <v-container>
          <v-card-title>
            <span class="headline">LOGIN</span>
          </v-card-title>
        </v-container>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
            
              <v-flex xs12>
                <v-text-field label="Email*" required  v-model="email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required v-model="password"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="signIn">signIn</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

  export default {
    data: () => ({
      email: '',
      form: false,
      password: '',
      dialog: false
    }),
    methods: {
      signIn(){
        this.axios
          .post('/users/signIn',{
          email : this.email,
          password : this.password
        })
        .then(({data})=> {
          console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('role', data.details.role)
          localStorage.setItem('id', data.details.id)
          this.$emit('signIn')
        })
        .catch((err)=> {
          this.$swal('Oops',err.message, 'warning')
        });
      }
    },
    created() {
        this.dialog = true
    },
  };

</script>
