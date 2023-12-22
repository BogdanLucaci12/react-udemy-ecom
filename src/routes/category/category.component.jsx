import './category.styles.scss';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { Fragment } from 'react';
const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])
    console.log(products)
    return (
        <Fragment>
        <h1 className='category-title'>{category.toUpperCase()}</h1>
        <div className='category-container'>
          
            {products &&
                products.map((product) => {
                return <ProductCard key={product.id} product={product}/>
                })
            }
        </div>

        </Fragment>
    )
}
export default Category;