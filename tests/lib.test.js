 const lib = require('../lib')
 const exercise = require('../exercise1')
 const db = require('../db')
 const mail = require('../mail')

 describe('absolute', () => {
   it('should return a positive if input is positive', () => {
     const result = lib.absolute(1)
     expect(result).toBe(1)
   })

   it('should return a positive if input is negative', () => {
     const result = lib.absolute(-1)
     expect(result).toBe(1)
   })

   it('should return a positive if input is 0', () => {
     const result = lib.absolute(0)
     expect(result).toBe(0)
   })
 })

 describe('greet', () => {
   it('should return the greeting message', () => {
     const result = lib.greet('Mosh')
     //expect(result).toMatch(/Mosh/)
     expect(result).toContain('Mosh')
   })
 })

 describe('getCurrencies', () => {
   it('should return supported currencies', () => {
     const result = lib.getCurrencies()
     expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']))
   })
 })

 describe('getProduct', () => {
   it('should return the product with the given id', () => {
     const result = lib.getProduct(1)
     // to specific
     //  expect(result).toEqual({
     //    id: 1,
     //    price: 10
     //  })

     // general
     expect(result).toMatchObject({
       id: 1,
       price: 10
     })


     expect(result).toHaveProperty('id', 1)
   })
 })

 describe('registerUser', () => {
   it('should throw if username is falsy', () => {
     const args = [null, undefined, NaN, '', 0, false]
     args.forEach(a => {
       expect(() => {
         lib.registerUser(a)
       }).toThrow()
     })
   })

   it('should return a user object if valid username is passed', () => {
     const result = lib.registerUser('mosh')
     expect(result).toMatchObject({
       username: 'mosh'
     })
     expect(result.id).toBeGreaterThan(0)
   })
 })

 describe('fizzbuzz', () => {
   it('should throw error if input is not number', () => {
     expect(() => {
       exercise.fizzBuzz('a')
     }).toThrow(Error)
     expect(() => {
       exercise.fizzBuzz(undefined)
     }).toThrow(Error)
     expect(() => {
       exercise.fizzBuzz(null)
     }).toThrow(Error)
   })

   it('should return Fizzbuzz if input is divisible by 3 and 5', () => {
     const result = exercise.fizzBuzz(15)
     expect(result).toBe('FizzBuzz')
   })

   it('should return Fizz', () => {

     const result = exercise.fizzBuzz(3)
     expect(result).toBe('Fizz')
   })

   it('should return Buzz', () => {
     const result = exercise.fizzBuzz(5)
     expect(result).toBe('Buzz')
   })

   it('should return number', () => {
     const result = exercise.fizzBuzz(4);
     expect(result).toBe(4)
   })
 })

 describe('applyDiscount', () => {
   it('should apply 10% discount if customer has points more than 15', () => {
     db.getCustomerSync = function (customerId) {
       console.log('fake reading customers....');
       return {
         id: customerId,
         points: 20
       }
     }


     const order = {
       customerId: 1,
       totalPrice: 10
     }
     lib.applyDiscount(order)
     expect(order.totalPrice).toBe(9)
   })
 })

 describe('notifyCustomer', () => {
   // mock function
   db.getCustomerSync = jest.fn().mockReturnValue({
     email: 'a'
   })

   //  db.getCustomerSync = function (id) {
   //    console.log('Fake reading a customer...');
   //    return {
   //      email: 'a'
   //    };
   //  }

   let mailSent = false;

   // mock function
   mail.send = jest.fn()

   //  mail.send = function (email, subject) {
   //    mailSent = true
   //  }

   lib.notifyCustomer({
     customerId: 1
   })

   expect(mail.send).toHaveBeenCalled();
 })