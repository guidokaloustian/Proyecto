import CartsMongoManager from '../dao/MongoManagers/cartsMongoManager.js'
import '../dao/dbConfig.js'
import { expect } from 'chai'

describe('Testing MongoDB cartsd dao', function(){
    before(function(){
        this.cartsManager = new CartsMongoManager()
    })

    it('Must return all DB users', async function(){
        const result = await this.cartsManager.getAll()
        expect(Array.isArray(result)).to.be.equal(true)
    })
})