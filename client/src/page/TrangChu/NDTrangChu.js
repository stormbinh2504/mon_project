import React from 'react';
import PropTypes from 'prop-types';
import "./ndtrangchu.css";
import { Carousel } from 'react-bootstrap';

function NDTrangChu(props) {
    return (
        <div className="content-trangchu">
            {/* <div className="slide-trangchu">
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img
                    className="d-block w-100"
                    src="https://thanglong.edu.vn/sites/default/files/2020-04/banner.png"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                  <h1 class = "hero__title"> Tư duy là <br/>
                        sức mạnh của <br />
                        sự sáng tạo </h1>
                    </Carousel.Caption>
                </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                className="d-block w-100"
                src="https://thanglong.edu.vn/sites/default/files/2020-04/banner.png"
                alt="Second slide"
                />
                <Carousel.Caption>
                <h1 class = "hero__title"> Tư duy là <br/>
                        sức mạnh của <br />
                        sự sáng tạo </h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500}>
                <img
                className="d-block w-100"
                src="https://thanglong.edu.vn/sites/default/files/2020-04/banner.png"
                alt="Third slide"
                />
                <Carousel.Caption>
                <h1 class = "hero__title"> Tư duy là <br/>
                        sức mạnh của <br />
                        sự sáng tạo </h1>
                </Carousel.Caption>
            </Carousel.Item>
</Carousel>
            </div> */}
            <div className="content-main">
            
            <div className="tlu-left">
                <div className="title">
                    <h2 className="title__title">Đại học định hướng ứng dụng</h2>
                    <p className="title__text">Đại học Thăng Long là một trung tâm giáo dục đa ngành, đa nghề, định hướng ứng dụng; với mô hình đào tạo - học tập cập nhật theo môi trường làm việc thực tế. Với niềm tâm huyết của những nhà thiết kế giáo dục, chúng tôi cam kết xây dựng một môi trường giáo dục tốt nhất, cập nhật nhất dành cho sinh viên.</p>
                </div>

                <div className="tlu-left__img">
                    <img src="https://thanglong.edu.vn/sites/default/files/2020-05/facilities-top-01.jpg" />
                </div>
			</div>
            <div className="tlu-right">
                <div className="tlu-right__counter">
                <div className="tlu-right__img">
                     <img src="https://thanglong.edu.vn/sites/default/files/2020-05/intro-01.jpg" />
                </div>
                <div className = "content-counter" >
                    <div className="row">
                        <div className="col-6">
                            <div className="counter counter--decimal">
                                <div className="counter__number">
                                     <span className="countoJs" data-to="256">256</span>
                                     <em>%</em>
                                </div>
                                <h3 className="counter__title">Tỉ lệ sinh viên tăng lên trong 10 năm qua (tính đến K30)</h3>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="counter counter--decimal">
                                <div className="counter__number">
                                    <span className="countoJs" data-to="2721">2721</span>
                                    <em></em>
                                </div>
                                <h3 className="counter__title">sinh viên nhập học năm 2019</h3>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="counter counter--decimal">
                                <div className="counter__number">
                                    <span className="countoJs" data-to="9.1" data-decimals="1">09.1</span>
                                    <em>triệu</em>
                                </div>
                                <h3 className="counter__title">Mức lương trung bình tháng của một sinh viên Thăng Long khi mới ra trường</h3>
                            </div>
                        </div>
                            <div className="col-6">
                            <div className="counter counter--decimal">
                                <div className="counter__number">
                                    <span className="countoJs" data-to="93.7" data-decimals="1">93.7</span>
                                    <em>%</em>
                                </div>
                                <h3 className="counter__title">Sinh viên ra trường có việc làm ngay trong năm đầu tiên</h3>
                            </div>
                        </div>
                            <div className="col-6">
                            <div className="counter counter--decimal">
                                <div className="counter__number">
                                     <span className="countoJs" data-to="14.858" data-decimals="1">14.9</span>
                                     <em>nghìn</em>
                                </div>
                                <h3 className="counter__title">sinh viên tốt nghiệp</h3>
                            </div>
                        </div>
                </div>
                </div>
            </div>
            </div>
    </div>
        </div>
    );
}

export default NDTrangChu;