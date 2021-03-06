import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

// ===icon start===
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
// ===icon end===

//===import img start===
import clothesPic4Removebg from '../../img/img-outfit/clothes-pic4-removebg-preview.png';
import clothesPic5Removebg from '../../img/img-outfit/clothes-pic5-removebg-preview.png';
import clothesPic6Removebg from '../../img/img-outfit/clothes-pic6-removebg-preview.png';
import bagsPic4Removebg from '../../img/img-outfit/bags-pic4-removebg-preview.png';
import bagsPic5Removebg from '../../img/img-outfit/bags-pic5-removebg-preview.png';
import bagsPic6Removebg from '../../img/img-outfit/bags-pic6-removebg-preview.png';
import shoesPic4Removebg from '../../img/img-outfit/shoes-pic4-removebg-preview.png';
import shoesPic5Removebg from '../../img/img-outfit/shoes-pic5-removebg-preview.png';
import shoesPic6Removebg from '../../img/img-outfit/shoes-pic6-removebg-preview.png';
//===import img end===

function OutfitProductSlider(props) {
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingProduct(false);
    }, 200);
  }, []);
  const spinner = (
    <div className="outfit-product-wrapper" id="slider">
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      <div className="outfit-product">
        <div className="outfit-product-img">
          <Skeleton height={160} width={160} />
        </div>
        <div className="outfit-product-info text-left">
          <p>
            <Skeleton width={70} />
            <br />
            <Skeleton width={100} />
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {/* product-warpper start */}
      <div className="outfit-product-slider">
        <BsFillCaretLeftFill className="outfit-prev mb-1" id="slideLeft2" />
        <BsFillCaretRightFill className="outfit-next mb-1" id="slideRight2" />
        {isLoadingProduct ? (
          spinner
        ) : (
          <div className="outfit-product-wrapper" id="slider2">
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={bagsPic4Removebg}
                  alt="Karrimor sector 25 ?????????????????????"
                  title="Karrimor sector 25 ?????????????????????"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="13"
                  data-productbrand="Karrimor"
                  data-productname="sector 25 ?????????????????????"
                  data-price="3510"
                  data-type="2"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  Karrimor
                  <br />
                  sector 25 ?????????????????????
                </p>
              </div>
            </div>
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={bagsPic5Removebg}
                  alt="MAMMUT????????? Lithium Speed 20L"
                  title="MAMMUT????????? Lithium Speed 20L"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="14"
                  data-productbrand="MAMMUT?????????"
                  data-productname="Lithium Speed 20L"
                  data-price="4480"
                  data-type="2"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  MAMMUT?????????
                  <br />
                  Lithium Speed 20L
                </p>
              </div>
            </div>
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={bagsPic6Removebg}
                  alt="Arcteryx ????????? ???????????? Brize 32"
                  title="Arcteryx ????????? ???????????? Brize 32"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="15"
                  data-productbrand="Arcteryx ?????????"
                  data-productname="???????????? Brize 32"
                  data-price="8341"
                  data-type="2"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  Arcteryx ?????????
                  <br />
                  ???????????? Brize 32
                </p>
              </div>
            </div>
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={shoesPic4Removebg}
                  alt="SALOMON EVASION ???????????????"
                  title="SALOMON EVASION ???????????????"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="4"
                  data-productbrand="SALOMON"
                  data-productname="EVASION ???????????????"
                  data-price="4577"
                  data-type="1"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  SALOMON
                  <br />
                  EVASION ???????????????
                </p>
              </div>
            </div>
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={shoesPic5Removebg}
                  alt="Caravan C403 ???????????????"
                  title="Caravan C403 ???????????????"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="5"
                  data-productbrand="Caravan"
                  data-productname="C403 ???????????????"
                  data-price="4740"
                  data-type="1"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  Caravan
                  <br />
                  C403 ???????????????
                </p>
              </div>
            </div>
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={shoesPic6Removebg}
                  alt="SALOMON X Ultra2 ???????????????"
                  title="SALOMON X Ultra2 ???????????????"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="6"
                  data-productbrand="SALOMON"
                  data-productname="X Ultra2 ???????????????"
                  data-price="2790"
                  data-type="1"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  SALOMON
                  <br />X Ultra2 ???????????????
                </p>
              </div>
            </div>
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={clothesPic4Removebg}
                  alt="Arcteryx ????????? Cerium SV ????????????????????????"
                  title="Arcteryx ????????? Cerium SV ????????????????????????"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="22"
                  data-productbrand="Arcteryx ?????????"
                  data-productname="Cerium SV ????????????????????????"
                  data-price="23800"
                  data-type="3"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  Arcteryx ?????????
                  <br />
                  Cerium SV ????????????????????????
                </p>
              </div>
            </div>
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={clothesPic5Removebg}
                  alt="The North Face ????????????????????????"
                  title="The North Face ????????????????????????"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="23"
                  data-productbrand="The North Face"
                  data-productname="????????????????????????"
                  data-price="8310"
                  data-type="3"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  The North Face
                  <br />
                  ????????????????????????
                </p>
              </div>
            </div>
            <div className="outfit-product">
              <div className="outfit-product-img">
                <img
                  src={clothesPic6Removebg}
                  alt="Mont-Bell Light Alpine ??????????????????"
                  title="Mont-Bell Light Alpine ??????????????????"
                  className="outfit-slider-image outfit-cover-fit"
                  draggable
                  id="24"
                  data-productbrand="Mont-Bell"
                  data-productname="Light Alpine ??????????????????"
                  data-price="5580"
                  data-type="3"
                />
              </div>
              <div className="outfit-product-info">
                <p>
                  Mont-Bell
                  <br />
                  Light Alpine ??????????????????
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* product-warpper end */}
    </>
  );
}

export default OutfitProductSlider;
