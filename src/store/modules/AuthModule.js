import axios from 'axios';
export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: '',
    role: '',
    partner: '',
    userid: '',
    email: ''
  },

  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, payload) {
      console.log(payload);
      state.status = "success";
      state.token = "";
      state.user = payload.firstname;
      state.role = payload.ROLE;
      state.partner = "";
      state.userid = payload.UserID;
      state.email = payload.email;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },

  actions: {
    login({ commit }, user) {
      const _username = 's2sAff001'
      const _password = 'XSxFE@AtQv#'
      var config = {
        auth: {
          username: _username,
          password: _password
        }
      };
      return new Promise((resolve, reject) => {
        commit('auth_request')
        //console.log(user);
        axios.post('http://161.49.63.45:9095/api/Affiliate/UserLogin', user, config)
          .then(resp => {

            if (resp.data.data[0].Message == "INVALID") {
              // alert("Invalid username/password")
              // return false
              reject("Invalid username/password");
            }
            // const token = resp.data.message
            // const user = resp.data.statusCode
            // const role = resp.data.urole
            console.log(resp.data);

            let response = resp.data.data[0];
            console.log(resp.data.data[0].UserID);
            console.log(response);

            localStorage.setItem('userid', resp.data.data[0].UserID);
            //localStorage.setItem('userName', resp.daota.data.adminLogin.name);
            //response.firstname = user.UserName;
            // axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', response)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit('logout')
          localStorage.removeItem('userid')
          // delete axios.defaults.headers.common['Authorization']
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  },

  getters: {
    isLoggedIn: state => !!state.token,
    token: state => state.token,
    authStatus: state => state.status,
    userRole: state => state.role,
  
    getUsername: state => {
      return state.email
    },
    //getPartner: state => {
    //  return state.partner
    //}
  },
};
