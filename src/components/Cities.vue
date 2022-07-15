<template>
  <div class="cities">
    <h1 class="title">
      Города
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
      <table class="cities__table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="city in cities"
            :key="city.id"
          >
            <td>{{ city.name }}</td>

            <td>
              <el-button-group class="order-list__order-buttons buttons">
                <el-button
                  class="change"
                  type="outline-primary"
                  @click="onOpenEditCityDialog(city)"
                >
                  <pre>Изменить</pre>
                </el-button>

                <el-popconfirm
                  title="Вы уверены, что хотите удалить?"
                  @confirm="onDeleteCity(city.id)"
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
      :title="isEditMode ? 'Редактирование города' : 'Новый город'"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item
          label="Название"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="cityNew.name"
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
          :disabled="!cityNew.name"
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
  name: 'Cities',

  data() {
    return {
      isFormLoading: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      cityNew: {
        name: '',
      },
    };
  },

  computed: {
    ...mapState('cities', ['cities']),

    isEditMode() {
      return !!this.cityNew.id;
    },
  },

  created() {
    this.fetchCities();
  },

  methods: {
    ...mapActions('cities', ['fetchCities', 'createCity', 'deleteCity', 'updateCity']),

    async onConfirm() {
      this.isFormLoading = true;

      if (this.isEditMode) {
        await this.updateCity({
          id: this.cityNew.id,
          name: this.cityNew.name,
        });
      } else {
        await this.createCity({
          name: this.cityNew.name,
        });
      }

      this.isFormLoading = false;

      this.dialogFormVisible = false;
    },

    async onDeleteCity(id) {
      this.isFormLoading = true;

      await this.deleteCity({ id });

      this.isFormLoading = false;
    },

    onOpenEditCityDialog(city) {
      this.cityNew = JSON.parse(JSON.stringify(city));
      this.dialogFormVisible = true;
    },

    onDialogClose() {
      this.dialogFormVisible = false;
      this.cityNew = {
        name: '',
      };
    },
  },
};
</script>

<style lang="scss">
.cities {
  height: 100%;
  overflow: auto;

  &__table {
    width: 100%;

    @include mobile {
      thead {
        display: none;
      }

      tr {
        display: flex;
        flex-direction: column;

        &:not(:last-child) {
          td:last-child {
            border-bottom: 1px solid $main-black;
          }
        }
      }
    }
  }
}

</style>
