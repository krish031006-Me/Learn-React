import { it, describe, vi, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react"; // We are importing scrren to see the fake webpage during testing
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import axios from "axios"; // The fake axios

vi.mock("axios"); // Here we need to mock the implementation of axios and make it do whatever we want

describe('HomePage component', () => {

    // Mocking the loadcart
    let loadCart;
    beforeEach(() => {
        loadCart = vi.fn();

        // Mocking the implementation of axios
        axios.get.mockImplementation(async (urlPath) => {
            if(urlPath === "/api/products"){
                return {
                    data: [{
                    "keywords": [
                        "socks",
                        "sports",
                        "apparel"
                    ],
                    "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
                    "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    "rating": {
                        "stars": 4.5,
                        "count": 87
                    },
                    "priceCents": 1090,
                    "createdAt": "2025-11-14T08:47:14.929Z",
                    "updatedAt": "2025-11-14T08:47:14.929Z"
                },
                    {
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
                    }]
                };
            }
        })
    })

    it('displays the products correctly', async ()=> {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart}/> 
            </MemoryRouter>
        );

        /* Getting all the products with a specific Id
            we could also use GetAllByTestId but we are using findAllByTestId to make it find them after the page is reloaded*/
        const productContainers = await screen.findAllByTestId("product-container"); 
        // Checking if there are two product containers
        expect(productContainers.length).toBe(2);

        // Checking if the name of the first product is displayed correctly or not by only checking inside of the product-container not whole page
        expect(
            within(productContainers[0]) // within keyword is used to check smth inside a element 
                .getByText("Black and Gray Athletic Cotton Socks - 6 Pairs") 
        ).toBeInTheDocument();

        // checking for the second product
        expect(
            within(productContainers[1])
                .getByText("Intermediate Size Basketball")
        ).toBeInTheDocument();
    });
})