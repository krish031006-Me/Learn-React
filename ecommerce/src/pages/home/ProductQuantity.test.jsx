import { it, describe, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react"; // We are importing scrren to see the fake webpage during testing
import { ProductQuantity } from "./ProductQuantity";

/* In this file we will be running an integration test
    Integration tests are used to test whole components working together 
    unlike unit tests that are just for one function 
    While testing a component in an integration test we render the component 
    In our tests we should not contact our real backend instead we should add a bit of fakeness
    let's say we can use a fake product data as a prop instead of the real one if the component needs it
    we can create a fake function instead of passing the real function from our backend. This is known as creating a Mock*/

// Creating a test suite 
describe('ProductQuantity component', () => {

    // This is a sample product to render ProductQuantity
    const product = {
        "keywords": [
            "sports",
            "basketballs"
        ],
        "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        "image": "images/products/intermediate-composite-basketball.jpg",
        "name": "Intermediate Size Basketball",
        "rating": {
            "stars": 4,
            "count": 127
        },
        "priceCents": 2095,
        "createdAt": "2025-11-14T08:47:14.930Z",
        "updatedAt": "2025-11-14T08:47:14.930Z"
    };

    // We are here creating a fake function to replace the loadCart function using vi we imported above
    const loadCart = vi.fn();

    // The test we need to do
    it('displays the product details correctly', () => {

        // We are here rendering the ProductQuantity component in a fake webpage
        render(<ProductQuantity product={product} loadCart={loadCart} />)
        // we use the screen function to get the element using text
        expect(
            screen.getByText('Intermediate Size Basketball')
        ).toBeInTheDocument(); // This method in the last checks if the element returned by screen is present in the document or not
        // another test to check if the price for the product mentioned is correct or not
        expect(
            screen.getByText('$20.95')
        ).toBeInTheDocument();
        // get the image element for testing
        expect(
            screen.getByTestId('product-image') // will return an image element
        // The method below is used to check if some attribute of an element matches the value that we provide
        ).toHaveAttribute("src", "images/products/intermediate-composite-basketball.jpg"); 
        // THis is the test to check if the rating image added is correct
        expect(
            screen.getByTestId("rating-image") // will return the rating image
        ).toHaveAttribute("src", "images/ratings/rating-40.png")
        // to check the number of reviews for the product
        expect(
            screen.getByText("127")
        ).toBeInTheDocument();
    });
});