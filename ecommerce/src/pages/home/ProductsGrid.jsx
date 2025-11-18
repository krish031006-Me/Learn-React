import { ProductQuantity } from './ProductQuantity';

export function ProductsGrid({ products, loadCart }) {
    
    return (
        <div className="products-grid">
            {products.map((product) => {
                return(
                    <ProductQuantity key={product.id} product={product} loadCart={loadCart}/>
                );
            })}
        </div>
    );
}