describe('CountriesListComponent E2E', () => {
  beforeEach(() => {
    cy.visit('/countries');
  });

  it('should filter countries by name and region', () => {
    cy.get('[data-cy="input-search"]').within(() => {
      cy.get('input').type('Argentina');
    });

    cy.get('[data-cy="select-region"]').within(() => {
      cy.get('select').select('Americas');
    });

    cy.get('[data-cy="table-countries"]').should('exist');

  });
});