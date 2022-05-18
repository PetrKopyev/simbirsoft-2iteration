<template>
  <div class="order-list">
    <h1 class="title">
      Заказы
    </h1>
    <div class="block">
      <div class="order-list__header">
        <div>
          <el-select
            v-model="timeValue"
            placeholder="За неделю"
          >
            <el-option
              v-for="(time, index) in times"
              :key="time.value"
              :value="index"
              :label="time.label"
            />
          </el-select>
          <el-select
            v-model="modelValue"
            placeholder="Elantra"
          >
            <el-option
              v-for="(model, index) in models"
              :key="model.value"
              :value="index"
              :label="model.label"
            />
          </el-select>
          <el-select
            v-model="cityValue"
            placeholder="Ульяновск"
          >
            <el-option
              v-for="(city, index) in cities"
              :key="city.value"
              :value="index"
              :label="city.label"
            />
          </el-select>
          <el-select
            v-model="statusValue"
            placeholder="В процессе"
          >
            <el-option
              v-for="(status, index) in statuses"
              :key="status.value"
              :value="index"
              :label="status.label"
            />
          </el-select>
        </div>
        <button class="order-list__header-btn">
          Применить
        </button>
      </div>
      <hr>
      <div class="order-list__order">
        <div class="order-list__order-info">
          <div class="order-list__order-image">
            <img
              src="@/assets/image/car.png"
              alt="car"
            >
          </div>
          <div class="order-list__order-info__text">
            <p><span>ELANTRA</span> в <span>Ульяновск</span>, Нариманова 42</p>
            <p>12.06.2019 12:00 — 13.06.2019 12:00</p>
            <p>Цвет: <span>Голубой</span></p>
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
          <span>4 300 ₽</span>
        </div>
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
      </div>
      <hr>
      <div class="order-list__pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="310"
          :pager-size="4"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data() {
    return {
      times: [{
        label: 'За неделю',
      }, {
        label: 'За месяц',
      }, {
        label: 'За год',
      }],
      models: [{
        label: 'Elantra',
      }, {
        label: 'Sonata',
      }, {
        label: 'Cerato',
      }],
      cities: [{
        label: 'Ульяновск',
      }, {
        label: 'Самара',
      }, {
        label: 'Казань',
      }],
      statuses: [{
        label: 'В процессе',
      }, {
        label: 'Готово',
      }, {
        label: 'Отменено',
      }],
      timeValue: '',
      modelValue: '',
      cityValue: '',
      statusValue: '',
    };
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
    margin-bottom: 75px;

    @include mobile {
      //flex-direction: column;
      flex-wrap: wrap;
    }

    &-image img {
      width: 138px;
      height: 63px;

      @include mobile {
        width: 198px;
        height: 84px;

      }
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
            }
          }
        }
        &.done {
          span {
            &:before {
              content: '';
              display: block;
              margin-right: 7px;
              margin-bottom: 3px;
              width: 4px;
              height: 9px;
              border: solid $main-green;
              border-width: 0 1px 1px 0;
              transform: rotate(45deg);
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

</style>
