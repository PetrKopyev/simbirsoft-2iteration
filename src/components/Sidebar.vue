<template>
  <el-row class="sidebar">
    <el-col>
      <div class="sidebar__logo">
        <img
          class="sidebar__logo-img"
          src="@/assets/image/logo-icon.png"
          alt="icon"
        >
        <span class="sidebar__logo-text">Need for drive</span>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="1">
          <i class="el-icon-location" />
          <span>Карточка автомобиля</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu" />
          <span>Список авто</span>
        </el-menu-item>
        <el-menu-item
          index="3"
          active
        >
          <i class="el-icon-setting" />
          <span>Заказы</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
.sidebar {
  font-family: 'Helvetica', sans-serif;
  font-style: normal;
  max-width: 285px;
  height: 100vh;
  box-shadow: 0px 1px 75px rgba(90, 97, 105, 0.11),
  0px 2px 4px rgba(90, 97, 105, 0.12), 0px 7.5px 11px rgba(90, 97, 105, 0.1),
  0px 3.5px 17.5px rgba(165, 182, 201, 0.1);

  &__logo {
    display: flex;
    align-items: center;
    width: 100%;
    box-shadow: inset 0px -1px 0px #E1E5EB;

    &-img {
      width: 21.5px;
      height: 21.5px;
      margin: 23px 7px 23px 49px;
    }

    &-text {
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      display: flex;
      align-items: center;
      color: $very-dark-blue;
    }
  }

}

.is-active {
  border-left: 4px solid $pure-blue;
  color: $pure-blue !important;
  background-color: #FBFBFB !important;
}

.el-menu-item {
  box-shadow: inset 0px -1px 0px #E1E5EB;
}
</style>

<!--<div class="sidebar">-->
<!--<div class="sidebar__logo">-->
<!--  <img-->
<!--    class="sidebar__logo-img"-->
<!--    src="@/assets/image/logo-icon.png"-->
<!--    alt="icon"-->
<!--  >-->
<!--  <span class="sidebar__logo-text">Need for drive</span>-->
<!--</div>-->
<!--<div-->
<!--  v-for="(item, index) in nav"-->
<!--  :key="index"-->
<!--  class="sidebar__navigation"-->
<!--  :class="active"-->
<!--&gt;-->
<!--  <div class="sidebar__navigation-img">-->
<!--    <img-->
<!--      :src="require('@/assets/image/' + item.img)"-->
<!--    >-->
<!--  </div>-->
<!--  <span class="sidebar__navigation-txt">{{ item.translate }}</span>-->
<!--</div>-->
<!--</div>-->
