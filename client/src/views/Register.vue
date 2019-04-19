<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" >
      <v-card style="background: url('https://images.unsplash.com/photo-1545061371-98a8355c9c0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80')
      no-repeat center center fixed; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;">
        <v-toolbar dark color="grey darken-3">
          <v-btn icon dark @click="backToHome">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Register</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container style="opacity: 0.8">
           <v-list three-line subheader>
          <v-subheader>User Profile</v-subheader>

          <v-list-tile avatar>
            <v-text-field
            v-model="firstName"
            :counter="10"
            :rules="nameRules"
            label="First Name"
            required
            ></v-text-field>
          </v-list-tile>

          <v-list-tile avatar>
             <v-text-field
            v-model="lastName"
            :counter="10"
            :rules="nameRules"
            label="Last Name"
            required
            ></v-text-field>
          </v-list-tile>
        </v-list>

        <v-list three-line subheader>
          <v-list-tile avatar>
             <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
          </v-list-tile>

          <v-list-tile avatar>
              <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          </v-list-tile>

          <v-list-tile avatar>
            <v-text-field
            v-model="address"
            label="Address"
            required
            ></v-text-field>
          </v-list-tile>

        </v-list>
          <v-layout row justify-center>
            <v-btn
            :disabled="!valid"
            color="orange accent-3"
            @click="register"
            >
            Sign Up
            </v-btn>

            <v-btn
            color="orange accent-3"
            @click="reset"
            >
            Reset
            </v-btn>
          </v-layout>
        </v-container>
       
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>

import axios from 'axios'

  export default {
    data: () => ({
      dialog : false,
      valid: true,
      firstName: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      valid: true,
      lastName: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      address: '',
      show1: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: 'Password',
      rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => ('The email and password you entered don\'t match')
        }
    }),

    methods: {
      backToHome(){
        this.$router.push('/'),
        this.dialog = false
      },
      reset() {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      register(){
            axios
            .post(`http://localhost:3000/users/signUp`,{
                firstName : this.firstName,
                lastName : this.lastName,
                email : this.email,
                address : this.address,
                password : this.password
            })
            .then(()=> {
                this.$emit('isLogin')
            })
            .catch((err)=> {
                this.$swal("Oops", err.message, "warning")
            })
      }
    },
    created() {
      this.dialog = true;
    },
  }
</script>

<style>
    
</style>