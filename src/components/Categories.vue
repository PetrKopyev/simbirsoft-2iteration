<template>
  <div class="categories">
    <h1 class="title">
      Категории
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
      <table class="categories__table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
          >
            <td>{{ category.name }}</td>

            <td class="categories__descr">
              {{ category.description }}
            </td>

            <td>
              <el-button-group class="order-list__order-buttons buttons">
                <el-button
                  class="change"
                  type="outline-primary"
                  @click="onOpenEditCategoryDialog(category)"
                >
                  <pre>Изменить</pre>
                </el-button>

                <el-popconfirm
                  title="Вы уверены, что хотите удалить?"
                  @confirm="onDeleteCategory(category.id)"
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
      :title="isEditMode ? 'Редактирование категории' : 'Новая категория'"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <el-form-item
          label="Название"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="categoryNew.name"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="Описание"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="categoryNew.description"
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
          :disabled="!categoryNew.name || !categoryNew.description"
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
  name: 'Categories',

  data() {
    return {
      isFormLoading: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      categoryNew: {
        name: '',
        description: '',
      },
    };
  },

  computed: {
    ...mapState('categories', ['categories']),

    isEditMode() {
      return !!this.categoryNew.id;
    },
  },

  created() {
    this.fetchCategories();
  },

  methods: {
    ...mapActions('categories', ['fetchCategories', 'createCategory', 'deleteCategory', 'updateCategory']),

    async onConfirm() {
      this.isFormLoading = true;

      if (this.isEditMode) {
        await this.updateCategory({
          id: this.categoryNew.id,
          name: this.categoryNew.name,
          description: this.categoryNew.description,
        });
      } else {
        await this.createCategory({
          name: this.categoryNew.name,
          description: this.categoryNew.description,
        });
      }

      this.isFormLoading = false;

      this.dialogFormVisible = false;
    },

    async onDeleteCategory(id) {
      this.isFormLoading = true;

      await this.deleteCategory({ id });

      this.isFormLoading = false;
    },

    onOpenEditCategoryDialog(category) {
      this.categoryNew = JSON.parse(JSON.stringify(category));
      this.dialogFormVisible = true;
    },

    onDialogClose() {
      this.dialogFormVisible = false;
      this.categoryNew = {
        name: '',
        description: '',
      };
    },
  },
};
</script>

<style lang="scss">
.categories {
  height: 100%;
  overflow: auto;

  &__table {
    width: 100%;
  }

  &__descr {
    @include desktop-min {
      max-width: 300px;
    }
  }
}

</style>
