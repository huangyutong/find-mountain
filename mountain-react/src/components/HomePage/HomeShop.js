import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2';
import '../../styles/HomePage/HomeShop.scss';
import { Link } from 'react-router-dom'; //a標籤要變成link

//Card
import Card from '../ShopPage/components/ProductCard';
import RankingItems from '../ShopPage/components/RankingItems';
import SelectedItems from '../ShopPage/components/SelectedItems';

//api start
import { productURL, IMAGE_URL } from '../../utils/config';
import axios from 'axios';
//api end

//images
import product from '../../img/contentShop/Mask Group.png';
import Blobs2 from '../../img/contentShop/Vector-1.png';
//icon
import { CartFill, HeartFill } from 'react-bootstrap-icons';
function HomeShop(props) {
  // let heartStyle = { color: '#eea9a9', fontSize: '20px', position: 'absolute' };
  const [homeproductData, setProductData] = useState(null);
  const { price, className, picture } = props;
  const [favoriteBtn, setFavoriteBtn] = useState(false);

  useEffect(() => {
    //api
    async function homeProductData() {
      try {
        // const homeproductData = await axios.get(`${productURL}/product`);
        const homeproductData = await axios.get(productURL);
        console.log(homeproductData.data); //for check
        setProductData(homeproductData.data);
      } catch (e) {
        console.log(e);
      }
    }
    homeProductData();
    //愛心icon
    $('.homepage-heart-icon-bkg').each(function () {
      $(this).on('click', () => {
        $(this).toggleClass('homepage-heart-icon-bkg-click');
      });
    });
    //cart-icon
    $('.homepage-cart-icon-bkg').on('click', () => {
      //display none -> block
      let cartDisplay = $('.cart-num').css('display');
      if (cartDisplay === 'none') {
        $('.cart-num').css('display', 'block');
      }
      // alert("已將商品加入購物車！");
      Swal.fire({
        icon: 'success',
        title: '已將商品加入購物車！',
        showConfirmButton: false,
        timer: 1500,
      });
      //cart-num ++
      let cartNum = parseInt($('.cart-num').text());
      //限制一次加進購物車數量
      if (cartNum >= 10) {
        Swal.fire({
          icon: 'error',
          title: '一次最多只能放入10樣商品喔',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        cartNum++;
        $('.cart-num').text(cartNum);
      }
    });
  }, []);

  return (
    <>
      {/* <!-- =========電商 star========= --> */}
      <div className="homepage-shop">
        <div className="container">
          <div className="homepage-blobs2 position-absolute">
            <img src={Blobs2} alt="" />
          </div>
          <div className="homepage-contentShop">
            <h2 className="text-center pb-5 pb-md-0">經典熱銷</h2>
            <RankingItems
              favoriteBtn={favoriteBtn}
              setFavoriteBtn={setFavoriteBtn}
            />

            <div className="homepage-contentShop">
              <h2 className="text-center pb-5 pb-md-0">編輯嚴選</h2>
              <SelectedItems
                favoriteBtn={favoriteBtn}
                setFavoriteBtn={setFavoriteBtn}
              />

              <div className="homepage-btnMore">
                <Link to="/shop" className="btn btn-primary homepage-more">
                  更多產品
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- =========電商 end========= --> */}
    </>
  );
}
export default HomeShop;
