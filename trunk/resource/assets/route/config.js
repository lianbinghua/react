function redirectToLogin(nextState, replace) {
  var isLogin = true;
  if (!isLogin) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
export default {
  path: '/',
  component: require('page/root/root'),
  indexRoute: { component: require('page/home/home')},
  childRoutes: [
    { path: '/home',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/home/home'))
        })
      }
    },
    { path: '/detail/:type/:key',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/goodsDetail/goodsDetail'))
        })
      }
    },
    { path: '/tutor',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/tutor/tutor'))
        })
      }
    },
    { path: '/order',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/order/order'))
        })
      }
    },
    { path: '/addressList',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/address/addressList'))
        })
      }
    },
    { path: '/addressEdit/:shipAddrID/:province/:provinceName/:city/:cityName/:district/:districtName/:area/:areaName',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/address/addressEdit'))
        })
      }
    },
    { path: '/orderDetail/:orderCode/:orderGeneration/:orderID',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/order/orderDetail'))
        })
      }
    },
    { path: '/logistics/:dcName/:orderGeneration/:orderID',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/order/logistics'))
        })
      }
    },
    { path: '/user',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/user/user'))
        })
      }
    },
    { path: '/login',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/login/login'))
        })
      }
    },
    { path: '/agreement',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/agreement/agreement'))
        })
      }
    },
    { path: '/myAccount',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/myAccount/myAccount'))
        })
      }
    },
    { path: '/updateName/:nickName',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/updateName/updateName'))
        })
      }
    },
    { path: '/mobileBind/:mobile',  
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/mobileBind/mobileBind'))
        })
      }
    },
    { onEnter: redirectToLogin,
      childRoutes: [
        { path: '/user/:id',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              //cb(null, require('page/components/User'))
            })
          }
        }
      ]
    },


  ]
}
