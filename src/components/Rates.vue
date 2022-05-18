<template>
  <div class="rates">
    <h1 class="title">
      Тарифы
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
      <table class="rates__table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="rate in rates"
            :key="rate.id"
          >
            <td>{{ rate.rateTypeId.name }}</td>

            <td>{{ rate.price }}</td>

            <td>
              <el-button-group class="order-list__order-buttons buttons">
                <el-button
                  class="change"
                  type="outline-primary"
                  @click="onOpenEditRateDialog(rate)"
                >
                  <pre>Изменить</pre>
                </el-button>

                <el-popconfirm
                  title="Вы уверены, что хотите удалить?"
                  @confirm="onDeleteRate(rate.id)"
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
      :title="isEditMode ? 'Редактирование тарифа' : 'Новый тариф'"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item
          label="Название"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="rateNew.rateTypeId"
            style="width: 100%"
          >
            <el-option
              v-for="rateTypeIdItem in rateTypes"
              :key="`rateTypeId-${rateTypeIdItem.id}`"
              :value="rateTypeIdItem.id"
              :label="`${rateTypeIdItem.name} ${rateTypeIdItem.unit}`"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Цена"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="rateNew.price"
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
          :disabled="!rateNew.rateTypeId || !rateNew.price"
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
  name: 'Rates',

  data() {
    return {
      isFormLoading: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      rateNew: {
        rateTypeId: '', // rateTypeId ID
        price: '',
      },
    };
  },

  computed: {
    ...mapState('rates', ['rates']),
    ...mapState('rateTypes', ['rateTypes']),

    isEditMode() {
      return !!this.rateNew.id;
    },
  },

  created() {
    this.fetchRates();
    this.fetchRateTypes();
  },

  methods: {
    ...mapActions('rates', ['fetchRates', 'createRate', 'deleteRate', 'updateRate']),
    ...mapActions('rateTypes', ['fetchRateTypes']),

    async onConfirm() {
      this.isFormLoading = true;

      const rateTypeId = this.rateTypes.find((item) => item.id === this.rateNew.rateTypeId);

      console.log(rateTypeId);

      if (this.isEditMode) {
        await this.updateRate({
          id: this.rateNew.id,
          rateTypeId,
          price: this.rateNew.price,
        });
      } else {
        await this.createRate({
          rateTypeId,
          price: this.rateNew.price,
        });
      }

      this.isFormLoading = false;

      this.dialogFormVisible = false;
    },

    async onDeleteRate(id) {
      this.isFormLoading = true;

      await this.deleteRate({ id });

      this.isFormLoading = false;
    },

    onOpenEditRateDialog(rate) {
      const newRate = JSON.parse(JSON.stringify(rate));

      newRate.rateTypeId = newRate.rateTypeId.id;
      this.rateNew = newRate;
      this.dialogFormVisible = true;
    },

    onDialogClose() {
      this.dialogFormVisible = false;
      this.rateNew = {
        rateTypeId: '',
        price: '',
      };
    },
  },
};
</script>

<style lang="scss">
.rates {
  height: 100%;
  overflow: auto;

  &__table {
    width: 100%;
  }
}
</style>
