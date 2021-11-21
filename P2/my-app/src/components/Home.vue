<template>  
  <v-container>
  <h1>Horário do Busão (CRUD)</h1>
  
    <v-row class="text-center">
      
      <v-col cols="12">

        <v-img
          :src="require('../assets/logo-hb.png')"
          class="my-3"
          contain
          height="200"
        
        />
      </v-col>

      <v-col class="mb-4">

        <h1 class="display-2 font-weight-bold mb-3">
          Olá!
        </h1>

        <p class="subheading font-weight-regular">
          Conheça o Horário do Busão no 
          <a
            href="https://github.com/amarildotardivo"
            target="_blank"
          >meu GitHub</a>
        </p>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>
export default {
  name: "UserCrud",
  data: () => ({}),
  methods: {},
};
</script>
