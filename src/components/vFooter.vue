<template>
  <div class="footer">
    <div class="footer__links">
      <a
        href="#"
        class="footer__link"
      >
        Главная страница
      </a>
      <a
        href="#"
        class="footer__link"
      >
        Ссылка
      </a>
    </div>
    <div class="footer__copyright">
      Copyright © 2020 Simbirsoft
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss">
.footer {
  background-color: $white;
  height: 68.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 27px;

  @include mobile {
    flex-direction: column;
    justify-content: center;
  }

  @include mobile {
    min-height: 50px;
  }

  &__links {
    display: flex;
    @include mobile {
      margin-bottom: 10px;
    }
  }

  &__link {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: $pure-blue;
    text-decoration: none;
    margin-right: 16px;
  }

  &__copyright {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    color: $dark-grayish-blue-2;
  }
}
</style>
