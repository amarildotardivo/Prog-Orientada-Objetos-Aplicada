Vue.component('formulario', {
    template:
    `
    <div id="form">
        <label > <span>Carro:</span>
            <input type="text" v-model="carro" />
        </label>
        <br />
        <label><span>Cor:</span>
            <input type="text" v-model="cor" />
        </label>
        <br />
        <label><span>Ano:</span>
            <input type="number" v-model="ano" />
        </label>
        <br />

        <button @click="addCarros(carro, cor, ano)">Adicionar Carro</button>
    </div>
    `,
    props:['carro', 'cor', 'ano'],
    methods: {
        addCarros(carro, cor, ano) {
            this.$emit('carros', carro, cor, ano)
        }
    }
})

var app = new Vue({
    el: '#app',
    data(){
        return{
            
            carros: []
        }
    },        
    methods:{
        listarCarros(carro, cor, ano){
            this.carros.push({carro: carro, cor: cor, ano: ano})
        }
    }
})