<template>
  <v-data-table
    :headers="headers"
    :items="opcao"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat> 
        <v-toolbar-title>Opção</v-toolbar-title>
        
        <v-divider class="mx-4" inset vertical></v-divider>
        
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="900px">

          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" outlined class="mb-2" v-bind="attrs" v-on="on">
              Nova Opção
            </v-btn>
          </template>

          <v-card>

            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>

              <v-container>

                <v-row>

                  <v-col cols="12" sm="2" md="2">
                    <v-text-field
                      v-model="editedItem.id"
                      label="Id"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="2" md="2">
                    <v-text-field
                      v-model="editedItem.op"
                      label="Opção"
                    ></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Salvar </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    
    <template v-slot:no-data>
      <v-btn color="primary" @click="inicializa()"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  name: "Opcao",
  data: () => ({
    dialog: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Opção", value: "op"},
      { text: "Ações", value: "actions", sortable: false },
    ],
    opcao: [{id: "", op: ""}],
    editedIndex: -1,
    editedItem: {
      id: "",
      op: ""
    },
    editedItemIndex: -1,
    defaultItem: {
      id: "",
      op: ""
    },
  }),
  methods: {
    inicializa() {
      //Inicializar o select de opcao
      axios("http://localhost:3000/opcao")
        .then((response) => {
          this.opcao = response.data;
        })
        .catch((error) => console.log(error));

    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        //alteracao
        axios
          .put(
            "http://localhost:3000/opcao/" + this.editedItem.id,
            this.editedItem
          )
          .then((response) => {
            console.log(response);
            Object.assign(this.opcao[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch((error) => console.log(error));
      } else {
        //Inclusao
        axios
          .post("http://localhost:3000/opcao", this.editedItem)
          .then((response) => {
            console.log(response);
            this.opcao.push(this.editedItem);
            this.close();
          })
          .catch((error) => console.log(error));
      }
    },
    editItem(item) {
      this.editedIndex = this.opcao.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.opcao.indexOf(item);
      confirm("Deseja apagar esta opção?") && 
        axios
          .delete("http://localhost:3000/opcao/" + item.id)
          .then((response) => {
            console.log(response.data);
            this.opcao.splice(index, 1);
          })
          .catch((error) => console.log(error));
    },
    //popula o select de opções: Parador, Direto
    op(id){
      var op = this.opcao.find((x) => x.id ===id);
      op = op ? op.op : "Opção não selecionada";
      return op;
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nova Opção" : "Editar Opção";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.inicializa();
  },
};
</script>

<style scoped>
</style>