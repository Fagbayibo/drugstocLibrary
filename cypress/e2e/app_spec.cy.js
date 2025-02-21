describe('Book Library Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); 
  });

  it('should display the header and search bar', () => {
    cy.get('span').contains('DrugStoc Library').should('be.visible');
    cy.get('input[type="text"]').should('exist');
    cy.get('button').contains('Search').should('exist');
  });

  it('should allow searching for books', () => {
    cy.intercept('GET', '**/books/v1/volumes*').as('fetchBooks'); // Intercepting API call
    cy.get('input[type="text"]').type('JavaScript');
    cy.get('button').contains('Search').click();
    cy.wait('@fetchBooks');
    cy.get('.grid > div').should('have.length.greaterThan', 0);
  });

  it('should display book details when a book is clicked', () => {
    cy.get('.grid > div').should('exist').first().click();
    cy.get('.fixed').should('exist'); // Ensuring modal is opened
    cy.get('button').contains('Close').click();
    cy.get('.fixed').should('not.exist');
  });

  it('should allow changing categories', () => {
    cy.intercept('GET', '**/books/v1/volumes*').as('fetchBooks'); // Intercepting API
    cy.get('button').contains('Science').click();
    cy.wait('@fetchBooks');
    cy.get('.grid > div').should('have.length.greaterThan', 0);
  });

  it('should paginate results correctly', () => {
    cy.intercept('GET', '**/books/v1/volumes*').as('fetchBooks');
    cy.wait('@fetchBooks'); // Ensure books are loaded before paginating

    cy.get('.pagination', { timeout: 10000 }).should('exist'); // Ensuring pagination exists
    cy.get('.pagination button', { timeout: 10000 }).should('have.length.greaterThan', 1); // Ensuring multiple buttons exist

    // Wait for pagination buttons to be visible before clicking
    cy.get('.pagination button')
      .should('be.visible')
      .contains(/^2$/)
      .click();

    cy.wait('@fetchBooks');
    cy.get('.grid > div').should('have.length.greaterThan', 0);
  });

  it('should display the hamburger menu', () => {
    cy.get('svg').should('have.class', 'text-[#5AAEFF]');
  });
});
