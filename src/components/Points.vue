<template>
  <div class="points">
    <h1 class="title">
      Пункты выдачи
    </h1>
    <div
      v-loading="isFormLoading"
      class="block"
    >
      <el-button
        class="auth__links-btn button-create"
        type="text"
        @click="dialogFormVisible = true"
      >
        Создать
      </el-button>
      <table class="points__table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Город</th>
            <th>Адрес</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="point in points"
            :key="point.id"
          >
            <td>{{ point.name }}</td>
            <td>г. {{ point.cityId.name }}</td>
            <td>{{ point.address }}</td>

            <td>
              <el-button-group class="order-list__order-buttons buttons">
                <el-button
                  class="change"
                  type="outline-primary"
                  @click="onOpenEditPointDialog(point)"
                >
                  <pre>Изменить</pre>
                </el-button>

                <el-popconfirm
                  title="Вы уверены, что хотите удалить?"
                  @confirm="onDeletePoint(point.id)"
                >
                  <el-button
                    slot="reference"
                    class="cancel"
                    type="outline-primary"
                  >
                    <pre>Удалить</pre>
                  </el-button>
                </el-popconfirm>
              </el-button-group>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <el-dialog
      :show-close="false"
      :title="isEditMode ? 'Редактирование пункта выдачи' : 'Новый пункт выдачи'"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item
          label="Название пункта"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="pointNew.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Название города"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="pointNew.cityId"
            style="width: 100%"
          >
            <el-option
              v-for="city in cities"
              :key="city.id"
              :value="city.id"
              :label="city.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Адрес пункта выдачи"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="pointNew.address"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="auth__links-btn"
          type="primary"
          :disabled="!pointNew.name || !pointNew.cityId || !pointNew.address"
          @click="onConfirm"
        >
          Сохранить
        </el-button>

        <el-button
          class="auth__links-btn"
          type="plain"
          @click="onDialogClose"
        >
          Отменить
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Points',
  data() {
    return {
      isFormLoading: false,
      formLabelWidth: '130px',
      dialogFormVisible: false,
      pointNew: {
        name: '',
        cityId: '',
        address: '',
      },
    };
  },
  computed: {
    ...mapState('points', ['points']),
    ...mapState('cities', ['cities']),

    isEditMode() {
      return !!this.pointNew.id;
    },
  },

  created() {
    this.fetchPoints();
    this.fetchCities();
  },

  methods: {
    ...mapActions('points', ['fetchPoints', 'updatePoint', 'createPoint', 'deletePoint']),
    ...mapActions('cities', ['fetchCities']),

    async onConfirm() {
      this.isFormLoading = true;

      const cityId = this.cities.find((item) => item.id === this.pointNew.cityId);

      if (this.isEditMode) {
        await this.updatePoint({
          id: this.pointNew.id,
          name: this.pointNew.name,
          cityId,
          address: this.pointNew.address,
        });
      } else {
        await this.createPoint({
          name: this.pointNew.name,
          cityId,
          address: this.pointNew.address,
        });
      }

      this.isFormLoading = false;

      this.dialogFormVisible = false;
    },

    async onDeletePoint(id) {
      this.isFormLoading = true;

      await this.deletePoint({ id });

      this.isFormLoading = false;
    },

    onOpenEditPointDialog(point) {
      const newPoint = JSON.parse(JSON.stringify(point));

      newPoint.cityId = newPoint.cityId.id;
      this.pointNew = newPoint;
      this.dialogFormVisible = true;
    },

    onDialogClose() {
      this.dialogFormVisible = false;
      this.pointNew = {
        name: '',
        cityId: '',
        address: '',
      };
    },
  },
};
</script>

<style lang="scss">
.points {
  height: 100%;
  overflow: auto;

  &__table {
    width: 100%;
  }
}

</style>
