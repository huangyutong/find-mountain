import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/productbag.css';
import ProductCard from './components/ProductCard';
//api s
import axios from 'axios';
import { shopURL } from '../../utils/config';
//api e

function ShopClothes(props) {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    //api
    async function getProductData() {
      try {
        const productData = await axios.get(`${shopURL}/clothes`);
        // console.log(productData.data); //for check
        setProductData(productData.data);
        // console.log('p2', productData);
      } catch (e) {
        console.log(e);
      }
    }
    getProductData();
  }, []);
  return (
    <>
      <main>
        <div className="container">
          {/* <!-- =========search bar start========= --> */}
          {/* <!-- =========search bar end========= --> */}
          {/* <!-- =========category bar start========= --> */}
          <div className="productbag-category-bar">
            <ul className="d-flex justify-content-center list-unstyled">
              <div className="row">
                <li className="col-3 px-0">
                  <Link to="/shop">商城首頁</Link>
                </li>
                <li className="col-3 px-0">
                  <Link to="/shop/bags">機能背包</Link>
                </li>
                <li className="col-3 px-0">
                  <Link to="/shop/shoes">登山鞋</Link>
                </li>
                <li className="col-3 px-0">
                  <Link to="/shop/clothes" className="productbag-active">
                    衣服
                  </Link>
                </li>
              </div>
            </ul>
          </div>
          {/* <!-- =========category bar end========= --> */}
          {/* <!-- =========product start========= --> */}
          <div>
            <div className="row productbag-product-list my-4">
              {productData.map((item, index) => {
                return (
                  <ProductCard
                    productId={item.id}
                    brand={item.product_brand}
                    name={item.product_name}
                    price={item.price}
                    type={item.type}
                    picture={item.pic}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
          {/* <!-- =========product end========= --> */}
        </div>
      </main>
    </>
  );
}

export default ShopClothes;
