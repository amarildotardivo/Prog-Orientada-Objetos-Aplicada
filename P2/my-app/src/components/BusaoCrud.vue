<template>
  <v-data-table
    :headers="headers"
    :items="horarios"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Horário Busão (CRUD)</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" outlined class="mb-2" v-bind="attrs" v-on="on">
              Novo Horário
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="2" sm="2" md="2">
                    <v-text-field
                      v-model="editedItem.id"
                      label="Id"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="5" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.origem"
                      label="Cidade Origem"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.destino"
                      label="Cidade Destino"
                    ></v-text-field>
                  </v-col>

                  
                  <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.opcao_id"
                        :items="opcao"
                        label="Opção"
                        item-text="op"
                        item-value="id"
                        return-value
                        ></v-select>
                  </v-col>

                  <v-col cols="12" sm="2" md="2">
										<label for="hora">Horário</label>
										<input 
											style="padding: 5px;"
											type="time" 
											v-model="editedItem.horario"
											label="Horário"
											name="hora" />
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

	<!-- Inicializar o Template com os Modelos -->
	<template v-slot:[`item.opcao_id`]="{ item }">
		{{ op( item.opcao_id) }}
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
  name: "BusaoCrud",
  data: () => ({
    dialog: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Cidade Origem", value: "origem" },
      { text: "Cidade Destino", value: "destino" },
      { text: "Horário", value: "horario" },
      { text: "Opção", value: "opcao_id"},
      { text: "Ações", value: "actions", sortable: false },
    ],
    horarios: [{ id: 1, origem: "Itaperuna", destino: "Rio de Janeiro", horario: "12:25"}],
    opcao: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      origem: "",
      destino: "",
      horario: "10:00",
    },
    editedItemIndex: -1,
    defaultItem: {
      id: "",
      origem: "",
      destino: "",
      horario: "",
    },
  }),
  methods: {
    inicializa() {
      axios("http://localhost:3000/horarios")
        .then((response) => {
          this.horarios = response.data;
        })
        .catch((error) => console.log(error));

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
            "http://localhost:3000/horarios/" + this.editedItem.id,
            this.editedItem
          )
          .then((response) => {
            console.log(response);
            Object.assign(this.horarios[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch((error) => console.log(error));
      } else {
        //Inclusao
        axios
          .post("http://localhost:3000/horarios", this.editedItem)
          .then((response) => {
            console.log(response);
            this.horarios.push(this.editedItem);
            this.close();
          })
          .catch((error) => console.log(error));
      }
    },
    editItem(item) {
      this.editedIndex = this.horarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.horarios.indexOf(item);
      confirm("Deseja apagar este horário?") && 
        axios
          .delete("http://localhost:3000/horarios/" + item.id)
          .then((response) => {
            console.log(response.data);
            this.horarios.splice(index, 1);
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
      return this.editedIndex === -1 ? "Novo Horário" : "Editar Horário";
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