<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img
        class="sidebar__logo-img"
        src="@/assets/image/logo-icon.png"
        alt="icon"
      >
      <span class="sidebar__logo-text">Need for car</span>
    </div>
    <el-menu
      router
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="/car">
        <i>
          <app-svg icon-name="write">
            <icon-car />
          </app-svg>
        </i>
        <span>Карточка автомобиля</span>
      </el-menu-item>
      <el-menu-item index="/cars">
        <i>
          <app-svg icon-name="write">
            <icon-cars />
          </app-svg>
        </i>
        <span>Список авто</span>
      </el-menu-item>
      <el-menu-item index="/order-list">
        <i>
          <app-svg icon-name="write">
            <icon-order />
          </app-svg>
        </i>

        <span>Заказы</span>
      </el-menu-item>
      <el-menu-item index="/categories">
        <i class="el-icon-menu" />

        <span>Категории</span>
      </el-menu-item>
      <el-menu-item index="/cities">
        <i class="el-icon-office-building" />

        <span>Города</span>
      </el-menu-item>
      <el-menu-item index="/points">
        <i class="el-icon-position" />

        <span>Пункты выдачи</span>
      </el-menu-item>
      <el-menu-item index="/rates">
        <i class="el-icon-files" />

        <span>Тарифы</span>
      </el-menu-item>
      <el-menu-item index="/rate-types">
        <i class="el-icon-document-copy" />

        <span>Типы тарифов</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import AppSvg from '@/components/AppSvg.vue';
import IconCar from '@/components/icons/IconCar.vue';
import IconCars from '@/components/icons/IconCars.vue';
import IconOrder from '@/components/icons/IconOrder.vue';

export default {
  name: 'Sidebar',
  components: {
    AppSvg,
    IconCar,
    IconCars,
    IconOrder,
  },
};
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: $white;
  font-family: 'Helvetica', sans-serif;
  font-style: normal;
  width: 20%;
  height: 100vh;
  box-shadow: 0px 1px 75px rgba(90, 97, 105, 0.11),
  0px 2px 4px rgba(90, 97, 105, 0.12), 0px 7.5px 11px rgba(90, 97, 105, 0.1),
  0px 3.5px 17.5px rgba(165, 182, 201, 0.1);

  @include tablet {
    width: 10%;
    align-items: center;
  }

  @include mobile {
    height: 55px;
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: auto;
  }

  &__logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 67.5px;

    @include mobile {
      width: 10%;
      height: 0;
    }

    &-img {
      width: 21.5px;
      height: 21.5px;
      margin-right: 7px;
    }

    &-text {
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      display: flex;
      align-items: center;
      color: $very-dark-blue;
      @include tablet {
        display: none;
      }
    }
  }

}

.is-active {
  border-left: 4px solid $pure-blue;
  color: $pure-blue !important;
  background-color: $very-light-gray !important;

  @include mobile {
    border-left: none;
    border-top: 4px solid $pure-blue;
  }
}

.el-menu-item {
  box-shadow: inset 0px 1px 0px $light-grayish-blue;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.234375px;
  color: $very-dark-blue;
  display: flex;
  white-space: normal;
  align-items: center;

  &:first-child {
    @media screen and (max-width: 1089px) {
      line-height: 28px;
    }
  }

  &:last-child {
    box-shadow: inset 0px -1px 0px $light-grayish-blue, inset 0px 1px 0px $light-grayish-blue;;
  }
}

.el-menu-vertical-demo span {
  margin-left: 11px;

  @include tablet {
    display: none;
  }
}

.el-menu {
  border-right: none;
  @include tablet {
    width: 100%;
  }
  @include mobile {
    width: 90%;
    display: flex;
    justify-content: space-between;
  }

}

a {
  text-decoration: none !important;
}

.el-menu-item i {
  color: $light-grayish-blue-4;
}

.el-menu-item {
  @include tablet {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  @include mobile {
    width: 33%;
    display: flex;
    justify-content: center;
  }
}

.el-menu-item [class^=el-icon-] {
  width: 15px;
  font-size: 15px;
}

</style>
