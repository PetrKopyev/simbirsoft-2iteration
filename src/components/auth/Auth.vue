<template>
  <div class="auth">
    <div class="container">
      <div class="row">
        <div>
          <div class="auth__icon">
            <div class="auth__icon-wrap">
              <img
                class="auth__icon-img"
                src="@/assets/image/logo-icon.png"
                alt="icon"
              >
              <span class="auth__icon-logo">Need for drive</span>
            </div>
          </div>
          <div class="auth__block">
            <div class="auth__block-h">
              Вход
            </div>
            <b-form
              novalidate
              @submit="onSubmit"
            >
              <b-form-group
                id="input-group-1"
                label="Почта"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="admin@ss.com"
                  :class="{'is-invalid': $v.form.email.$error}"
                  @blur="$v.form.email.$touch()"
                />
                <div
                  v-if="!$v.form.email.required"
                  class="invalid-feedback auth__error"
                >
                  Поле обязательно для заполнения
                </div>
                <div
                  v-if="!$v.form.email.email"
                  class="invalid-feedback auth__error"
                >
                  Поле должно быть email адресом
                </div>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Пароль"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  placeholder="••••••••••••"
                  :class="{'is-invalid': $v.form.password.$error}"
                  @blur="$v.form.password.$touch()"
                />
                <div
                  v-if="!$v.form.password.required"
                  class="invalid-feedback auth__error"
                >
                  Поле обязательно для заполнения
                </div>
                <div
                  v-if="!$v.form.password.minLength"
                  class="invalid-feedback auth__error"
                >
                  Не меньше 6 символов
                </div>
              </b-form-group>

              <div class="auth__links">
                <a
                  class="auth__links-link"
                  href="#"
                >Запросить доступ</a>

                <button
                  class="auth__links-btn"
                  type="submit"
                  :disabled="disabledBtn"
                >
                  Войти
                </button>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    disabledBtn() {
      return this.$v.form.email.$invalid || this.$v.form.password.$invalid;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
};
</script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100vh;
  font-style: normal;
  font-weight: 400;
  background-color: #F5F6F8;
;

  &__block {
    background-color: $white;
    border-radius: 9px;
    padding: 18px;
    margin: 0 auto;
    max-width: 376px;
    box-shadow: 0px 1px 0px rgba(90, 97, 105, 0.11),
    0px 2px 4px rgba(90, 97, 105, 0.12),
    0px 5px 5px rgba(90, 97, 105, 0.06), 0px 3.5px 35px rgba(90, 97, 105, 0.1);

    &-h {
      font-style: normal;
      font-weight: 400;
      font-size: 17.5px;
      line-height: 20px;
      text-align: center;
      letter-spacing: -0.4375px;
      color: #3D5170;
      margin: 19px 0 35px 0;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 167px;

    &-wrap{
      margin: auto;
    }

    &-img {
      width: 44.5px;
      height: 44.5px;
      margin-right: 12px;
    }

    &-logo {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      color: $very-dark-blue;
    }
  }

  &__links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;

    &-link {
      color: $pure-blue;
      font-style: normal;
      font-weight: 400;
      font-size: 10.5px;
      line-height: 12px;
      letter-spacing: -0.18421px;
      text-decoration: none;
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
      text-align: center;
      letter-spacing: -0.0821429px;
      color: $white;
      padding: 10px 40px;
    }
  }

}
.d-block {
  font-style: normal;
  font-weight: 400;
  font-size: 10.5px;
  line-height: 12px;
  letter-spacing: -0.18421px;
  color: $dark-grey;
  margin-bottom: 9px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  font-style: normal;
  font-weight: 400;
  font-size: 11px !important;
  line-height: 13px;
  letter-spacing: -0.192982px;
  color: $very-dark-blue;
}

.auth__error {
  font-size: 10px !important;
}
</style>
