import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //a標籤要變成link
import $ from 'jquery';

import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../../context/auth'; // 取得setCartChange狀態

//====== below modal start ======//
import Swal from 'sweetalert2';
//====== below modal end ======//

//====== below icon start ======//
import { HeartFill, CartFill } from 'react-bootstrap-icons';
//====== below icon end ======//

//====== below api connect tool start ======//
import { IMAGE_URL, shopURL } from '../../../utils/config';
import axios from 'axios';
//====== below api connect tool end ======//

function ProductRec_H(props) {
  const { productId, price, picture, name, brand, type } = props;
  const { setCartChange, member, auth } = useAuth(); // 取得購物車數字狀態

  //=== 彈跳視窗所需 useState start ===//
  const [cartNum, setCartNum] = useState(1);
  const [cartSize, setCartSize] = useState('');
  const [cartPrice, setCartPrice] = useState(0);
  //cartLocal為購物車的local storage
  const [cardCartLocal, setCardCartLocal] = useState([]);
  //=== 彈跳視窗所需 useState end ===//

  const [favoriteBtn, setFavoriteBtn] = useState([]); //愛心重置開關
  //愛心顏色狀態 true為紅色 false為白色
  const [heart, setHeart] = useState(false);

  //=== 彈跳視窗開關 start ===//
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //=== 彈跳視窗開關 end ===//

  //====== clone product 彈跳視窗所需function start ======//
  //取得local storage轉為陣列的資料 ProductOrder
  function getCartFromLocalStorage() {
    const ProductOrder =
      JSON.parse(localStorage.getItem('ProductOrderDetail')) || '[]';
    // console.log(ProductOrder);
    setCardCartLocal(ProductOrder);
  }

  const addCart = () => {
    const newProductOrder = JSON.parse(
      localStorage.getItem('ProductOrderDetail') || '[]'
    );
    if (cartSize === '') {
      console.log('choose size plz');
      Swal.fire({
        icon: 'error',
        title: '請先選擇尺寸',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      //為了符合local storage格式 字串 字串 數字
      let orderDetail = {
        id: productId.toString(),
        size: cartSize,
        num: parseInt(cartNum),
      };
      //localstorage for order detail start//
      //確認local storage裡面有無相同id size的資料
      const index = newProductOrder.findIndex(
        (v) => v.id === orderDetail.id && v.size === orderDetail.size
      );
      console.log('index', index);
      console.log('orderDetail', orderDetail);
      console.log('newProductOrder', newProductOrder);
      if (index > -1) {
        //改變同款項訂購數量
        newProductOrder[index].num += orderDetail.num;
        localStorage.setItem(
          'ProductOrderDetail',
          JSON.stringify(newProductOrder)
        );
        console.log('這個商品已經加過了');
        // return;
      } else {
        newProductOrder.push(orderDetail);
        localStorage.setItem(
          'ProductOrderDetail',
          JSON.stringify(newProductOrder)
        );
        console.log('哎呦還沒喔');
      }
      //更新localstorage資料cartLocal
      // getCartFromLocalStorage();
      setCardCartLocal(newProductOrder);
      //localstorage for order detail end//
    }
    Swal.fire({
      icon: 'success',
      title: '已加入購物車',
      showConfirmButton: false,
      timer: 1500,
    });
    setCartChange(true);
    // setTimeout(() => {
    //   window.location.reload(false);
    // }, 1500);
    handleClose();
  };
  //一進畫面先讀取local storage
  useEffect(() => {
    getCartFromLocalStorage();
  }, []);
  // 計算總價
  useEffect(() => {
    setCartNum(1);
    setCartSize('');
    setCartPrice(0);
  }, [show]);
  useEffect(() => {
    setCartPrice(cartNum * price);
    // console.log(cartPrice);
  }, [cartNum, cartPrice, price]);
  //====== clone product 彈跳視窗所需function end ======//

  const heartIcon = (e) => {
    // $(e.currentTarget).toggleClass('mountain_heart-icon-bkg-click');

    // console.log(e.currentTarget);
    // $(e.currentTarget).toggleClass('shopmain-heart-icon-bkg-click');
    if (auth === false) {
      Swal.fire({
        icon: 'error',
        title: '需要先登入才能加入收藏',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (member !== null) {
      // console.log('productId, memberId', productId, member.id);
      if (heart === true) {
        //取消收藏 productId 為 number
        // console.log('收藏中');
        removeWishList();
      } else {
        //加入收藏
        // console.log('沒收藏');
        addWishList();
      }
    }
  };

  //remove wish
  const removeWishList = async () => {
    try {
      let id = productId;
      // console.log('remove product id, member id', id, member.id);
      await axios.post(`${shopURL}/remove-wish`, {
        member,
        id,
      });
      setHeart(false);
      if (favoriteBtn === false) {
        setFavoriteBtn(true);
      } else {
        setFavoriteBtn(false);
      }
    } catch (e) {
      console.log(e);
    }
    Swal.fire({
      icon: 'error',
      title: '已移除收藏商品',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //add wish
  const addWishList = async () => {
    try {
      let id = productId;
      // console.log('add product id, member id', id, member.id);
      await axios.post(`${shopURL}/add-wish`, {
        member,
        id,
      });
      setHeart(true);
      if (favoriteBtn === false) {
        setFavoriteBtn(true);
      } else {
        setFavoriteBtn(false);
      }
    } catch (e) {
      console.log(e);
    }
    Swal.fire({
      icon: 'success',
      title: '已加入收藏',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //get Wish List
  useEffect(() => {
    async function getWishListData() {
      try {
        if (auth === false) {
          // console.log('尚未登入');
          $('.mountain_heart-icon-bkg').removeClass(
            'mountain_heart-icon-bkg-click'
          );
          return;
        }
        // console.log('登入囉');
        const wishListData = await axios.post(`${shopURL}/wish-list`, {
          member,
        });
        // console.log('wishListData', wishListData.data);
        const wishIndex = wishListData.data.findIndex(
          (v) => v.product_id === parseInt(productId)
        );
        if (wishIndex > -1) {
          // console.log('有收藏喔');
          setHeart(true);
        } else {
          // console.log('還沒收藏喔');
          setHeart(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getWishListData();
  }, [auth, member, productId, favoriteBtn]);

  return (
    <>
      <div className="px-0">
        <div className="mountain_product-card">
          <div className="mountain_product-img-box position-relative">
            {/* 產品照點擊可到商品詳細頁 */}
            <Link to={`/shop/product-detail/${productId}`} id={productId}>
              <img
                className="mountain_cover-fit"
                src={`${IMAGE_URL}/img/product-img/${picture}`}
                alt=""
              />
            </Link>
            {/* 將產品加到收藏裡 */}
            {heart ? (
              <button
                className="position-absolute mountain_heart-icon-bkg position-relative mountain_heart-icon-bkg-click"
                onClick={heartIcon}
              >
                <HeartFill className="position-absolute shopmain-heart-icon" />
              </button>
            ) : (
              <button
                className="position-absolute mountain_heart-icon-bkg position-relative"
                onClick={heartIcon}
              >
                <HeartFill className="position-absolute shopmain-heart-icon" />
              </button>
            )}
            {/* 用彈跳視窗，將產品加到購物車裡*/}
            <button
              className="position-absolute mountain_cart-icon-bkg position-relative"
              onClick={handleShow}
            >
              <CartFill className="position-absolute mountain_cart-icon" />
            </button>
          </div>
          {/* Link將產品連到商品頁面 */}
          <Link
            to={`/shop/product-detail/${productId}`}
            className="text-left mountain_product-name"
          >
            {brand}
            <br />
            {name}
          </Link>
          {/* 價錢從後端抓 */}
          <p className="text-left mountain_product-price">
            NT ${parseInt(price).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Modal star */}
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="h5">
            {brand}
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6}>
              <img
                className="shopmain-cover-fit shadow-sm bg-white rounded"
                src={`${IMAGE_URL}/img/product-img/${picture}`}
                alt={`${brand}${name}`}
                title={`${brand}${name}`}
              />
            </Col>
            <Col xs={6} md={6}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    數量
                  </span>
                </div>
                {/* FIXME:記得寫判斷和提示訊息 數量不能多於10小於1 */}
                <input
                  type="number"
                  className="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={cartNum}
                  name="cartnum"
                  min="1"
                  max="10"
                  //防止使用者亂key數字
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  onChange={(e) => {
                    setCartNum(e.target.value);
                  }}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text">尺寸</label>
                </div>
                {type === '2' ? (
                  <select
                    className="custom-select"
                    name="size"
                    value={cartSize}
                    onChange={(e) => {
                      setCartSize(e.target.value);
                    }}
                  >
                    <option value="">請選擇尺寸</option>
                    <option value="F">F</option>
                  </select>
                ) : (
                  <select
                    className="custom-select"
                    name="size"
                    value={cartSize}
                    onChange={(e) => {
                      setCartSize(e.target.value);
                    }}
                  >
                    <option value="">請選擇尺寸</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                  </select>
                )}
              </div>
              <Row className="my-3">
                <Col xs={6} md={6}>
                  總價：
                </Col>
                <Col xs={6} md={6}>
                  <div className="text-right">
                    NT$ {cartPrice.toLocaleString()}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={addCart}>加入購物車</Button>
        </Modal.Footer>
      </Modal>
      {/* Modal end */}
    </>
  );
}

export default ProductRec_H;
