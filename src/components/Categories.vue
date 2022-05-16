<template>
  <div class="categories">
    <h1 class="title">
      Категории
    </h1>
    <div class="block">
      <el-button
        class="auth__links-btn button-create"
        type="text"
        @click="dialogFormVisible = true"
      >
        Создать
      </el-button>
      <table>
        <tbody class="table">
          <tr>
            <th>Название</th>
            <td
              v-for="(category, index) in categories"
              :key="index"
            >
              {{ category }}
            </td>
          </tr>
          <tr>
            <th>Описание</th>
            <td
              v-for="(descr, index) in descriptions"
              :key="index"
            >
              {{ descr }}
            </td>
          </tr>
          <tr>
            <th>Действия</th>
            <td>
              <el-button-group class="order-list__order-buttons">
                <el-button
                  class="change"
                  type="outline-primary"
                >
                  Изменить
                </el-button>
                <el-button
                  class="cancel"
                  type="outline-primary"
                >
                  Отмена
                </el-button>
              </el-button-group>
              <el-button-group class="order-list__order-buttons">
                <el-button
                  class="change"
                  type="outline-primary"
                >
                  Изменить
                </el-button>
                <el-button
                  class="cancel"
                  type="outline-primary"
                >
                  Отмена
                </el-button>
              </el-button-group>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog
      title="Новая категория"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item
          v-model="categoryNew.name"
          label="Название"
          :label-width="formLabelWidth"
        >
          <el-input
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-model="categoryNew.duration"
          label="Описание"
          :label-width="formLabelWidth"
        >
          <el-input
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="auth__links-btn"
          @click="dialogFormVisible = false"
        >Отменить</el-button>
        <el-button
          class="auth__links-btn"
          type="primary"
          @click="dialogFormVisible = false"
        >Создать</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Categories',
  data() {
    return {
      categories: ['быйстрые', 'шустрые'],
      descriptions: ['ОЧень быстрые и дорогие', 'Для кенгуряу'],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      categoryNew: {
        name: '',
        duration: '',
      },
    };
  },
};
</script>

<style lang="scss">
.categories {
  height: 100%;
}

.table {
  display: flex;
  flex-direction: row;
  border: none;

  & tr {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    align-items: center;

    & td {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
    }

    & th {
      margin-bottom: 15px;
    }
  }

}

.button-create {
  margin-bottom: 15px;
}
</style>
