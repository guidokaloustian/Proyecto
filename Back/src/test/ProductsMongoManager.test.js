import ProductsMongoManager from '../dao/mongoManagers/productsMongoManager.js'
import '../dao/dbConfig.js'
import { expect } from 'chai'

describe('Testing MongoDB products dao', function(){
    before(function(){
        this.productsManager = new ProductsMongoManager()
    })

    it('Must return all DB products', async function(){
        const result = await this.productsManager.getAll()
        expect(Array.isArray(result)).to.be.equal(true)
    })

    
})