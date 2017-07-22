<template>
  <v-layout id="wrapper"  class="text-xs-center">
    <v-flex xs3>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <v-flex xs12>
            <h3 class="headline">Welcome {{ userName }}</h3>
          </v-flex>
          <v-flex xs12 v-if="onLine === true" >
            <DropZone/>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs3>
    </v-flex>
  </v-layout>
</template>

<script>
import { db, auth } from '@/connection'
import DropZone from './DropZone'

export default {
  name: 'landing-page',
  components: { DropZone },
  data () {
    return {
      userName: '',
      onLine: false
    }
  },
  methods: {
    stateUser () {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.onLine = true
          this.userName = user.email
        } else {
          // Si no se redirigie al login
          this.$router.push('/')
        }
      })
    }
  },
  mounted() {
    // Verify is online
    db.ref(".info/connected").on('value', (snap) => {
      if (snap.val()) {
        // Si se está conectado se pide el estado actual del usuario
        this.stateUser()
      }
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import url('/static/vuetify.css');
</style>
