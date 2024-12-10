describe('Book Store API Tests', () => {
  const baseUrl = 'https://demoqa.com';
  let token;
  let userId;
  const testUser = {
    userName: 'testUser' + Math.random(),
    password: 'Test123!'
  };

  // Test 1: Create a new user
  it('Test 1: should create a new user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/Account/v1/User`,
      body: testUser,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('userID');
      expect(response.body).to.have.property('username', testUser.userName);
      userId = response.body.userID;
    });
  });

  // Test 2: Generate token
  it('Test 2: should generate token', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/Account/v1/GenerateToken`,
      body: testUser
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('result');
      token = response.body.token;
    });
  });

  // Test 3: Authorize user
  it('Test 3: should authorize user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/Account/v1/Authorized`,
      body: testUser
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  });

  // Test 4: Get user details
  it('Test 4: should get user details', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/Account/v1/User/${userId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('userId');
      expect(response.body).to.have.property('username', testUser.userName);
      expect(response.body).to.have.property('books');
    });
  });

  // Test 5: Delete user
  it('Test 5: should delete user', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/Account/v1/User/${userId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  // Test 6: Handle invalid login
  it('Test 6: should handle invalid login', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/Account/v1/Authorized`,
      body: {
        userName: 'invalidUser',
        password: 'invalidPass'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
}); 