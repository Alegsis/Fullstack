describe('Blogilista app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Aleksi Virtanen',
      username: 'aleksvir',
      password: 'salainen'
    }
    const user2 = {
      name: 'Pena malli',
      username: 'penamal',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('aleksvir')
      cy.get('#password').type('salainen')
      cy.contains('Login').click()
      cy.contains('Logout').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrongUser')
      cy.get('#password').type('salainen')
      cy.contains('Login').click()
      cy.contains('Given username or password are wrong')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('aleksvir')
      cy.get('#password').type('salainen')
      cy.contains('Login').click()
    })
    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('testtitle1')
      cy.get('#author').type('testauthor1')
      cy.get('#url').type('testurl1.com')
      cy.get('#create-button').click()
      cy.contains('testtitle1')
      cy.contains('testauthor1')

    })
  })
  describe('When logged in and blog created', function () {
    beforeEach(function () {
      cy.get('#username').type('aleksvir')
      cy.get('#password').type('salainen')
      cy.contains('Login').click()
      cy.contains('New blog').click()
      cy.get('#title').type('testtitle1')
      cy.get('#author').type('testauthor1')
      cy.get('#url').type('testurl1.com')
      cy.get('#create-button').click()
    })
    it('The blog can be liked', function () {
      cy.contains('View').click()
      cy.contains('Like').click()
    })
    it('The blog can be deleted', function () {
      cy.contains('View').click()
      cy.contains('Remove').click()
    })
    it('The blogs are sorted by likes', function () {
      cy.contains('testtitle1').as('blog1')
      cy.get('#create-blog').click()
      cy.get('#title').type('testtitle2')
      cy.get('#author').type('testauthor2')
      cy.get('#url').type('testurl2.com')
      cy.get('#create-button').click()
      cy.contains('testtitle2').as('blog2')
      cy.wait(2000)
      cy.get('@blog1').contains('View').click()
      cy.get('@blog1').contains('Like').as('like1').click().wait(500).click()
      cy.get('@blog2').contains('View').click()
      cy.get('@blog2').contains('Like').as('like2').click().wait(500).click().wait(500).click().wait(500).click()
      cy.get(".blog").eq(0).should("contain", "testtitle2");
    })
  })
  describe('When another account logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('aleksvir')
      cy.get('#password').type('salainen')
      cy.contains('Login').click()
      cy.contains('New blog').click()
      cy.get('#title').type('testtitle1')
      cy.get('#author').type('testauthor1')
      cy.get('#url').type('testurl1.com')
      cy.get('#create-button').click()
      cy.contains('Logout').click()
      cy.visit('http://localhost:3000')
    })
    it('another user dont see remove', function () {
      cy.get('#username').type('penamal')
      cy.get('#password').type('salainen')
      cy.contains('Login').click()
      cy.contains('View').click()
      cy.should('not.contain', 'Remove')
    })
  })
})
