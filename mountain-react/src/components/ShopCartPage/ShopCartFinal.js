import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //a標籤要變成link
import { withRouter } from 'react-router-dom'; //可以獲取history,location,match,來使用
import $ from 'jquery';
import '../../styles/ShopCartPage/ShopCartPage.css'; //shopping-cart style

import { shopcartURL, IMAGE_URL, shopURL } from '../../utils/config';
import axios from 'axios';

//====== below icon star ======//
import { BsCheck } from 'react-icons/bs';
//====== below icon end ======//

//====== below img import start ======//
import ShopCartImg from '../../img/shoes-pic7.jpeg';
//====== above img import end ======//

function ShopCartFinish() {
  //historyItems為瀏覽紀錄local storage接完資料庫的整體一筆一筆的資料
  const [historyItems, setHistoryItems] = useState([]);
  const [randomProduct, setRandomProduct] = useState([]);

  // 隨機打亂陣列函式
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  //更多推薦 api
  useEffect(() => {
    //FIXME:應該要在隨機排序商品資料中，刪除購物車中有的品項 (little bug)
    async function getAllRandomProductData() {
      try {
        const allProductData = await axios.get(`${shopURL}/`);
        const RandomProductData = shuffle(allProductData.data).slice(0, 5);
        // console.log('RandomProductData', RandomProductData);
        setRandomProduct(RandomProductData);
      } catch (e) {
        console.log(e);
      }
    }
    getAllRandomProductData();
  }, []);

  useEffect(() => {
    async function getViewedData() {
      try {
        //抓瀏覽紀錄資料
        var ProductViewHistory = JSON.parse(
          localStorage.getItem('ProductViewHistory')
        );
        if (ProductViewHistory !== null && ProductViewHistory.length > 0) {
          var historyArray = [];
          for (let i = 0; i < ProductViewHistory.length; i++) {
            // console.log('ProductViewHistory[i]', ProductViewHistory[i]);
            const productHistoryData = await axios.get(
              `${shopURL}/product-detail/${ProductViewHistory[i]}`
            );
            // console.log(productHistoryData.data[0]);
            historyArray.unshift(productHistoryData.data[0]);
          }
          // console.log('historyArray', historyArray);
          setHistoryItems(historyArray);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getViewedData();
  }, []);

  useEffect(() => {
    // progress-bar
    $('.shopcart-btn-next').on('click', function () {
      var currentStepNum = $('#shopcart-checkout-progress').data(
        'current-step'
      );
      var nextStepNum = currentStepNum + 1;
      var currentStep = $('.shopcart-step.step-' + currentStepNum);
      var nextStep = $('.step.step-' + nextStepNum);
      var progressBar = $('#shopcart-checkout-progress');
      $('.shopcart-btn-prev').removeClass('shopcart-disabled');
      if (currentStepNum == 5) {
        return false;
      }
      if (nextStepNum == 5) {
        $(this).addClass('shopcart-disabled');
      }
      $('.shopcart-checkout-progress')
        .removeClass('.step-' + currentStepNum)
        .addClass('.step-' + (currentStepNum + 1));

      currentStep.removeClass('shopcart-active').addClass('shopcart-valid');
      currentStep.find('span').addClass('shopcart-opaque');
      currentStep
        .find('.shopcart-fa.shopcart-fa-check')
        .removeClass('shopcart-opaque');

      nextStep.addClass('shopcart-active');
      progressBar
        .removeAttr('className')
        .addClass('step-' + nextStepNum)
        .data('current-step', nextStepNum);
    });

    $('.shopcart-btn-prev').on('click', function () {
      var currentStepNum = $('#shopcart-checkout-progress').data(
        'current-step'
      );
      var prevStepNum = currentStepNum - 1;
      var currentStep = $('.step.step-' + currentStepNum);
      var prevStep = $('.step.step-' + prevStepNum);
      var progressBar = $('#shopcart-checkout-progress');
      $('.shopcart-btn-next').removeClass('shopcart-disabled');
      if (currentStepNum == 1) {
        return false;
      }
      if (prevStepNum == 1) {
        $(this).addClass('shopcart-disabled');
      }
      $('.shopcart-checkout-progress')
        .removeClass('.step-' + currentStepNum)
        .addClass('.step-' + prevStepNum);

      currentStep.removeClass('shopcart-active');
      prevStep.find('span').removeClass('shopcart-opaque');
      prevStep
        .find('.shopcart-fa.shopcart-fa-check')
        .addClass('shopcart-opaque');

      prevStep.addClass('shopcart-active').removeClass('shopcart-valid');
      progressBar
        .removeAttr('className')
        .addClass('step-' + prevStepNum)
        .data('current-step', prevStepNum);
    });
  }, []);
  return (
    <>
      <div className="container">
        <div className="shopcart-progress-adj">
          {/* <!-- progress-bar-step start --> */}
          {/* <!-- class change to current "step-2" --> */}
          <div
            className="shopcart-step-4"
            id="shopcart-checkout-progress"
            data-current-step="4"
          >
            <div className="shopcart-progress-bar1">
              {/* <!-- "active" change to "valid" --> */}
              <div className="shopcart-step shopcart-step-1 shopcart-valid">
                <span className="shopcart-step-num"> 1</span>
                {/* <!-- "opaque" change to "" --> */}
                <BsCheck className="shopcart-fa shopcart-fa-check" />
                {/* <div className="shopcart-fa shopcart-fa-check"></div> */}
                <div className="shopcart-step-label">確認購物車</div>
              </div>
              {/* <!-- add class "active" --> */}
              <div className="shopcart-step shopcart-step-2 shopcart-valid">
                <span className="shopcart-step-num"> 2</span>
                <BsCheck className="shopcart-fa shopcart-fa-check" />
                {/* <div className="shopcart-fa shopcart-fa-check"></div> */}
                <div className="shopcart-step-label">付款與運送方式</div>
              </div>
              <div className="shopcart-step shopcart-step-3 shopcart-valid">
                <span className="shopcart-step-num"> 3</span>
                <BsCheck className="shopcart-fa shopcart-fa-check" />
                {/* <div className="shopcart-fa shopcart-fa-check"></div> */}
                <div className="shopcart-step-label">資料確認</div>
              </div>
              <div className="shopcart-step shopcart-step-4 shopcart-active">
                <span className="shopcart-step-num"> 4</span>
                <BsCheck className="shopcart-fa shopcart-fa-check shopcart-opaque" />
                {/* <div className="shopcart-fa shopcart-fa-check shopcart-opaque"></div> */}
                <div className="shopcart-step-label">完成訂單</div>
              </div>
            </div>
          </div>
          {/* <!-- progress-bar-step end --> */}
        </div>

        <div className="row">
          <div className="col-12 mt-4">
            <h3 className="text-center mt-4 shopcart-title-dash">
              結帳完成，訂單處理中。
            </h3>
            <div>
              {/* FIXME:樣式設計再改一下 */}
              <h5>更多推薦</h5>
              <hr />
              <div className="row">
                {randomProduct.map((randomItems, index) => {
                  return (
                    <Link
                      to={`/shop/product-detail/${randomItems.id}`}
                      key={`${randomItems.id}`}
                    >
                      <figure className="shopcart-more-product-img-box ml-5">
                        <img
                          src={`${IMAGE_URL}/img/product-img/${randomItems.pic}`}
                          alt={randomItems.name}
                          title={randomItems.name}
                          className="shopcart-cover-fit"
                        />
                      </figure>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <h5 className="mt-5">瀏覽紀錄</h5>
              <hr />
              {historyItems === [] || historyItems.length === 0 ? (
                <div className="d-flex shopcart-no-historyproduct text-center justify-content-center align-items-center my-3">
                  <p className="p-0">尚未有瀏覽紀錄</p>
                </div>
              ) : (
                <div className="row">
                  {historyItems.slice(0, 7).map((hisItems, hisIndex) => {
                    return (
                      <Link
                        to={`/shop/product-detail/${hisItems.id}`}
                        key={`${hisItems.id}00`}
                      >
                        <figure className="shopcart-more-product-img-box ml-5 mb-5">
                          <img
                            src={`${IMAGE_URL}/img/product-img/${hisItems.pic}`}
                            alt={hisItems.name}
                            title={hisItems.name}
                            className="shopcart-cover-fit"
                          />
                        </figure>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            {/* <!-- button --> */}
            <div className="shopcart-button-container text-right mb-5">
              {/* <Link
                to="/shoppingcart/credit-card-pay"
                className="shopcart-btn btn-prev btn btn-outline-primary mr-3"
              >
                上一步
              </Link> */}
              <Link
                to="/member/order"
                className="shopcart-btn btn-next btn btn-primary mr-3"
              >
                查看我的訂單
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(ShopCartFinish);
