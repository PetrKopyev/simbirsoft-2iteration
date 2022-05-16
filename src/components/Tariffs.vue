<template>
  <div class="tariffs">
    <h1 class="title">
      Тарифы
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
              v-for="(tariff, index) in tariffs"
              :key="index"
            >
              {{ tariff }}
            </td>
          </tr>
          <tr>
            <th>Длительность</th>
            <td
              v-for="(time, index) in times"
              :key="index"
            >
              {{ time }}
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
      title="Новый тариф"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item
          v-model="tariffNew.name"
          label="Название"
          :label-width="formLabelWidth"
        >
          <el-input
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-model="tariffNew.time"
          label="Длительность"
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
  name: 'Tariffs',
  data() {
    return {
      tariffs: ['Эконом', 'Люкс'],
      times: ['5min', '7min'],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      tariffNew: {
        name: '',
        time: '',
      },
    };
  },
};
</script>

<style lang="scss">
.tariffs {
  height: 100%;
}
.block {
  background-color: $white;
  margin: 0 30px;
  box-shadow: 0px 1px 0px rgba(90, 97, 105, 0.11), 0px 2px 4px rgba(90, 97, 105, 0.12),
  0px 5px 5px rgba(90, 97, 105, 0.06), 0px 3.5px 35px rgba(90, 97, 105, 0.1);
  border-radius: 9px;
  padding: 15px 32px;
}

</style>
