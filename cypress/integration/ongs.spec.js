/// <reference types="cypress"/>

describe('Ongs', () => {
    it('devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');

        cy.get('[data-cy="name"]').type('SafePeople');
        cy.get('[data-cy="email"]').type('safepeople@mail.com');
        cy.get('[data-cy="whatsapp"]').type('84999999999');
        cy.get('[data-cy="city"]').type('Natal');
        cy.get('[data-cy="uf"]').type('RN');

        //Routing

        //Star server com cy.server()
        //cy.server(); isso foi para o before no arquivo index da pasta suport

        //criar uma rota com cy.route()
        //atribuir  rota a um alias
        cy.route('POST', '**/ongs', ).as('postOng');
        
        cy.get('[data-cy=submit]').click();

        //esperar com cy.wait() e fazer uma validação
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

    });
    
    it('devem poder realizar um login no sistema', () => {

        cy.visit('http://localhost:3000/');

        cy.get('input').type(Cypress.env('createdOngId'))

        cy.get('.button').click();
    });
});