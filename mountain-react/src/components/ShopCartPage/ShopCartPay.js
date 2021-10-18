import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //a標籤要變成link
import { withRouter } from 'react-router-dom'; //可以獲取history,location,match,來使用
import $ from 'jquery';
import '../../styles/ShopCartPage/ShopCartPage.css'; //shopping-cart style
import { useAuth } from '../../context/auth'; // 取得會員資料
import { zipGroupURL, zipCodeURL } from '../../utils/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//====== below icon star ======//
import { BsCheck } from 'react-icons/bs';
//====== below icon end ======//

//====== below img import start ======//

//====== above img import end ======//

function ShopCartPay(props) {
  // 1. 首先，建立好 html 在 return(<>...</>)。
  // 2. 設定狀態，關於共用會員資料使用useAuth()，關於地址資料放在靜態檔案中則使用useState()。
  const { member, pay, setPay } = useAuth(); // 取得會員資料
  const [zipGroup, setZipGroup] = useState(null);
  // zipGroup是一個物件，key為city(是字串)，value為一陣列(陣列中由多個小物件組成)。
  const [zipCode, setZipCode] = useState(null);
  const [cities, setCities] = useState([]); // 各縣市陣列
  const [districts, setDistricts] = useState([]); //各行政區陣列
  console.log(pay);
  // 3.
  const [cartData, setCartData] = useState({
    ship: 1,
    pay_way: null,
    zip_code: null,
    addr: '',
    invoice: null,
    name: '',
    phone: '',
  });
  useEffect(() => {
    if (pay !== null) {
      // console.log('hellooooo');
      setCartData({
        ...cartData,
        addr: pay.addr,
        invoice: pay.invoice,
        name: pay.name,
        pay_way: pay.pay_way,
        phone: pay.phone,
        ship: 1,
        zip_code: pay.zip_code,
      });
    }
  }, [pay]);

  // 5. 填入原始member資料後，當Html input欄位有輸入變動時，onChange呼叫handleChange函式，將react的變數tempMember，轉換成html上偵測的變數與其值([e.target.name]: e.target.value)，其中[e.target.name]為key。
  function handleChange(e) {
    setCartData({ ...cartData, [e.target.name]: e.target.value });
  }

  // 6. 從靜態檔案抓資料，取得 group.json 與 code.json 地址相關資料。
  useEffect(() => {
    async function getZipGroup() {
      try {
        const zipGroupRes = await axios.get(zipGroupURL);
        let data = zipGroupRes.data;
        // 6.1 設定 setZipGroup 狀態，取得 group.json 所有資料。
        setZipGroup(data);
        // 6.2 設定 setCities 狀態，取得物件的key值，處理成各縣市的陣列。
        setCities(Object.keys(data));
      } catch (e) {
        console.log(e);
      }
    }
    getZipGroup();

    async function getZipCode() {
      try {
        const zipCodeRes = await axios.get(zipCodeURL);
        let data2 = zipCodeRes.data;
        // 6.3 設定 setZipCode 狀態，取得 code.json 所有資料。
        setZipCode(data2);
      } catch (e) {
        console.log(e);
      }
    }
    getZipCode();
  }, []);

  useEffect(() => {
    if (cartData && zipCode && zipGroup && cities.length > 0) {
      // 表示上述資料都已經有了！
      if (cartData.zip_code) {
        // 表示這個使用者的 zip code 已經設定過了
        // 城市的選單已經透過 value 的綁定處理好
        // 這時候要處理的是 districts
        setDistricts(zipGroup[zipCode[cartData.zip_code].city]);
      } else {
        // tempMember 沒有 zip_code
        // 想幫 tempMember 設定一個預設值
        // 第 0 個城市的第 0 個行政區
        // cities : ["台北市", "基隆市"]
        // cities[0] 台北市
        // zipGroup["台北市"][0] => {}
        setCartData({
          ...cartData,
          zip_code: zipGroup[cities[0]][0].zip_code,
        });
      }
    }
  }, [cartData, zipCode, zipGroup, cities]);

  // 自動填入會員收件地址 start //
  function checkAutoInputAddr(e) {
    // if (member.addr === null) {
    //   e.target.disabled = true;
    // }
    if (e.target.checked) {
      setCartData({
        ...cartData,
        zip_code: member.zip_code,
        addr: member.addr,
      });
      const updatedFieldErrors = {
        ...fieldErrors,
        addr: '',
      };
      setFieldErrors(updatedFieldErrors);
    } else {
      // 取消勾選的時候，不用特別處理錯誤訊息，只要處理有填寫但有錯誤訊息的情況。
      setCartData({
        ...cartData,
        zip_code: zipGroup[cities[0]][0].zip_code,
        addr: '',
      });
    }
  }
  // 自動填入會員收件地址 end //

  // 7. 當html select選單有onChange時，呼叫changeCity函式，此時選擇到的是唯一的值(e.target.value)，利用setCity來將原始狀態的null，改變成select到的value。
  function changeCity(e) {
    // 7.2 當city有選擇時，就會自動列出該縣市的所有行政區，此時的districts也是一陣列，可利用剛剛選擇到的city作為key值，在group.json裡面找到該city的districts，並且設定到option中讓使用者選擇行政區。
    setDistricts(zipGroup[e.target.value]);

    // 預選好這組行政區中的第一個
    setCartData({
      ...cartData,
      zip_code: zipGroup[e.target.value][0].zip_code,
    });
  }

  // 8. 當實際選擇了一個行政區後，會改變此行政區狀態。不過因為郵遞區號=縣市+行政區，成為連動關係，所以一但選擇了行政區，就等於知道了郵遞區號，於是改變member資料庫之前，先將該tempMember.zip_code用setTempMember改變狀態。
  function changeDistrict(e) {
    setCartData({ ...cartData, [e.target.name]: e.target.value });
  }

  // 自動填入會員姓名及電話 start //
  function checkAutoNamePhone(e) {
    // if (member.phone === null) {
    //   e.target.disabled = true;
    // }
    if (e.target.checked) {
      setCartData({ ...cartData, name: member.name, phone: member.phone });
      const updatedFieldErrors = {
        ...fieldErrors,
        name: '',
        phone: '',
      };
      setFieldErrors(updatedFieldErrors);
    } else {
      setCartData({ ...cartData, name: '', phone: '' });
    }
  }
  // 自動填入會員收件地址 end //

  // 處理發票類型 start //
  function invoiceChange(e) {
    console.log(e.target.value);
    setCartData({ ...cartData, invoice: e.target.value });
  }
  // 處理發票類型 end //

  // 處理付款方式 start //
  function payWayChange(e) {
    console.log(e.target.value);
    setCartData({ ...cartData, pay_way: e.target.value });
  }
  // 處理付款方式 end //

  /* 處理 local storage 是否為空  start */
  function getCartFromLocalStorage() {
    const ProductOrder =
      JSON.parse(localStorage.getItem('ProductOrderDetail')) || '[]';
    console.log('檢查購物車', ProductOrder);
    if (ProductOrder === '[]') {
      console.log('購物車是空的喔！');
      Swal.fire({
        icon: 'warning',
        title: '您的購物車目前是空的喲！',
        showConfirmButton: false,
        timer: 1500,
      });
      props.history.goBack();
    }
  }
  //一進畫面先讀取local storage
  useEffect(() => {
    getCartFromLocalStorage();
    // console.log('cartLocal', cartLocal);
  }, []);

  /* 處理 local storage 是否為空  end */

  /* 送出資料到下一步 start */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hello');
    setPay({ ...cartData });
    props.history.replace('/shoppingcart/step3-check');
  };
  /* 送出資料到下一步 end */

  /* 處理錯誤訊息 start */
  // 存入錯誤訊息用
  const [fieldErrors, setFieldErrors] = useState({
    addr: '',
    name: '',
    phone: '',
    invoice: '',
    pay_way: '',
  });

  // useEffect(() => {}, []);
  // 當表單有不合法的檢查出現時
  const handleFormInvalid = (e) => {
    // 擋住錯誤訊息的預設呈現的方式(popup)
    e.preventDefault();

    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    };

    // 3. 設定回原狀態物件
    setFieldErrors(updatedFieldErrors);
  };

  //  整個表單有變動時(ex.其中一個欄位有輸入時)
  // 認定使用者正在改正某個有錯誤的欄位
  // 清除某個欄位錯誤訊
  const handleFormChange = (e) => {
    console.log('目前更新欄位 ', e.target.name);
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: '',
    };

    // 3. 設定回原狀態物件
    setFieldErrors(updatedFieldErrors);
  };
  /* 處理錯誤訊息 end */

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
            className="shopcart-step-2"
            id="shopcart-checkout-progress"
            data-current-step="2"
          >
            <div className="shopcart-progress-bar1">
              {/* <!-- "active" change to "valid" --> */}
              <div className="shopcart-step shopcart-step-1 shopcart-valid">
                <span className="shopcart-step-num"> 1</span>
                {/* <!-- "opaque" change to "" --> */}
                {/* <!-- <div class="fa fa-check opaque"></div> --> */}
                <BsCheck className="shopcart-fa shopcart-fa-check" />
                {/* <div className="shopcart-fa shopcart-fa-check"></div> */}
                <div className="shopcart-step-label">確認購物車</div>
              </div>
              {/* <!-- add class "active" --> */}
              <div className="shopcart-step shopcart-step-2 shopcart-active">
                <span className="shopcart-step-num"> 2</span>
                <BsCheck className="shopcart-fa shopcart-fa-check shopcart-opaque" />
                {/* <div className="shopcart-fa shopcart-fa-check shopcart-opaque"></div> */}
                <div className="shopcart-step-label">付款與運送方式</div>
              </div>
              <div className="shopcart-step shopcart-step-3">
                <span className="shopcart-step-num"> 3</span>
                <BsCheck className="shopcart-fa shopcart-fa-check shopcart-opaque" />
                {/* <div className="shopcart-fa shopcart-fa-check shopcart-opaque"></div> */}
                <div className="shopcart-step-label">資料確認</div>
              </div>
              <div className="shopcart-step shopcart-step-4">
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
          <div className="col-12 mt-3">
            <h3 className="text-center mt-4 shopcart-title-dash">
              付款與運送方式
            </h3>
            <form
              onInvalid={handleFormInvalid}
              onSubmit={handleSubmit}
              onChange={handleFormChange}
            >
              <fieldset className="form-group row mt-4">
                <legend className="col-form-label col-sm-2 float-sm-left pt-0 mb-4">
                  收件方式：
                </legend>
                <div className="col-sm-10 mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="ship"
                      id="shipHome"
                      value={cartData && cartData.ship}
                      checked
                    />
                    <label className="form-check-label" for="shipHome">
                      宅配到府
                    </label>
                  </div>
                  <div className="form-check">
                    {/* <input
                      className="form-check-input"
                      type="radio"
                      name="ship"
                      id="shipStore"
                      value="2"
                    />
                    <label className="form-check-label" for="shipStore">
                      超商取貨
                    </label> */}

                    {/* <!-- Button trigger modal --> */}
                    {/* <button
                      type="button"
                      className="btn btn-primary ml-3"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      選擇門市
                    </button> */}
                    {/* <!-- Modal --> */}
                    {/* <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              付款運送方式
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body"></div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              取消
                            </button>
                            <button type="button" className="btn btn-primary">
                              確定
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <legend className="col-form-label col-sm-2 float-sm-left pt-0 mb-4">
                  請填寫收件地址：
                </legend>
                <div className="col-sm-10 mb-4">
                  {member &&
                  member.zip_code !== null &&
                  member.addr !== null ? (
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="autoInputAddr"
                        name="autoInputAddr"
                        value="autoComplete"
                        onChange={checkAutoInputAddr}
                      />
                      <label className="form-check-label" for="autoInputAddr">
                        自動填入會員聯絡地址
                      </label>
                    </div>
                  ) : (
                    <label
                      className="form-check-label"
                      for="autoInputAddr"
                    ></label>
                  )}

                  {/* 選擇地址 start */}
                  <div className="form-group">
                    {/* 請選擇縣市 */}
                    <select
                      className="form-control"
                      name="city"
                      id="city"
                      value={
                        cartData &&
                        zipCode &&
                        cartData.zip_code &&
                        zipCode[cartData.zip_code].city
                      }
                      onChange={changeCity}
                    >
                      {cities &&
                        cities.map((city, i) => (
                          <option key={i} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                    {/* 請選擇行政區 */}
                    <select
                      className="form-control"
                      value={cartData && cartData.zip_code}
                      id="zip_code"
                      onChange={changeDistrict}
                      name="zip_code"
                    >
                      {cities &&
                        districts &&
                        districts.map((item, i) => (
                          <option key={i} value={item.zip_code}>
                            {item.district}
                          </option>
                        ))}
                    </select>
                    {/* 輸入路名 */}
                    <input
                      type="text"
                      className="form-control"
                      id="addr"
                      placeholder="請輸入路名"
                      name="addr"
                      value={cartData && cartData.addr}
                      onChange={handleChange}
                      required
                    />
                    {cartData.addr !== '' ? (
                      <small className="shopcart_pay_error"></small>
                    ) : (
                      <small className="shopcart_pay_error">
                        {fieldErrors.addr}
                      </small>
                    )}
                  </div>
                  {/* 選擇地址 end */}
                </div>

                <legend className="col-form-label col-sm-2 float-sm-left pt-0 mb-4">
                  請填寫收件人資訊：
                </legend>
                <div className="col-sm-10 mb-4">
                  {member &&
                  member.zip_code !== null &&
                  member.addr !== null ? (
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="autoInputNamePhone"
                        name="autoInputNamePhone"
                        value="autoCompleteNamePhone"
                        onChange={checkAutoNamePhone}
                        // checked
                      />
                      <label
                        className="form-check-label"
                        for="autoInputNamePhone"
                      >
                        自動填入會員姓名及電話
                      </label>
                    </div>
                  ) : (
                    <label
                      className="form-check-label"
                      for="autoInputNamePhone"
                    ></label>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={cartData && cartData.name}
                      placeholder="請輸入收件人姓名"
                      onChange={handleChange}
                      required
                    />
                    {cartData.name !== '' ? (
                      <small className="shopcart_pay_error"></small>
                    ) : (
                      <small className="shopcart_pay_error">
                        {fieldErrors.name}
                      </small>
                    )}
                    <input
                      type="text"
                      className="form-control mt-3"
                      id="phone"
                      name="phone"
                      value={cartData && cartData.phone}
                      placeholder="請輸入聯絡電話"
                      onChange={handleChange}
                      required
                    />
                    {cartData.phone !== '' ? (
                      <small className="shopcart_pay_error"></small>
                    ) : (
                      <small className="shopcart_pay_error">
                        {fieldErrors.phone}
                      </small>
                    )}
                  </div>
                </div>

                <legend className="col-form-label col-sm-2 float-sm-left pt-0 mb-4">
                  請選擇發票類型：
                </legend>
                <div className="col-sm-10 mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="invoice"
                      id="duplicateForm"
                      value="1"
                      onChange={invoiceChange}
                      checked={cartData && cartData.invoice == 1}
                      required
                    />
                    <label className="form-check-label" for="duplicateForm">
                      二聯式發票
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="invoice"
                      id="VATNumber"
                      value="2"
                      onChange={invoiceChange}
                      checked={cartData && cartData.invoice == 2}
                    />
                    <label className="form-check-label" for="VATNumber">
                      三聯式發票
                    </label>
                  </div>
                  {fieldErrors.invoice !== '' && (
                    <small className="shopcart_pay_error">
                      {fieldErrors.invoice}
                    </small>
                  )}
                </div>

                <legend className="col-form-label col-sm-2 float-sm-left pt-0 mb-4">
                  請選擇付款方式：
                </legend>
                <div className="col-sm-10 mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="pay_way"
                      id="creditCard"
                      value="1"
                      onChange={payWayChange}
                      checked={cartData && cartData.pay_way == 1}
                      required
                    />
                    <label className="form-check-label" for="creditCard">
                      信用卡付款
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="pay_way"
                      id="homePay"
                      value="2"
                      onChange={payWayChange}
                      checked={cartData && cartData.pay_way == 2}
                    />
                    <label className="form-check-label" for="homePay">
                      貨到付款
                    </label>
                  </div>
                  {fieldErrors.pay_way !== '' && (
                    <small className="shopcart_pay_error">
                      {fieldErrors.pay_way}
                    </small>
                  )}
                </div>
              </fieldset>
              <div className="shopcart-button-container text-right mb-5">
                <Link
                  to="/shoppingcart/step1-detail"
                  className="shopcart-btn btn-prev btn btn-outline-primary mr-3"
                >
                  上一步
                </Link>
                <button
                  // to="/shoppingcart/step3-check"
                  className="shopcart-btn btn-next btn btn-primary mr-3"
                  // onClick={() => {
                  //   console.log('hello');
                  //   setPay({ ...cartData });
                  // }}
                >
                  下一步
                </button>
              </div>
            </form>

            {/* <!-- button --> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(ShopCartPay);
