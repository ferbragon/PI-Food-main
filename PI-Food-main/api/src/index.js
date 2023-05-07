//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { server } = require('./app.js');
const { conn } = require('./db.js');
const PORT = 3001;

// Syncing all the models at once.
/*conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});*/
conn.sync({force: true})
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .then(() => {
    // Iniciar el servidor una vez que la conexión y la sincronización estén completas
    server.listen(PORT, () => {
      console.log(`Server rised in port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });
