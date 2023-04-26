import config from '../../config.js'
import CartsMongoManager from './mongoManagers/cartsMongoManager.js'
import ProductsMongoManager from './mongoManagers/productsMongoManager.js'
import UsersMongoManager from './mongoManagers/usersMongoManager.js'

let usersManager
let productManager
let cartsManager
console.log(config.persistencia);
switch (config.persistencia) {
    case 'MONGO':
        await import('../dbConfig.js')
        usersManager = new UsersMongoManager()
        break;

    case 'FILE':

        break;
}

export default usersManager