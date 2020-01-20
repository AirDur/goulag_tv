const gateway = require('fast-gateway');
const CONFIG = require('./config');
const PORT = process.env.PORT || 8080;

gateway({
  middlewares: [
    require('cors')(),
    require('helmet')()
  ],

  //https://gist.github.com/pantharshit00/444626d3f627e1cfcc1691d90c5bcc67

  routes: [{
    prefix: '/utilisateur',
    target: CONFIG.IP_UTILISATEUR //TODO
  }, {
    prefix: '/playlist',
    target: CONFIG.IP_PLAYLIST,
    middlewares: [
      //require('express-jwt')({
       // secret: 'shhhhhhared-secret'
      //})
    ]
  }, {
    prefix: '/historique',
    target: CONFIG.IP_HISTORIQUE,
    middlewares: [
      require('express-jwt')({
        secret: 'shhhhhhared-secret'
      })
    ]
  }, {
    prefix: '/recherche',
    target: CONFIG.IP_RECHERCHE,
    middlewares: [
      // require('express-jwt')({
      //   secret: 'shhhhhhared-secret'
      // })
    ]
  }]
}).start(PORT).then(server => {
  console.log(`API Gateway listening on ${PORT} port!`)
});