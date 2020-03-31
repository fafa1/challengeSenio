<template>
  <div class="principal">

    <el-form :model="produto" @keyup.native.enter="onSubmit">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :required="true" label="Nome">
            <el-input v-model="produto.nome"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Preço">
            <el-input  v-model="produto.preco"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Categoria">
            <el-input v-model="produto.categoria"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="primary" @click="onSubmit">{{nomeButao}}</el-button>
      </el-row>
    </el-form>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
    <el-table-column
      prop="Nome"
      label="Nome"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Preco"
      label="Preco"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Categoria"
      label="Categoria">
    </el-table-column>
      <el-table-column
        label="Ação">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
            <el-button
            type="danger"
            size="small"
            @click="handleRemove(scope.$index, scope.row)">Remover</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

const url_Base = 'http://localhost:62854/api'

export default {
  name: 'Produto',

  async created() {
    this.carregarDados()
  },

  data () {
    return {
      produto: {
        nome: '',
        preco: '',
        categoria: ''
      },
      tableData: [],
      produtos: '',
      indice: '',
      nomeButao: 'Inserir'
    }
  },

  methods: {
    async onSubmit() {
      if (this.indice !== '') {
        this.nomeButao = 'Inserir'

        const atualizarProdutos = await axios.put(`${url_Base}/produtos/${this.indice}`, {
          Nome: this.produto.nome,
          Preco: this.produto.preco,
          Categoria: this.produto.categoria
        })

        if(atualizarProdutos.status === 204) {
          this.carregarDados()
          this.configCampos()
        }

        this.indice = ''

        return
      }

      // Cadastrar Produto
      const inserirProdutos = await axios.post(`${url_Base}/produtos`, {
        Nome: this.produto.nome,
        Preco: this.produto.preco,
        Categoria: this.produto.categoria
      })
      this.configCampos()
      if (inserirProdutos.data) {
        this.carregarDados()
      }
    },

    configCampos(nome = '', preco = '', categoria = '') {
      this.produto.nome = nome
      this.produto.preco = preco
      this.produto.categoria = categoria
    },

    async carregarDados() {
      this.produtos = await axios.get(`${url_Base}/produtos`)
      this.tableData = this.produtos.data
    },

    carregarCampos(indice, row) {
      const { Categoria, Nome, Preco } = row
      this.configCampos(Nome, Preco, Categoria)
    },

    handleEdit(index, row) {
      this.carregarCampos(index,row)
      this.nomeButao = 'Atualizar'
      this.indice = index + 1
    },

    async handleRemove(index) {
      this.produtos = await axios.delete(`${url_Base}/produtos/${index + 1}`)
      if (this.produtos.status === 204)
          this.tableData.splice(index, 1)
    }
  },
  watch: {
    'produto.preco' () {
      this.produto.preco = this.produto.preco.replace(',', '.')
    }
  },
}
</script>

<style scoped>
.principal {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
