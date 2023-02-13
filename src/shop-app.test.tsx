// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import { ShopApp } from './shop-app';


describe('ShopApp', () => {


    it('renders the header', () => {

        render(<ShopApp />);
        const header = screen.getAllByAltText('First Header');
        expect(header).toBeTruthy();
    });


    it('opens the add product modal on button click', async () => {

        const { getByText } = render(<ShopApp />);

        const button = getByText(/send product proposal/i);
        fireEvent.click(button);

        const modal = getByText(/add a product/i);

        expect(modal).toBeTruthy();
    });

    it('submits a product', async () => {

        render(<ShopApp />);

        const button = screen.getByText(/send product proposal/i);
        fireEvent.click(button);

        let titleInput = screen.getByPlaceholderText(/Title.../i)
        fireEvent.change(titleInput, { target: { value: 'New' } })

        let priceInput = screen.getByPlaceholderText(/Price.../i)
        fireEvent.change(priceInput, { target: { value: '123' } })


        let descInput = screen.getByPlaceholderText(/Start typing product description here.../i)
        fireEvent.change(descInput, { target: { value: '123' } })

        const submitButton = screen.getByText(/add a product/i);
        fireEvent.click(submitButton);
        const message = screen.getByText(/Adding product.../i);

        expect(message).toBeTruthy();
    });

});