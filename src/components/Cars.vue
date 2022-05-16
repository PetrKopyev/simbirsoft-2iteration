<template>
  <div class="cars">
    <h1 class="title">
      Список автомобилей
    </h1>
    <div class="cars__block">
      <div class="cars__filters">
        <div class="cars__filters-select">
          <el-select
            v-model="brandValue"
            placeholder="Марка"
          >
            <el-option
              v-for="(brand, index) in brands"
              :key="index"
              :value="brand.name"
              :label="brand.name"
            />
          </el-select>
          <el-select
            v-model="modelValue"
            placeholder="Модель"
          >
            <el-option
              v-for="(model, index) in models"
              :key="index"
              :label="model.name"
            />
          </el-select>
          <el-select
            v-model="colorValue"
            placeholder="Цвет"
          >
            <el-option
              v-for="color in colors"
              :key="color.value"
              :label="color.name"
            />
          </el-select>
          <el-select
            v-model="tariffValue"
            placeholder="Тариф"
          >
            <el-option
              v-for="tariff in tariffs"
              :key="tariff.value"
              :label="tariff.name"
            />
          </el-select>
        </div>
        <div class="cars__filters-buttons">
          <button class="cars__filters-buttons__reset auth__links-btn">
            Сбросить
          </button>
          <button class="cars__filters-buttons__apply auth__links-btn">
            Принять
          </button>
        </div>
      </div>
      <hr>
      <div class="cars__list">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="brand"
            label="Марка"
          />
          <el-table-column
            prop="model"
            label="Модель"
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
            prop="tariff"
            label="Тариф"
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
            label="Действия"
            width="300"
          >
            <template>
              <el-button-group class="order-list__order-buttons">
                <el-button
                  class="done"
                  type="outline-primary"
                >
                  Готово
                </el-button>
                <el-button
                  class="cancel"
                  type="outline-primary"
                >
                  Отмена
                </el-button>
                <el-button
                  class="change"
                  type="outline-primary"
                >
                  Изменить
                </el-button>
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
          :total="310"
          :pager-count="4"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cars',
  data() {
    return {
      brandValue: '',
      modelValue: '',
      colorValue: '',
      tariffValue: '',
      brands: [
        { name: 'brand 1' },
        { name: 'brand 2' },
        { name: 'brand 3' },
      ],
      models: [
        { name: 'model 1' },
        { name: 'model 2' },
        { name: 'model 3' },
      ],
      colors: [
        { name: 'color 1' },
        { name: 'color 2' },
        { name: 'color 3' },
      ],
      tariffs: [
        { name: 'tariff 1' },
        { name: 'tariff 2' },
        { name: 'tariff 3' },
      ],
      tableData: [{
        brand: 'Skoda',
        model: 'Octavia',
        color: 'Кварц',
        number: 'А880МЕ73',
        tariff: 'Комфорт',
        minPrice: 10000,
        maxPrice: 15000,
      }, {
        brand: 'Kia',
        model: 'Ceed',
        color: 'Снежная королева',
        number: 'О664ЕА73',
        tariff: 'Комфорт',
        minPrice: 8000,
        maxPrice: 12000,
      }],
    };
  },
};
</script>

<style lang="scss">
.cars {
  height: 100%;
  @include mobile {
    margin-bottom: 15px;
  }

  &__block {
    background-color: $white;
    margin: 0 30px;
    box-shadow: 0px 1px 0px rgba(90, 97, 105, 0.11), 0px 2px 4px rgba(90, 97, 105, 0.12),
    0px 5px 5px rgba(90, 97, 105, 0.06), 0px 3.5px 35px rgba(90, 97, 105, 0.1);
    border-radius: 9px;
  }
  &__filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 21px;

    &-buttons {
      display: flex;
      flex-direction: row;
      @include mobile {
        flex-direction: column;
      }

      &__reset {
        background: $strong-red;
        border: 0.5px solid $pure-blue;
        padding: 10px 20px;
        margin-right: 15px;

        @include mobile {
          margin-right: 0;
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

hr {
  color: $very-light-gray;
}
</style>
