<template>
  <div class="principal">

    <el-form :model="produto">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="Nome">
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
        <el-button type="primary" @click="onSubmit">Inserir</el-button>
      </el-row>
    </el-form>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
        prop="nome"
        label="Nome"
        width="180">
      </el-table-column>
      <el-table-column
        prop="preco"
        label="Preco"
        width="180">
      </el-table-column>
      <el-table-column
        prop="categoria"
        label="Categoria">
      </el-table-column>
      <el-table-column
        label="Ação">
        <template scope="scope">
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      produto: {},
      tableData: []
    }
  },

  methods: {
    onSubmit(rowtable,indice) {
      debugger

      if (indice !== '') {
      }

      this.tableData.push({
        nome: this.produto.nome,
        preco: this.produto.preco,
        categoria: this.produto.categoria})
    },

    carregarCampos(indice, row) {
      const { categoria, nome, preco } = row

      this.produto.nome = nome
      this.produto.preco = preco
      this.produto.categoria = categoria

    },

    handleEdit(index, row) {
      this.carregarCampos(index,row)

      this.onSubmit(row,indice)

      console.log(row)
    },

    handleRemove(index) {
      this.tableData.splice(index, 1)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.principal {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
