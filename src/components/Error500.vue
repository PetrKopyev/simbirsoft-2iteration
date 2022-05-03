<template>
  <div class="error">
    <div class="error__text">
      <h1>500</h1>
      <h2>Что то пошло не так</h2>
      <h4>Попробуйте перезагрузить страницу</h4>
      <button class="auth__links-btn">
        Назад
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
};
</script>

<style lang="scss">
.error {
  height: 100%;

  @include mobile {
    height: 100%;
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    & h1 {
      font-weight: 500;
      font-size: 75px;
      line-height: 88px;
      letter-spacing: -5.76923px;
      color: $light-grayish-blue-4;
      margin-bottom: 13px;
    }

    & h2 {
      font-family: 'Helvetica';
      font-style: normal;
      font-weight: 400;
      font-size: 50px;
      line-height: 57px;
      letter-spacing: -2.5px;
      color: $very-dark-desaturated-blue;
      margin-bottom: 15px;
    }

    & h4 {
      font-family: 'Helvetica';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: -0.5px;
      color: $dark-grayish-blue-2;
      margin-bottom: 35px;
    }
  }
}

</style>
