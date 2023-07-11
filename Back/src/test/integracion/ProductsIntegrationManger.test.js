import supertest from "supertest";
import { expect } from "chai";

const request = supertest('http://localhost:8080')

const productMock1 = {
    title: 'Hornalla',
    description: 'Hornalla de acero inoxidable',
    category: 'Parrillas',
    price: '10000',
    thumbnails: 'image.jpd',
    code: '505',
    stock: '10',
    status: true
}

describe('Tests for products endpoint', function() {
    it('Test GET method for /api/products', async function () {
        const response = await request.get('/api/products/').send(productMock1)
        expect(response._body).to.have.property('message')
    })
    it('Test GET method for api/products/getAll', async function() {
        const response = await request.get('/api/products/getAll')
        expect(response._body).to.have.property('payload')
        expect(response._body.payload).to.be.an('array')
        expect(response._body.payload).to.not.have.lengthOf(0)

    })
})