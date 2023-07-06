import CartsMongoManager from '../dao/mongoManagers/cartsMongoManager.jss'
import '../dao/dbConfig.js'
import assert from 'assert'

describe('Testing MongoDB cartsd dao', function(){
    before(function(){
        this.cartsManager = new CartsMongoManager()
    })

    it('Must return all DB users', async function(){
        const result = await this.cartsManager.getAll()
        console.log(this.cartsManager.getAll());
        assert.notEqual(Array.isArray(result), false)
    })
})