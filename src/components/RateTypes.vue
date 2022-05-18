<template>
  <div class="rate-types">
    <h1 class="title">
      Типы тарифов
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
      <table class="rate-types__table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Длительность</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="rateType in rateTypes"
            :key="rateType.id"
          >
            <td>{{ rateType.name }}</td>
            <td>{{ rateType.unit }}</td>

            <td>
              <el-button-group class="order-list__order-buttons buttons">
                <el-button
                  class="change"
                  type="outline-primary"
                  @click="onOpenEditRateTypeDialog(rateType)"
                >
                  <pre>Изменить</pre>
                </el-button>

                <el-popconfirm
                  title="Вы уверены, что хотите удалить?"
                  @confirm="onDeleteRateType(rateType.id)"
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
      :title="isEditMode ? 'Редактирование типа тарифа' : 'Новый тип тарифа'"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item
          label="Название"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="rateTypeNew.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Длительность"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="rateTypeNew.unit"
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
          :disabled="!rateTypeNew.name || !rateTypeNew.unit"
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
  name: 'RateTypes',

  data() {
    return {
      isFormLoading: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      rateTypeNew: {
        name: '',
        unit: '',
      },
    };
  },

  computed: {
    ...mapState('rateTypes', ['rateTypes']),

    isEditMode() {
      return !!this.rateTypeNew.id;
    },
  },

  created() {
    this.fetchRateTypes();
  },

  methods: {
    ...mapActions('rateTypes', ['fetchRateTypes', 'createRateType', 'deleteRateType', 'updateRateType']),

    async onConfirm() {
      this.isFormLoading = true;

      if (this.isEditMode) {
        await this.updateRateType({
          id: this.rateTypeNew.id,
          name: this.rateTypeNew.name,
          unit: this.rateTypeNew.unit,
        });
      } else {
        await this.createRateType({
          name: this.rateTypeNew.name,
          unit: this.rateTypeNew.unit,
        });
      }

      this.isFormLoading = false;

      this.dialogFormVisible = false;
    },

    async onDeleteRateType(id) {
      this.isFormLoading = true;

      await this.deleteRateType({ id });

      this.isFormLoading = false;
    },

    onOpenEditRateTypeDialog(rateType) {
      this.rateTypeNew = JSON.parse(JSON.stringify(rateType));
      this.dialogFormVisible = true;
    },

    onDialogClose() {
      this.dialogFormVisible = false;
      this.rateTypeNew = {
        name: '',
        unit: '',
      };
    },
  },
};
</script>

<style lang="scss">
.rate-types {
  height: 100%;
  overflow: auto;

  &__table {
    width: 100%;
  }
}

</style>
