<template>
  <section class="car">
    <h1 class="title">
      Карточка автомобиля
    </h1>
    <div
      v-loading="isLoading"
      class="car__blocks"
    >
      <section class="car__block-info">
        <div class="car__block-info__load">
          <picture class="car__block-info__load-img">
            <img
              v-if="car.thumbnail"
              :src="car.thumbnail.path"
              alt="car"
            >
          </picture>
          <h2 class="car__block-info__load-name">
            {{ car.name }}
          </h2>
          <span
            v-if="car.categoryId"
            class="car__block-info__load-descr"
          >
            {{ selectedCategoryName }}
          </span>
          <div class="car__block-info__load-upload file_upload">
            <div>Выберите файл...</div>
            <button>Обзор</button>
            <input
              ref="loadfiles"
              type="file"
              accept=".jpg, .jpeg, .png"
              @change="onLoadFile"
            >
          </div>
        </div>
        <div class="car__block-info__filled">
          <div class="car__block-info__filled-about">
            <span>Заполнено</span>
            <span style="color: #5A6169">{{ filledCount.formatted }}%</span>
          </div>
          <div class="car__block-info__filled-progress">
            <span :style="`width: ${filledCount.result}%`" />
          </div>
        </div>
        <div class="car__block-info__text">
          <h4>Описание</h4>
          <el-input
            v-model="car.description"
            placeholder="Введите описание"
            type="textarea"
            :rows="5"
          />

          <div
            v-if="!$v.car.description.required"
            class="invalid-feedback auth__error"
          >
            Поле обязательно для заполнения
          </div>
        </div>
      </section>
      <div class="car__block-set">
        <h3>Настройки автомобиля</h3>
        <form class="car__block-set__auto">
          <div class="car__block-set__auto-model">
            <label for="modelCar">Название</label>
            <el-input
              id="modelCar"
              v-model="car.name"
              type="text"
              placeholder="Название автомобиля"
            />
          </div>
          <div class="car__block-set__auto-model">
            <label for="typeCar">Категория</label>
            <el-select
              id="typeCar"
              v-model="car.categoryId"
              placeholder="Категория автомобиля"
              style="width: 100%"
            >
              <el-option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                :label="category.name"
              />
            </el-select>
          </div>
          <div class="car__block-set__auto-model">
            <label for="typeCar">Номер</label>
            <el-input
              id="numberCar"
              v-model="car.number"
              type="text"
              placeholder="Государственный рег. знак"
            />
          </div>
          <div class="car__block-set__auto-model">
            <label for="typeCar">Топливо</label>
            <el-input
              id="tankCar"
              v-model="car.tank"
              type="number"
              min="0"
              placeholder="Вместимость бака"
            />
          </div>
          <div class="car__block-set__auto-model">
            <label for="typeCar">Минимальная цена</label>
            <el-input
              id="minPriceCar"
              v-model="car.priceMin"
              type="number"
              min="0"
              placeholder="Цена от"
            />
          </div>
          <div class="car__block-set__auto-model">
            <label for="typeCar">Максимальная цена</label>
            <el-input
              id="maxPriceCar"
              v-model="car.priceMax"
              type="number"
              min="0"
              placeholder="Цена до"
            />
          </div>
          <div class="car__block-set__auto-model">
            <label for="colorsForPick">Доступные цвета</label>
            <div class="car__block-set__auto-model__input">
              <el-input
                id="colorsForPick"
                v-model="newColor"
                type="text"
                placeholder="Название цвета"
              />
              <button @click.prevent="addColor">
                +
              </button>
            </div>
          </div>
        </form>
        <div class="car__block-set__colors">
          <ul>
            <li
              v-for="(color, index) in colors"
              :key="index"
            >
              <input
                v-model="color.checked"
                type="checkbox"
                :checked="color.checked"
              >
              <span>{{ color.name }}</span>
            </li>
          </ul>
        </div>
        <div class="car__block-set__buttons">
          <div class="car__block-set__buttons-choise">
            <button
              class="car__block-set__buttons-choise-save auth__links-btn"
              @click="onSave"
            >
              Сохранить
            </button>
            <button
              class="car__block-set__buttons-choise-cancel auth__links-btn"
              @click="onCancel"
            >
              Отменить
            </button>
          </div>
          <button
            class="car__block-set__buttons-delete auth__links-btn"
            @click="onDelete"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import toBase64 from '@/util/toBase64';
import api from '@/api';

export default {
  name: 'Car',

  data() {
    return {
      isLoading: false,
      newColor: '',
      colors: [],
      car: {
        categoryId: '',
        description: '',
        name: '',
        number: '',
        priceMax: '',
        priceMin: '',
        tank: '',
        thumbnail: '',
      },
    };
  },

  validations: {
    car: {
      categoryId: {
        required,
      },
      description: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(1000),
      },
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      number: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(8),
      },
      priceMax: {
        required,
      },
      priceMin: {
        required,
      },
      tank: {
        required,
      },
      thumbnail: {
        required,
      },
    },
    colors: {
      required,
    },
  },

  computed: {
    ...mapState('categories', ['categories']),

    carId() {
      return this.$route.params.id;
    },

    isEditMode() {
      return !!this.carId;
    },

    selectedCategoryName() {
      return this.categories.find((item) => item.id === this.car.categoryId)?.name;
    },

    filledCount() {
      const fieldsCount = Object.keys(this.car).length + 1; // +1 - this.colors
      const percentPerField = 100 / fieldsCount;
      let result = 0;

      Object.values(this.car).forEach((value) => {
        if (value) result += percentPerField;
      });

      if (this.colors.some((color) => color.checked)) {
        result += percentPerField;
      }

      return {
        result,
        formatted: Math.round(result),
      };
    },
  },

  created() {
    this.init();
  },

  methods: {
    ...mapActions('cars', ['fetchCar']),
    ...mapActions('categories', ['fetchCategories']),

    async init() {
      await this.fetchCategories();

      if (this.isEditMode) {
        const car = await this.fetchCar(this.carId);

        this.colors = car.colors.map((item) => ({
          name: item,
          checked: true,
        }));

        this.car = ({
          categoryId: car.categoryId.id,
          description: car.description,
          name: car.name,
          number: car.number,
          priceMax: car.priceMax,
          priceMin: car.priceMin,
          tank: car.tank,
          thumbnail: car.thumbnail,
        });
      }
    },

    addColor() {
      if (this.newColor) {
        this.colors.push({
          name: this.newColor,
          checked: true,
        });

        this.newColor = '';
      }
    },

    async onLoadFile() {
      const file = this.$refs.loadfiles.files[0];

      this.car.thumbnail = {
        mimetype: file.type,
        originalname: file.name,
        size: file.size,
        path: await toBase64(file),
      };
    },

    onCancel() {
      this.$router.push({ name: 'Cars' });
    },

    async onSave() {
      this.$v.$touch();

      if (this.$v.$invalid) return;

      const car = {
        ...this.car,
        colors: this.colors.filter((item) => item.checked).map((item) => item.name),
      };

      if (this.isEditMode) {
        try {
          this.isLoading = true;

          await api.cars.updateCar(this.carId, car);
        } catch (e) {
          console.error(e);
        } finally {
          this.isLoading = false;
        }
      } else {
        try {
          this.isLoading = true;

          await api.cars.createCar(car);
        } catch (e) {
          console.error(e);
        } finally {
          this.isLoading = false;
        }
      }
    },

    async onDelete() {
      if (this.isEditMode) {
        try {
          this.isLoading = true;

          await api.cars.deleteCar(this.carId);

          this.onCancel();
        } catch (e) {
          console.error(e);
        } finally {
          this.isLoading = false;
        }
      } else {
        this.onCancel();
      }
    },
  },
};
</script>

<style lang="scss">

.car {
  height: 100%;
  overflow: auto;

  @include tablet {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__blocks {
    padding: 0 32px;
    margin: 20px 0;
    display: flex;
    flex-direction: row;

    @include tablet {
      width: 100%;
      flex-direction: column;
    }

    @include mobile {
      flex-direction: column;
      padding: 0 10px;
    }
  }
  &__block {
    &-info {
      background-color: $white;
      max-width: 334px;
      align-items: center;
      box-shadow: 0px 2px 4px rgba(90, 97, 105, 0.12);
      border-radius: 9px;
      margin-right: 28px;

      @include tablet {
        margin-right: 0;
        max-width: 100%;
      }

      @include mobile {
        max-width: 100%;
        margin-bottom: 15px;
        margin-right: 0;
      }

      &__load {
        display: flex;
        flex-direction: column;
        align-items: center;

        &-img {
          width: 243px;
          min-height: 110px;
          margin-top: 34px;
          margin-bottom: 10px;
          background: $grey;

          img {
            object-fit: contain;
          }
        }
        &-name {
          font-weight: 400;
          font-size: 24.5px;
          line-height: 28px;
          text-align: center;
          letter-spacing: -0.6125px;
          color: $very-dark-blue;
          margin-bottom: 4.5px;
        }
        &-descr {
          font-weight: 400;
          font-size: 12.5px;
          line-height: 14px;
          text-align: center;
          letter-spacing: -0.3125px;
          color: $dark-grayish-blue-2;
          margin-bottom: 10.5px;
        }
        &-upload {
          margin-bottom: 22px;
        }
      }

      &__filled {
        margin-top: 14px;
        padding: 14px 22px;
        box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.12), 0px 1px 0px rgba(0, 0, 0, 0.12);

        &-about {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;

          & span {
            font-family: 'Helvetica';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 15px;
            letter-spacing: -0.408571px;
            color: $dark-grayish-blue-3;
          }
        }
        &-progress {
          width: 100%;
          height: 5px;
          background: #e1e4e8;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 16px;

          & span {
          display: block;
          height: 100%;
          border-radius: 3px;
          background: #007bff;
          background-size: 300% 100%;}
        }
      }

      &__text {
        padding: 22.5px 27px 45px 21px;

        @include mobile {
          padding: 10px 27px 10px 21px;
        }
        & h4 {
          font-weight: 500;
          font-size: 13px;
          line-height: 15px;
          letter-spacing: -0.408571px;
          color: $dark-grayish-blue-3;
          margin-bottom: 13px;
        }

        & textarea {
          font-weight: 400;
          font-size: 13.5px;
          line-height: 20px;
          letter-spacing: -0.408571px;
          color: $very-dark-grayish-blue;
          margin: 0;
          padding: 5px;
          resize: none;

          @include mobile {
            width: 100%;
          }
        }
      }
    }
    &-set {
      background-color: $white;
      align-items: center;
      box-shadow: 0px 2px 4px rgba(90, 97, 105, 0.12);
      border-radius: 9px;
      padding: 0 18px;
      width: 100%;
      height: 100% ;

      & h3 {
        font-weight: 500;
        font-size: 17.5px;
        line-height: 21px;
        letter-spacing: -0.4375px;
        color: $very-dark-blue;
        margin: 19.5px 0;
      }

      &__auto {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 31px;
        grid-row-gap: 21px;
        margin-bottom: 14px;

        @include mobile {
          grid-template-columns: 1fr;
        }

        &-model {
          display: flex;
          flex-direction: column;
          width: 100%;

          &__input {
            display: flex;
            flex-direction: row;

            & input {
              width: 100%;

            }
            & button {
              width: 30px;
              height: 30px;
              margin-left: 8px;
              border: 1px solid $grayish-blue;
              border-radius: 4px;
              background-color: $white;
              align-items: center;
              color: $grayish-blue;
            }
          }

          & label {
            font-family: 'Helvetica';
            font-style: normal;
            font-weight: 400;
            font-size: 10.5px;
            line-height: 12px;
            letter-spacing: -0.18421px;
            color: $main-black;
            margin-bottom: 4.5px;
          }

          & input {
            border: 1px solid $grayish-blue;
            border-radius: 4px;
            height: 30px;
            font-family: 'Helvetica';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            letter-spacing: -0.192982px;
            color: $main-black;
            padding-left: 10px;
          }
        }
      }

      &__colors {
        display: flex;
        flex-direction: column;
        width: 100%;

        & ul {
          list-style-type: none;

          padding: 0;

          & li {
            align-items: center;
            display: flex;
            flex-direction: row;
            margin-bottom: 8px;

            & span {
              font-weight: 400;
              font-size: 10px;
              line-height: 12px;
              display: flex;
              align-items: center;
              letter-spacing: -0.175439px;
              color: $dark-grey;
            }
          }

          & input {
            width: 13px;
            height: 13px;
            margin-right: 8px;
          }
        }

      }

      &__buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 18px 0;

        @include mobile {
          flex-direction: column;
          justify-content: flex-start;
        }

        & button {
          padding: 10px 30px;
        }

        &-choise {
          display: flex;
          flex-direction: row;
          margin-bottom: 10px;

          @include mobile {
            flex-direction: column;
            width: 118px;
          }

          &-save {
            margin-right: 12.5px;
            @include mobile {
              margin-right: 0;
              margin-bottom: 10px;
            }
          }

          &-cancel {
            background: $light-grayish-blue-3;
            border: none;
            color: $very-dark-desaturated-blue;

            &:hover {
              color: $white;
            }
          }
        }

        &-delete {
          background: $moderate-red;
          border: none;
          color: $white;
          width: 118px;
        }
      }
    }
  }
}

/* Input file*/
.file_upload{
  & button:not(:disabled) {
    border-left: 1px solid $grayish-blue
  }
  position: relative;
  overflow: hidden;
  height: 29px;
  width: 231px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: -0.175439px;
  color: $dark-grey;
  display: flex;
  justify-content: space-between;
}
.file_upload > div, .file_upload > button{
  float: left;
  height: 100%;
  margin: 0
}
.file_upload > div{
  margin-top: 8px;
  margin-left: 13px;
  line-height: inherit;
}
.file_upload > button{
  width: 65px;
}
@media only screen and ( max-width: 500px ){
  .file_upload > div{
    display: none
  }
  .file_upload > button{
    width: 100%
  }
}
.file_upload input[type=file]{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(20);
  opacity: 0;
  cursor: pointer;
}
.file_upload{
  border: 1px solid $grayish-blue;
  border-radius: 4px;
}
.file_upload > button{
  background: $light-grayish-blue-3;
  color: $dark-grey;
  overflow: hidden;
  border: none;
}

.car__block-info__text textarea {
  @include tablet {
    width: 100%;
  }
}

</style>
