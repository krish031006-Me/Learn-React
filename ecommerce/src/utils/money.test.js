/* This is the example of a unit test
    This is what code you run where you can test the single unit function or anything 
    We cannot test whole webpages with different components and all using unit test*/

// This is the module we will be using to conduct tests
/* it() is the function that let's us create tests 
    expect let's us create like a simple if-else if the value is this does it return this 
    It's a best practice to store all the test regarding a same function 
    All the tests that we group together are known as a test suite*/
import { it, expect, describe } from "vitest"; 
import { Money } from './money';

// This below is a test suite for Money function
describe('Money', () => {
    // Creating a test using it();
    it('formats 1999 as $19.99' , () => {
        expect(Money(1999)).toBe('$19.99');
    });

    it('displays two decimals', () => {
        expect(Money(1090)).toBe('$10.90');
        expect(Money(100)).toBe('$1.00');
    });
});