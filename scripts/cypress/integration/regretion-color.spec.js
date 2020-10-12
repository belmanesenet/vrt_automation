describe('VRT Color Pallete', () => {

    before( () => {
        cy.visit('https://belmanesenet.github.io/vrt_app/');
        cy.get('#clean').click();
    });

    it('Change colors 1', ()=> {
        cy.get('#new').click();
        cy.get('#colors-viewer').screenshot(`${Cypress.env('IMAGE_1')}`);
    });

    it('Change colors 2', ()=> {
        cy.get('#new').click();
        cy.get('#colors-viewer').screenshot(`${Cypress.env('IMAGE_2')}`);
    })
})