<template>
  <div class="container">
    <h1>Funcionários da Indústria</h1>

    <div class="botoes">
      <button class="btn-reset" @click="executarReset">
        Resetar dados
      </button>
      <button @click="executar('item31', '3.1 - Inserção dos funcionários')">3.1 Inserir</button>
      <button @click="executar('item32', '3.2 - João removido')">3.2 Remover João</button>
      <button @click="executar('item33', '3.3 - Imprimir todos')">3.3 Imprimir todos</button>
      <button @click="executar('item34', '3.4 - Aumento de 10%')">3.4 Aplicar aumento 10%</button>
      <button @click="executar('item35', '3.5 - Agrupar por função (resumo)')">3.5 Agrupar (resumo)</button>
      <button @click="executar('item36', '3.6 - Imprimir agrupados por função')">3.6 Imprimir agrupados</button>
      <button @click="executar('item38', '3.8 - Aniversariantes (meses 10 e 12)')">3.8 Aniversariantes</button>
      <button @click="executar('item39', '3.9 - Funcionário mais velho')">3.9 Mais velho</button>
      <button @click="executar('item310', '3.10 - Ordem alfabética')">3.10 Ordem alfabética</button>
      <button @click="executar('item311', '3.11 - Total dos salários')">3.11 Total salários</button>
      <button @click="executar('item312', '3.12 - Salários mínimos por funcionário')">3.12 Salários mínimos</button>
    </div>

    <h2 v-if="tituloResultado">{{ tituloResultado }}</h2>
    <p v-if="mensagemInfo" class="mensagem-info">{{ mensagemInfo }}</p>
    <p v-if="erro" class="erro">{{ erro }}</p>

    <table v-if="tipoResultado === 'lista'" class="tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data Nascimento</th>
          <th>Salário</th>
          <th>Função</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="f in resultado" :key="f.nome">
          <td>{{ f.nome }}</td>
          <td>{{ f.dataNascimentoFormatada }}</td>
          <td>R$ {{ f.salarioFormatado }}</td>
          <td>{{ f.funcao }}</td>
        </tr>
      </tbody>
    </table>

    <table v-else-if="tipoResultado === 'listaBruta'" class="tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data Nascimento</th>
          <th>Salário</th>
          <th>Função</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="f in resultado" :key="f.nome">
          <td>{{ f.nome }}</td>
          <td>{{ f.dataNascimento }}</td>
          <td>{{ f.salario }}</td>
          <td>{{ f.funcao }}</td>
        </tr>
      </tbody>
    </table>

    <table v-else-if="tipoResultado === 'resumoFuncao'" class="tabela">
      <thead>
        <tr><th>Função</th><th>Quantidade</th></tr>
      </thead>
      <tbody>
        <tr v-for="(qtd, funcao) in resultado" :key="funcao">
          <td>{{ funcao }}</td>
          <td>{{ qtd }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="tipoResultado === 'agrupadoCompleto'">
      <div v-for="(lista, funcao) in resultado" :key="funcao" class="grupo">
        <h3>{{ funcao }}</h3>
        <table class="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data Nascimento</th>
              <th>Salário</th>
              <th>Função</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in lista" :key="f.nome">
              <td>{{ f.nome }}</td>
              <td>{{ f.dataNascimentoFormatada }}</td>
              <td>R$ {{ f.salarioFormatado }}</td>
              <td>{{ f.funcao }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p v-else-if="tipoResultado === 'maisVelho'" class="mensagem-resultado">
      Nome: <strong>{{ resultado.nome }}</strong> | Idade: <strong>{{ resultado.idade }}</strong> anos
    </p>

    <p v-else-if="tipoResultado === 'total'" class="mensagem-resultado">
      Total dos salários: <strong>R$ {{ resultado.totalFormatado }}</strong>
    </p>

    <table v-else-if="tipoResultado === 'salariosMinimos'" class="tabela">
      <thead>
        <tr><th>Nome</th><th>Qtd. Salários Mínimos</th></tr>
      </thead>
      <tbody>
        <tr v-for="(qtd, nome) in resultado" :key="nome">
          <td>{{ nome }}</td>
          <td>{{ qtd }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../services/api'

const TIPO_POR_ITEM = {
  item31: 'listaBruta',
  item32: 'lista',
  item33: 'lista',
  item35: 'resumoFuncao',
  item36: 'agrupadoCompleto',
  item38: 'lista',
  item39: 'maisVelho',
  item310: 'lista',
  item311: 'total',
  item312: 'salariosMinimos'
}

export default {
  name: 'Funcionarios',
  data() {
    return {
      resultado: null,
      tipoResultado: null,
      tituloResultado: '',
      mensagemInfo: '',
      erro: ''
    }
  },
  mounted() {
    this.executar('item33', '3.3 - Imprimir todos')
  },
  methods: {
    async executarReset() {
      this.erro = ''
      this.mensagemInfo = ''
      try {
        const { data } = await api.resetar()
        this.resultado = data
        this.tipoResultado = 'lista'
        this.tituloResultado = 'Dados resetados ao estado original'
      } catch (e) {
        this.erro = 'Erro ao resetar. Verifique se o backend está rodando.'
        console.error(e)
      }
    },
    async executar(chave, titulo) {
      this.erro = ''
      this.mensagemInfo = ''
      this.tituloResultado = titulo
      try {
        if (chave === 'item34') {
          const { data } = await api.item34()
          this.resultado = data.funcionarios
          this.tipoResultado = 'lista'
          this.mensagemInfo = data.mensagem
        } else {
          const { data } = await api[chave]()
          this.resultado = data
          this.tipoResultado = TIPO_POR_ITEM[chave]
        }
      } catch (e) {
        this.erro = 'Erro ao buscar dados do backend. Verifique se ele está rodando em http://localhost:8080.'
        this.resultado = null
        this.tipoResultado = null
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
}

h1 {
  color: #1e4620;
  border-bottom: 3px solid #3f8f3f;
  padding-bottom: 10px;
}

h2 {
  color: #1e4620;
  margin-top: 25px;
}

.botoes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #cfe8cf;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}

@media (max-width: 700px) {
  .botoes {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 420px) {
  .botoes {
    grid-template-columns: 1fr;
  }
}

button {
  background-color: #3f8f3f;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background-color: #2e6b2e;
}

.btn-reset {
  background-color: #b8860b;
}

.btn-reset:hover {
  background-color: #966d09;
}

.erro {
  color: #b00020;
  font-weight: 600;
}

.mensagem-info {
  color: #1e4620;
  font-weight: 600;
  background-color: #eaf7ea;
  border-left: 4px solid #3f8f3f;
  padding: 8px 12px;
}

.mensagem-resultado {
  background-color: #eaf7ea;
  border-left: 4px solid #3f8f3f;
  padding: 10px 15px;
  font-size: 1.1em;
}

.grupo {
  margin-bottom: 25px;
}

.grupo h3 {
  color: #1e4620;
  background-color: #d9f0d9;
  padding: 6px 10px;
  border-radius: 4px;
}

.tabela {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}

.tabela th {
  background-color: #1e4620;
  color: #ffffff;
  padding: 10px;
  text-align: left;
}

.tabela td {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.tabela tr:nth-child(even) {
  background-color: #f4faf4;
}

.tabela tr:hover {
  background-color: #e2f3e2;
}
</style>
