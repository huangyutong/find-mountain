import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; //a標籤要變成link .
import $ from 'jquery';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick.min.js';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
// import 'slick-carousel';
import '../../styles/product.css';
// import component
import RankingItems from './components/RankingItems';
import SelectedItems from './components/SelectedItems';
import RankingArticles from './components/RankingArticles';
//slick輪播圖
import display1 from '../../img/display-photo1new.jpg';
import display2 from '../../img/display-photo2.jpeg';
import display3 from '../../img/display-photo3.jpeg';
import display4 from '../../img/product-img/illustration/shopmain-display2.svg';

function ShopMain(props) {
  const [favoriteBtn, setFavoriteBtn] = useState(false);
  // console.log('favoriteBtn', favoriteBtn);
  useEffect(() => {
    //slick
    $('.shopmain-display-photo-box').slick({
      dots: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 3500,
    });
  }, []);
  return (
    <>
      <main>
        <div className="container">
          {/* <!-- =========search bar start========= --> */}
          {/* <!-- =========search bar end========= --> */}
          {/* <!-- =========category bar start========= --> */}
          <div className="shopmain-category-bar">
            <ul className="d-flex justify-content-center list-unstyled">
              <div className="row">
                <li className="col-3 px-0">
                  <Link className="shopmain-active" to="/shop">
                    商城首頁
                  </Link>
                </li>
                <li className="col-3 px-0">
                  <Link to="/shop/bags">機能背包</Link>
                </li>
                <li className="col-3 px-0">
                  <Link to="/shop/shoes">登山鞋</Link>
                </li>
                <li className="col-3 px-0">
                  <Link to="/shop/clothes">衣服</Link>
                </li>
              </div>
            </ul>
          </div>
          {/* <!-- =========category bar end========= --> */}
          {/* <!-- =========vegas start========= --> */}
          <div className="shopmain-display-photo-box position-relative row">
            <div className="shopmain-slick-photo-box">
              <img
                src={display1}
                alt=""
                title=""
                className="shopmain-cover-fit"
              />
            </div>
            <div className="shopmain-slick-photo-box">
              <img
                src={display2}
                alt=""
                title=""
                className="shopmain-cover-fit"
              />
            </div>
            <div className="shopmain-slick-photo-box position-relative">
              <img
                src={display4}
                alt=""
                title=""
                className="shopmain-cover-fit"
              />
              <a
                href="https://www.freepik.com/vectors/hand-drawn"
                className="position-absolute text-white shopmain-slick-photo-attribute"
              >
                Hand drawn vector created by freepik - www.freepik.com
              </a>
            </div>
          </div>
          {/* <!-- =========vegas end========= --> */}
          {/* <!-- =========編輯嚴選 start========= --> */}
          <div>
            <div className="position-relative shopmain-title-box">
              <h3 className="shopmain-selected-title text-center">編輯嚴選</h3>
              <div className="shopmain-title-underline position-absolute"></div>
            </div>
            <SelectedItems
              favoriteBtn={favoriteBtn}
              setFavoriteBtn={setFavoriteBtn}
            />
          </div>
          {/* <!-- =========編輯嚴選 end========= --> */}
          {/* <!-- =========熱銷不敗(本月暢銷排行) start========= --> */}
          <div>
            <div className="position-relative shopmain-title-box">
              <h3 className="shopmain-selected-title text-center">
                熱銷不敗(本月暢銷排行)
              </h3>
              <div className="shopmain-title-underline position-absolute"></div>
            </div>
            <RankingItems
              favoriteBtn={favoriteBtn}
              setFavoriteBtn={setFavoriteBtn}
            />
          </div>
          {/* <!-- =========熱銷不敗(本月暢銷排行) end========= --> */}
          {/* <!-- =========熱門登山攻略 start========= --> */}
          <RankingArticles />
          {/* <!-- =========熱門登山攻略 end========= --> */}
        </div>
      </main>
    </>
  );
}

export default ShopMain;
