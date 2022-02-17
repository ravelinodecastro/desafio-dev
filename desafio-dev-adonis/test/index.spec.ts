import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Transaction from 'App/Models/Transaction'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure home page works', async (assert) => {
    /**
     * Make request
     */
    const { text } = await supertest(BASE_URL).get('/').expect(200)

    /**
     * Construct JSDOM instance using the response HTML
     */
    const { document } = new JSDOM(text).window

    const lead = document.querySelector('.lead')
    assert.exists(lead)
  })
  test('ensure transaction amount its not null', async (assert) => {
    const transaction = new Transaction()
    transaction.amount = 10.00
    await transaction.save()

    assert.notEqual(transaction.amount, null)
  })
})