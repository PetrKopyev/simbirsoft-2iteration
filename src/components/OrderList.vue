<template>
  <div class="order-list">
    <h1 class="title">
      Заказы
    </h1>
    <div
      v-loading="isLoading"
      class="block"
    >
      <div class="order-list__header">
        <div class="order-list__header-fillters">
          <el-input
            v-model="filter.color"
            placeholder="Цвет"
            style="width: 50%"
          />

          <el-select
            v-model="filter.options"
            multiple
            style="width: 50%"
          >
            <el-option
              value="isFullTank"
              label="Полный бак"
            />
            <el-option
              value="isNeedChildChair"
              label="Детское кресло"
            />
            <el-option
              value="isRightWheel"
              label="Правый руль"
            />
          </el-select>
        </div>
        <div class="order-list__header-buttons">
          <button
            class="order-list__header-btn"
            @click="onFilterClear"
          >
            Сбросить
          </button>
          <button
            class="order-list__header-btn"
            @click="onFilter"
          >
            Применить
          </button>
        </div>
      </div>
      <hr>
      <div class="order-list__wrapper">
        <div
          v-for="orderItem in mappedOrders"
          :key="orderItem.id"
          class="order-list__order"
        >
          <div class="order-list__order-info">
            <picture
              :class="[
                'order-list__order-image',
                { 'order-list__order-image--no-image': !orderItem.car.image }
              ]"
            >
              <img
                v-if="orderItem.car.image"
                :src="orderItem.car.image"
                :alt="orderItem.car.alt"
              >
            </picture>
            <div class="order-list__order-info__text">
              <p v-if="orderItem.car.name || orderItem.city || orderItem.address">
                <span v-if="orderItem.car.name">{{ orderItem.car.name }}</span>
                <template v-if="orderItem.city">
                  в <span>{{ orderItem.city }}</span>
                </template>
                {{ orderItem.address ? `, ${orderItem.address}` : '' }}
              </p>
              <p>
                {{ orderItem.dates }}
              </p>
              <p v-if="orderItem.color">
                Цвет: <span>{{ orderItem.color }}</span>
              </p>
            </div>
          </div>
          <div class="order-list__order-options">
            <div
              class="order-list__order-options__item"
            >
              <input
                id="c1"
                type="checkbox"
                value="fullTank"
                name="cc"
                disabled
                :checked="orderItem.isFullTank"
              >
              <label for="c1">
                <img
                  class="order-list__order-options__item-checkbox"
                  src="@/assets/image/checkbox.png"
                >
                <span />
                Полный бак
              </label>
            </div>
            <div class="order-list__order-options__item">
              <input
                id="c2"
                type="checkbox"
                value="child"
                name="cc"
                disabled
                :checked="orderItem.isNeedChildChair"
              >
              <label for="c2">
                <img
                  class="order-list__order-options__item-checkbox"
                  src="@/assets/image/checkbox.png"
                >
                <span />
                Детское кресло
              </label>
            </div>
            <div class="order-list__order-options__item">
              <input
                id="c3"
                type="checkbox"
                value="right"
                name="cc"
                disabled
                :checked="orderItem.isRightWheel"
              >
              <label for="c3">
                <img
                  class="order-list__order-options__item-checkbox"
                  src="@/assets/image/checkbox.png"
                >
                <span />
                Правый руль
              </label>
            </div>
          </div>
          <div class="order-list__order-price">
            <span>{{ orderItem.price }} ₽</span>
          </div>
          <el-button-group class="order-list__order-buttons buttons">
            <el-button
              class="change"
              type="outline-primary"
              @click="onOpenDialog(orderItem)"
            >
              <pre>Изменить</pre>
            </el-button>

            <el-popconfirm
              title="Вы уверены, что хотите удалить?"
              @confirm="onOrderDelete(orderItem.id)"
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
        </div>
      </div>
      <hr>
      <div class="order-list__pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :total="total"
          :page-size="ORDERS_PER_PAGE"
          @current-change="onPageChange"
        />
      </div>
    </div>
    <el-dialog
      :show-close="false"
      :title="'Редактирование заказа'"
      :visible.sync="dialogFormVisible"
      width="60%"
      @close="onDialogClose"
    >
      <el-form class="order-list__form">
        <el-form-item
          label="Автомобиль"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="order.car"
            placeholder="Выберите автомобиль"
            style="width: 100%"
          >
            <el-option
              v-for="car in cars"
              :key="car.id"
              :value="car.id"
              :label="car.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Цвет"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="order.color"
            placeholder="Выберите цвет"
            style="width: 100%"
            :disabled="!selectedCar.colors"
          >
            <el-option
              v-for="color in selectedCar.colors"
              :key="color"
              :value="color"
              :label="color"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="order.city"
            placeholder="Выберите город"
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
        <el-form-item>
          <el-select
            v-model="order.address"
            placeholder="Выберите пункт выдачи"
            style="width: 100%"
            :disabled="!allowedPoints.length"
          >
            <el-option
              v-for="point in allowedPoints"
              :key="point.id"
              :value="point.id"
              :label="`${point.name} (${point.address})`"
            />
          </el-select>
        </el-form-item>

        <el-date-picker
          v-model="order.dates"
          type="datetimerange"
          value-format="timestamp"
          format="dd.MM.yyyy HH:mm"
          :picker-options="{firstDayOfWeek: 1}"
          class="order-list__datepicker"
        />
        <div style="margin-bottom: 15px">
          <el-checkbox v-model="order.isFullTank">
            Полный бак
          </el-checkbox>
          <el-checkbox v-model="order.isNeedChildChair">
            Детское кресло
          </el-checkbox>
          <el-checkbox v-model="order.isRightWheel">
            Правый руль
          </el-checkbox>
        </div>

        <el-form-item>
          <el-input
            v-model.number="order.price"
            :min="0"
            type="number"
            placeholder="Введите цену"
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
          @click="onSaveOrder"
        >
          Сохранить
        </el-button>

        <el-button
          class="auth__links-btn"
          type="plain"
          @click="dialogFormVisible = false"
        >
          Отменить
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapActions, mapState } from 'vuex';
import { ORDERS_PER_PAGE } from '@/constants/order.constants';
import api from '@/api';

export default {
  name: 'OrderList',

  data() {
    return {
      isLoading: false,
      formLabelWidth: '100px',
      dialogFormVisible: false,
      currentPage: 1,
      order: {
        car: '',
        city: '',
        address: '',
        color: '',
        dates: [],
        isFullTank: false,
        isNeedChildChair: false,
        isRightWheel: false,
        price: null,
      },

      filter: {
        color: '',
        options: [],
      },
    };
  },

  computed: {
    ...mapState('orders', ['orders', 'total']),
    ...mapState('cars', ['cars']),
    ...mapState('cities', ['cities']),
    ...mapState('points', ['points']),

    mappedOrders() {
      return this.orders.map((item) => ({
        id: item.id,
        car: item.carId
          ? {
            id: item.carId.id,
            name: item.carId.name,
            image: item.carId.thumbnail?.path,
          }
          : {},
        color: item.color,
        city: item.cityId?.name,
        cityId: item.cityId?.id,
        address: item.pointId?.address,
        pointId: item.pointId?.id,
        dateFrom: item.dateFrom,
        dateTo: item.dateTo,
        dates: `${dayjs(item.dateFrom).format('DD.MM.YYYY HH:mm')} — ${dayjs(item.dateTo).format('DD.MM.YYYY HH:mm')}`,
        isFullTank: item.isFullTank,
        isNeedChildChair: item.isNeedChildChair,
        isRightWheel: item.isRightWheel,
        price: item.price,
      }));
    },

    selectedCar() {
      return this.cars.find((item) => item.id === this.order.car) || {};
    },

    selectedCity() {
      return this.cities.find((item) => item.id === this.order.city) || {};
    },

    allowedPoints() {
      return this.points.filter((item) => item.cityId.id === this.selectedCity.id);
    },
  },

  watch: {
    // eslint-disable-next-line func-names
    'order.city': function (newValue, oldValue) {
      if (oldValue) {
        this.order.address = '';
      }
    },
    // eslint-disable-next-line func-names
    'order.car': function (newValue, oldValue) {
      if (oldValue || oldValue === undefined) {
        this.order.color = '';
      }
    },
  },

  created() {
    this.ORDERS_PER_PAGE = ORDERS_PER_PAGE;
    this.init();
  },

  methods: {
    ...mapActions('orders', ['fetchOrders']),
    ...mapActions('cars', ['fetchCars']),
    ...mapActions('cities', ['fetchCities']),
    ...mapActions('points', ['fetchPoints']),

    init() {
      this.isLoading = true;
      Promise.all([
        this.fetchCars({ limit: null }),
        this.fetchCities(),
        this.fetchPoints(),
      ]).then(() => {
        this.fetchOrders();
      }).catch((e) => {
        console.error(e);
      }).finally(() => {
        this.isLoading = false;
      });
    },

    onPageChange(page) {
      this.fetchOrders({ page: page - 1 });
    },

    onFilterClear() {
      this.filter = {
        color: '',
        options: [],
      };
      this.fetchOrders();
    },

    onFilter() {
      const filterData = {
        color: this.filter.color || null,
        isFullTank: this.filter.options.includes('isFullTank') || null,
        isNeedChildChair: this.filter.options.includes('isNeedChildChair') || null,
        isRightWheel: this.filter.options.includes('isRightWheel') || null,
      };

      this.fetchOrders({ page: 0, ...filterData });
    },

    async onSaveOrder() {
      const orderData = {
        cityId: this.order.city
          ? this.cities.find((item) => item.id === this.order.city)
          : null,
        carId: this.order.car
          ? this.cars.find((item) => item.id === this.order.car)
          : null,
        pointId: this.order.address
          ? this.points.find((item) => item.id === this.order.address)
          : null,
        dateFrom: this.order.dates[0],
        dateTo: this.order.dates[1],
        isFullTank: this.order.isFullTank,
        isNeedChildChair: this.order.isNeedChildChair,
        isRightWheel: this.order.isRightWheel,
        price: this.order.price,
        color: this.order.color,
      };
      const orderId = this.order.id;

      try {
        this.isLoading = true;
        await api.orders.updateOrder(orderId, orderData);
        await this.fetchOrders({ page: this.currentPage - 1 });
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
        this.dialogFormVisible = false;
      }

      console.log(orderData);
    },

    async onOrderDelete(id) {
      try {
        await api.orders.deleteOrder(id);
        await this.fetchOrders();
        this.currentPage = 1;
      } catch (e) {
        console.error(e);
      }
    },

    onOpenDialog(order) {
      this.dialogFormVisible = true;

      this.order = {
        id: order.id,
        car: order.car?.id,
        city: order.cityId,
        address: order.pointId,
        color: order.color,
        dates: [order.dateFrom, order.dateTo],
        isFullTank: order.isFullTank,
        isNeedChildChair: order.isNeedChildChair,
        isRightWheel: order.isRightWheel,
        price: order.price,
      };
    },

    onDialogClose() {
      this.order = {
        car: '',
        city: '',
        address: '',
        color: '',
        dates: [],
        isFullTank: false,
        isNeedChildChair: false,
        isRightWheel: false,
        price: null,
      };
    },
  },
};
</script>

<style lang="scss">
.title {
  font-weight: 400;
  font-size: 29px;
  line-height: 33px;
  letter-spacing: -0.725px;
  color: $very-dark-desaturated-blue;
  margin-left: 32px;
  margin-top: 28.5px;
  margin-bottom: 30px;

  @include mobile {
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
.order-list {
  height: 100%;

  @include mobile {
    margin-bottom: 15px;
  }

  &__form {
    @include mobile {
      display: flex;
      flex-direction: column;
    }

  }

  &__datepicker {
    margin-bottom: 20px;
    max-width: 380px !important;
  }

  &__block {
    margin-left: 32px;
    margin-right: 25px;
    background-color: $white;
    border-radius: 9px;
    padding-top: 16px;

  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    padding: 0 21.5px;
    @include mobile {
      flex-direction: column;
    }

    &-fillters {
      display: flex;
      flex-direction: row;
      @include mobile {
        margin-bottom: 15px;
      }
    }

    &-buttons {
      display: flex;
      flex-direction: row;

    }

    &-btn {
      background: $pure-blue;
      border: 0.5px solid $pure-blue;
      box-sizing: border-box;
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 11.5px;
      line-height: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: -0.0821429px;
      color: $white;
      cursor: pointer;
      text-decoration: none;
      height: 29px;
      width: 95px;

      @include mobile {
        width: 65px;
      }

      &:last-child {
        margin-left: 10px;
      }

      &:hover {
        color: $dark-grey;
      }
    }

  }

  &__order {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 21.5px;
    margin-top: 15px;
    margin-bottom: 25px;

    &:not(:last-child) {
      border-bottom: 1px solid $grey;
    }

    @include mobile {
      flex-wrap: wrap;
    }

    &-info {
      display: flex;
      align-items: center;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: -0.408571px;
      color: $dark-grayish-blue-3;

      @media screen and (max-width: 1200px)  {
        flex-direction: column;
      }

      @include mobile {
        margin-bottom: 15px;
        width: 100%;
        justify-content: center;
      }

      &__text {
        margin-left: 20px;

        @media screen and (max-width: 1200px) {
          margin-left: 0;
          margin-top: 15px;
        }
      }

      & p {
        margin-bottom: 5px;
      }

      & span {
        color: $main-black;
      }
    }

    &-image {
      width: 138px;
      min-height: 110px;

      @include mobile {
        width: 198px;
        height: 84px;
      }

      img {
        object-fit: contain;
      }

      &--no-image {
        background: $grey;
      }
    }

    &-options {
      display: flex;
      flex-direction: column;

      @include mobile {
        margin-bottom: 10px;
      }

      &__item {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        letter-spacing: -0.175439px;
        color: $grey;
        align-items: center;
        margin-bottom: 7px;

        & label {
          display: flex;
        }

        &-checkbox {
          display: none;
        }

        & input[type=checkbox]:checked ~ label > img {
          display: block;
          width: 7px;
          height: 6px;
          margin-right: 8px;
          position: absolute;
          margin-top: 3px;
          margin-left: 2px;
        }

        & input[type="checkbox"] {
          display:none;
        }

        & input[type="checkbox"]:checked ~ label {
          color: $main-black;
          position: relative;
        }

        & input[type="checkbox"] + label span {
          display:inline-block;
          margin: 0px 4px 0 -1px;
          width: 13px;
          height: 13px;
          border: 1px solid $grey;
          cursor:pointer;
          vertical-align:middle;
          border-radius: 1px;
        }

        & input[type="checkbox"]:checked + label span {
          border: 1px solid $main-green;
        }

      }
    }

    &-price {
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      letter-spacing: -0.754286px;
      color: $main-black;
    }

    &-buttons {
      @include tablet {
        display: flex;
        flex-direction: column;
      }
      & button {
        padding: 6px 12px;

        span {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.change {
          span {
            &:before {
              content: '•••';
              display: block;
              transform: rotate(90deg);
              color: inherit;
              font-size: 9px;
              margin-right: 3px;
            }
          }
        }
        &.cancel {
          span {
            &:before {
              content: '\2715';
              display: block;
              color: $strong-red;
              font-size: 11px;
              margin-right: 5px;

              @include tablet {}
            }
          }
        }
      }
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }

}

.el-select {
  width: 110.5px;
  margin-right: 15px;
}

.el-input__icon {
  line-height: 29px;
  width: 8px;
}

.el-select .el-input .el-select__caret {
  transition: none;
  transform: none;
}

.el-input__inner {
  height: 29px;
  &::placeholder {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: -0.345714px;
    color: $dark-grayish-blue-3;
  }
}

.el-icon-arrow-up:before {
  content: url("../assets/image/icon-dropdown.svg");
}

.el-button--primary {
  color: $very-dark-grayish-blue;
  background-color: $white;
  border-color: $grayish-blue;
}

.el-icon-arrow-left:before {
  content: "«";
}
.el-icon-arrow-right:before {
  content: "»";
}

.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: $white;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  color: $pure-blue;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: $pure-blue;
  border-radius: 50%;
  color: $white;
}
.el-pager li {
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.471429px;
  color: $pure-blue;
  max-width: 18px;

}

.el-pagination.is-background .el-pager li {
  margin: 0;
  padding: 0;
}

hr {
  color: $very-light-gray;
}

.el-icon-time:before {
  display: none;
}

</style>
