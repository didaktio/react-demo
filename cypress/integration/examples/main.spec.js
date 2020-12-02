/// <reference types="cypress" />


context('Products Page', () => {

    describe('List', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('.product').first().scrollIntoView();
        });

        it('should display no more than five products on initial load', () => {
            cy.get('.Products').should('be.visible');
            cy.get('.product').filter(':visible').should('have.length.at.most', 5);
        });

        it('should load more products on scroll to bottom', () => {
            cy.get('.product').last().scrollIntoView({ duration: 500 });
            cy.get('.product').should('have.length.at.least', 10);
            cy.get('.product').last().scrollIntoView({ duration: 500 });
            cy.get('.product').should('have.length.at.least', 15);
        });
    });

    describe('Product', () => {
        let firstProduct;
        beforeEach(() => {
            firstProduct = cy.get('.product').first();
            firstProduct.scrollIntoView({ duration: 250 });
        });

        it('should contain a visible title', () => firstProduct.get('.product__title').should('be.visible'));
        it('should contain a visible price', () => firstProduct.get('.product__price').should('be.visible'));
        it('should contain a visible description', () => firstProduct.get('.product__description').should('be.visible'));
        it('should contain an image', () => cy.get('.product__image').should('be.visible'));
        it('should contain visible tags', () => firstProduct.get('.product__tags').should('be.visible'));
        it('should contain a visible variants toggle button', () => firstProduct.get('.product__variants-button').should('be.visible'));

        it('should show/hide variants when button is clicked', () => {
            firstProduct.get('product__variants').should('not.exist');
            firstProduct.get('.product__variants-button').first().click();
            firstProduct.get('.product__variants').should('be.visible');
            firstProduct.get('.product__variants-button').first().click();
            firstProduct.get('product__variants').should('not.exist');
        });


        // describe('Image', () => {
        //     it('should change on slide button click', () => {
        //         firstProduct.get('product__image').then($el => {
        //             const initialSrc = $el.get(0).src;
        //             firstProduct.get('product__image').get('.ImageSlider__arrow').last().click();
        //             firstProduct.get('product__image').then($el => {
        //                 const newSrc = $el.get(0).src;
        //                 expect(newSrc).to.equal(initialSrc);
        //             });
        //         })
        //     });
        // });
    });

});