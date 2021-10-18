import React from 'react';
import { Link } from 'react-router-dom'; //a標籤要變成link
//====== below img import start ======//
import middleMapPng from '../../../img/mountain-img/middleMap.png';
import middleBearPng from '../../../img/mountain-img/middleBear.png';
//====== above img import end ======//

//====== below icon start ======//
import { StarFill } from 'react-bootstrap-icons';
//====== below icon end ======//

function Map_M(props) {
  const { listData } = props;
  console.log('listData map:', listData); //for check
  return (
    <>
      <h1 className="mountain_bg_box container mountain_container">
        <div className="mountain_maps">
          <div className="mountain_maps_item">
            <img
              className="mountain_low_map"
              src={middleMapPng}
              alt="middle_map"
            />
            {/* Link 要連到抹茶山的文章 */}
            <Link to="/recommend/detail/5" className="mountain_M_Xiangshan">
              <div className="mountain_M_Xiangshan_box mountain_circle"></div>

              <div className="mountain_M_Xiangshan_box_hover">
                <div className="mountain_M_Xiangshan_hover mountain_triangle"></div>
                <div className="mountain_M_Xiangshan_hover_pic">
                  <div className="mountain_M_Xiangshan_hover_pic_font d-flex justify-content-center align-items-center">
                    <p className="mountain_M_Xiangshan_hover_pic_font_title text-white mb-0 mr-2">
                      抹茶山
                    </p>
                    <p className="mountain_M_Xiangshan_hover_pic_font_star text-warning mb-0">
                      {/* FIXME: 需要特別注意資料庫改這邊要手動改 */}
                      {listData.map((list) =>
                        list.name === '抹茶山' ? (
                          list.starAverage === 0 ? (
                            <span key={list.id} className="text-white mr-1">
                              暫無星級評分
                            </span>
                          ) : (
                            <span key={list.id} className="text-white mr-1">
                              {list.starAverage}
                            </span>
                          )
                        ) : (
                          ''
                        )
                      )}
                      <StarFill className="mb-1" />
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* Link 要連到陽明山東西大縱走的文章 */}
            <Link to="/recommend/detail/2" className="mountain_M_Jinmian">
              <div className="mountain_M_Jinmian_box mountain_circle"></div>

              <div className="mountain_M_Jinmian_box_hover">
                <div className="mountain_M_Jinmian_hover mountain_triangle"></div>
                <div className="mountain_M_Jinmian_hover_pic">
                  <div className="mountain_M_Jinmian_hover_pic_font d-flex justify-content-center align-items-center">
                    <p className="mountain_M_Jinmian_hover_pic_font_title text-white mb-0 mr-2">
                      陽明山東西大縱走
                    </p>
                    <p className="mountain_M_Jinmian_hover_pic_font_star text-warning mb-0">
                      {listData.map((list) =>
                        list.name === '陽明山東西大縱走' ? (
                          list.starAverage === 0 ? (
                            <span key={list.id} className="text-white mr-1">
                              暫無星級評分
                            </span>
                          ) : (
                            <span key={list.id} className="text-white mr-1">
                              {list.starAverage}
                            </span>
                          )
                        ) : (
                          ''
                        )
                      )}
                      <StarFill className="mb-1" />
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* Link 要連到北插天山的文章 */}
            <Link to="/recommend/detail/8" className="mountain_M_Chi-hsing">
              <div className="mountain_M_Chi-hsing_box mountain_circle"></div>

              <div className="mountain_M_Chi-hsing_box_hover">
                <div className="mountain_M_Chi-hsing_hover mountain_triangle"></div>
                <div className="mountain_M_Chi-hsing_hover_pic">
                  <div className="mountain_M_Chi-hsing_hover_pic_font d-flex justify-content-center align-items-center">
                    <p className="mountain_M_Chi-hsing_hover_pic_font_title text-white mb-0 mr-2">
                      北插天山登山步道
                    </p>
                    <p className="mountain_M_Chi-hsing_hover_pic_font_star text-warning mb-0">
                      {listData.map((list) =>
                        list.name === '北插天山登山步道' ? (
                          list.starAverage === 0 ? (
                            <span key={list.id} className="text-white mr-1">
                              暫無星級評分
                            </span>
                          ) : (
                            <span key={list.id} className="text-white mr-1">
                              {list.starAverage}
                            </span>
                          )
                        ) : (
                          ''
                        )
                      )}
                      <StarFill className="mb-1" />
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <img className="middleBear" src={middleBearPng} alt="middleBear" />
      </h1>
    </>
  );
}

export default Map_M;
