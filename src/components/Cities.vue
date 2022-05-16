<template>
  <div class="cities">
    <h1 class="title">
      Города
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
              v-for="(city, index) in cities"
              :key="index"
            >
              {{ city }}
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
      title="Добавление города"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item
          v-model="cityNew.name"
          label="Название"
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
  name: 'Cities',
  data() {
    return {
      cities: ['Ульяновск', 'Самара'],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      cityNew: {
        name: '',
        duration: '',
      },
    };
  },
};
</script>

<style lang="scss">
.cities {
  height: 100%;
}

</style>
