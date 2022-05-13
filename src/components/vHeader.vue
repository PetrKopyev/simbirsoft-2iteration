<template>
  <div class="header">
    <div class="header__search">
      <img
        class="header__search-img"
        src="@/assets/image/search-header.png"
      >
      <input
        class="header__search-input"
        placeholder="Поиск ..."
      >
    </div>
    <div class="header__bell">
      <img
        class="header__bell-image"
        src="@/assets/image/bell.png"
        alt="bell"
      >
      <span class="header__bell-count">2</span>
    </div>
    <div class="header__admin">
      <el-dropdown>
        <img
          class="header__admin-avatar"
          src="@/assets/image/avatar.png"
          alt="avatar"
        >
        <span class="el-dropdown-link">
          Admin
        </span>
        <i class="el-icon-arrow-down el-icon--right" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Помощь</el-dropdown-item>
          <el-dropdown-item>Настройки</el-dropdown-item>
          <el-dropdown-item>Выйти</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss">
.header {
  box-shadow: 0px 2.5px 9.5px rgba(90, 97, 105, 0.12);
  background-color: $white;
  display: flex;
  align-items: center;
  width: 100%;

  &__search {
    height: 67.5px;
    padding: 16px 28px;
    width: 100%;

    @include mobile {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 5px;
      max-width: 100%;
      min-width: 180px;
    }

    &-img {
      width: 14px;
      height: 14px;
      margin-right: 9px;
    }
    &-input {
      font-weight: 400;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: -0.0928572px;
      color: $dark-grayish-blue;
      background-color: $white;
      border: none;
      outline: none;
      padding: 10px 50px 10px 0;
    }
  }

  &__bell {
    min-width: 69px;
    height: 100%;
    box-shadow: 0.5px 0px 0px #CACEDB, -0.5px 0px 0px #CACEDB;
    align-items: center;
    padding-top: 23.5px;
    padding-left: 26.5px;

    &-image {
      width: 17px;
      height: 21px;
      cursor: pointer;
    }

    &-count {
      margin: 0;
      position: relative;
      bottom: 9px;
      left: 12px;
      width: 14px;
      height: 14px;
      font-size: 9px;
      color: #fff;
      display: flex;
      justify-content: center;
      background-color: $strong-red;
      border-radius: 100%;
      cursor: pointer;
    }
  }

  &__admin {
    min-width: 217px;
    display: flex;
    align-items: center;
    @include mobile {
      min-width: 69px;
    }

    &-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      margin-right: 13px;
      margin-left: 25px;

      @include mobile {
        margin-left: 5px;
        margin-right: 0;
      }

    }
  }
}

.el-dropdown {
  @include mobile {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: $very-dark-grayish-blue;

  @include mobile {
    display: none;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
  margin-left: 50px;

  @include mobile {
    margin-left: 5px;
  }
}

</style>
