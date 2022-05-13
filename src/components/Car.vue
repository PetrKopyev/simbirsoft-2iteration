<template>
  <section class="car">
    <h1 class="title">
      Карточка автомобиля
    </h1>
    <div class="car__blocks">
      <section class="car__block-info">
        <div class="car__block-info__load">
          <img
            class="car__block-info__load-img"
            src="@/assets/image/car.png"
            alt="car"
          >
          <h2 class="car__block-info__load-name">
            Hyndai, i30 N
          </h2>
          <span class="car__block-info__load-descr">Компакт-кар</span>
          <div class="car__block-info__load-upload file_upload">
            <div>Выберите файл...</div>
            <button>Обзор</button>
            <input type="file">
          </div>
        </div>
        <div class="car__block-info__filled">
          <div class="car__block-info__filled-about">
            <span>Заполнено</span>
            <span style="color: #5A6169">74%</span>
          </div>
          <div class="car__block-info__filled-progress">
            <span style="width: 74%" />
          </div>
        </div>
        <hr>
        <div class="car__block-info__text">
          <h4>Описание</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi
            soluta qui quae quod dolorum sint alias, possimus illum assumenda eligendi cumque?
          </p>
        </div>
      </section>
      <div class="car__block-set">
        <h3>Настройки автомобиля</h3>
        <form class="car__block-set__auto">
          <div class="car__block-set__auto-model">
            <label for="modelCar">Модель автомобиля</label>
            <input
              id="modelCar"
              type="text"
              placeholder="Введите модель автомобиля"
            >
          </div>
          <div class="car__block-set__auto-model">
            <label for="typeCar">Тип автомобиля</label>
            <input
              id="typeCar"
              type="text"
              placeholder="Введите тип автомобиля"
            >
          </div>
          <div class="car__block-set__auto-model">
            <label for="colorsForPick">Доступные цвета</label>
            <div class="car__block-set__auto-model__input">
              <input
                id="colorsForPick"
                v-model="newColor"
                type="text"
                placeholder="Введите цвет"
              >
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
              <input type="checkbox">
              <span>{{ color }}</span>
            </li>
          </ul>
        </div>
        <div class="car__block-set__buttons">
          <div class="car__block-set__buttons-choise">
            <button class="car__block-set__buttons-choise-save auth__links-btn">
              Сохранить
            </button>
            <button class="car__block-set__buttons-choise-cancel auth__links-btn">
              Отменить
            </button>
          </div>
          <button class="car__block-set__buttons-delete auth__links-btn">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Car',
  data() {
    return {
      newColor: '',
      colors: ['Красный', 'Белый', 'Черный'],

    };
  },
  methods: {
    addColor() {
      if (this.newColor) {
        this.colors.push(this.newColor);
        this.newColor = '';
      }
    },
  },
};
</script>

<style lang="scss">

.car {
  @media screen and (min-width: 767px){
    height: 100%;
  }
  @include mobile {
    margin-bottom: 15px;
  }
  &__blocks {
    padding: 0 32px;
    display: flex;
    flex-direction: row;

    @include mobile {
      flex-direction: column;
      min-height: 100%;
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
          height: 110px;
          margin-top: 34px;
          margin-bottom: 10px;
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

        & p {
          font-weight: 400;
          font-size: 13.5px;
          line-height: 20px;
          letter-spacing: -0.408571px;
          color: $very-dark-grayish-blue;
          margin: 0;
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
        height: 100% ;

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

          &-save {
            margin-right: 12.5px;
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

</style>
