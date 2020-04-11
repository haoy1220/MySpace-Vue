import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: localStorage.getItem('role') == null ? '' : localStorage.getItem('role'),
    token: localStorage.getItem('token') == null ? '' : localStorage.getItem('token'),
    email: localStorage.getItem('email') == null ? '' : localStorage.getItem('email'),
    nickname: localStorage.getItem('nickname') == null ? '' : localStorage.getItem('nickname'),
  }, mutations: {
    login(state, data) {
      //存储token
      this.state.token = data.token;
      localStorage.setItem('token', data.token);

      //存储邮箱
      this.state.email = data.user.email;
      localStorage.setItem('email', data.user.email);

      //存储昵称
      this.state.nickname = data.user.nickname;
      localStorage.setItem('nickname', data.user.nickname);

      //存储权限
      this.state.role = data.user.role;
      localStorage.setItem('role', data.user.role);
    },

    logout(state) {
      localStorage.removeItem('token');
      this.state.token = '';

      localStorage.removeItem('email');
      this.state.email = '';

      localStorage.removeItem('nickname');
      this.state.nickname = '';

      localStorage.removeItem('role');
      this.state.role = '';
    },

    refreshToken(state, token) {
      this.state.token = token;
      localStorage.setItem('token', token);
    },

    refreshNickname(state, nickname) {
      this.state.nickname = nickname;
      localStorage.setItem('nickname', nickname);
    },

  },
});
