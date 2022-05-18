<template>
  <div class="cars">
    <h1 class="title">
      Список автомобилей
    </h1>
    <div
      v-loading="isLoading"
      class="block"
    >
      <div class="cars__filters">
        <div class="cars__filters-select">
          <el-select
            v-model="filter.selectedCategory"
            placeholder="Категория"
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              :label="category.name"
            />
          </el-select>
        </div>
        <div class="cars__filters-buttons">
          <button
            class="cars__filters-buttons__reset auth__links-btn"
            @click="resetFilters"
          >
            Сбросить
          </button>
          <button
            class="cars__filters-buttons__apply auth__links-btn"
            @click="getCars(1)"
          >
            Принять
          </button>
        </div>
      </div>
      <hr>
      <div class="cars__list">
        <el-table
          :data="mappedCars"
          style="width: 100%"
        >
          <el-table-column
            prop="image"
            label="Изображение"
          >
            <template v-slot="scope">
              <img
                :src="scope.row.image"
                :alt="scope.row.name"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Название"
          />
          <el-table-column
            prop="category"
            label="Категория"
          />
          <el-table-column
            prop="color"
            label="Цвет"
            width="160"
          />
          <el-table-column
            prop="number"
            label="Гос. номер"
          />
          <el-table-column
            prop="tank"
            label="Топливо, л"
            width="100"
          />
          <el-table-column
            prop="minPrice"
            label="Мин. цена"
          />
          <el-table-column
            prop="maxPrice"
            label="Макс. цена"
          />
          <el-table-column
            v-slot="scope"
            label="Действия"
            width="210"
          >
            <template>
              <el-button-group class="order-list__order-buttons buttons">
                <el-button
                  class="change"
                  type="outline-primary"
                  @click="goToCar(scope.row.id)"
                >
                  <pre>Изменить</pre>
                </el-button>

                <el-popconfirm
                  title="Вы уверены, что хотите удалить?"
                  @confirm="onDeleteCar(scope.row.id)"
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
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        class="order-list__pagination"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :total="total"
          :page-size="CARS_PER_PAGE"
          @current-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { CARS_PER_PAGE } from '@/constants/cars.contants';
import api from '@/api';

export default {
  name: 'Cars',
  data() {
    return {
      isLoading: false,

      currentPage: 1,

      filter: {
        selectedCategory: null,
      },
    };
  },

  computed: {
    ...mapState('cars', ['total', 'cars']),
    ...mapState('categories', ['categories']),

    mappedCars() {
      return this.cars.map((item) => ({
        id: item.id,
        name: item.name,
        color: item.colors.join(', '),
        number: item.number,
        minPrice: item.priceMin,
        maxPrice: item.priceMax,
        description: item.description,
        image: item.thumbnail.path,
        tank: item.tank,
        category: item.categoryId?.name || 'Нет категории',
      }));
    },
  },

  created() {
    this.CARS_PER_PAGE = CARS_PER_PAGE;
    this.fetchCategories();
    this.getCars();
  },

  methods: {
    ...mapActions('cars', ['fetchCars']),
    ...mapActions('categories', ['fetchCategories']),

    async getCars(page = 1) {
      this.currentPage = page;

      try {
        this.isLoading = true;

        const params = {
          page,
        };

        if (this.filter.selectedCategory) {
          params.categoryId = this.filter.selectedCategory;
        }

        await this.fetchCars(params);
      } finally {
        this.isLoading = false;
      }
    },

    resetFilters() {
      this.filter = {
        selectedCategory: null,
      };
      this.getCars(1);
    },

    onPageChange(page) {
      this.getCars(page);
    },

    goToCar(id) {
      this.$router.push({ name: 'Car', params: { id } });
    },

    async onDeleteCar(id) {
      try {
        this.isLoading = true;

        await api.cars.deleteCar(id);
        await this.getCars();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.cars {
  height: 100%;
  overflow: auto;

  @include mobile {
    overflow-x: hidden;
  }

  &__filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 21px;

    @include mobile {
      flex-direction: column;
      padding: 5px 5px;
    }

    &-buttons {
      display: flex;
      flex-direction: row;
      @include mobile {
        flex-direction: column;
        width: 110.5px;
        margin-top: 15px;
      }

      &__reset {
        background: $strong-red;
        border: 0.5px solid $pure-blue;
        padding: 10px 20px;
        margin-right: 15px;

        @include mobile {
          margin-right: 0;
          margin-bottom: 5px;
        }
      }
      &__apply {
        padding: 10px 20px;
      }
    }
  }
  &__list {
    width: 100%;
    padding: 15px 5px 15px 11px;

    @include mobile {
      padding: 0;
    }

    .el-button-group {
      display: flex;
      flex-direction: row;
    }
  }
}

.el-table {
  @include mobile {
    font-size: 10px ;
  }
}

.el-table th.el-table__cell>.cell {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.377143px;
    color: $very-dark-desaturated-blue;

  @include mobile {
    font-size: 10px !important;
    max-width: 60px;
  }
}

.el-table .el-table__cell {
  text-align: center;
}

hr {
  color: $very-light-gray;
}

</style>
