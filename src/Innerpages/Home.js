import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import innerstyles from '../Innerpages/innerpages.module.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bannerImg from '../assets/banner.jpg';
import aboutusImg from '../assets/us.jpg';
import img1 from '../assets/breadomlate.jpg';
import img2 from '../assets/chapathi.jpg';
import img3 from '../assets/chickenbiryani.avif';
import img4 from '../assets/ChickenFriedRice.jpg';
import img5 from '../assets/chickennon.jpg';
import img6 from '../assets/Dosa.webp';
import img7 from '../assets/idly.jpg';
import img8 from '../assets/mattonbiryani.jpg';
import img9 from '../assets/parota.jpg';
import img10 from '../assets/poha.jpg';
import img11 from '../assets/pulihora.webp';
import img12 from '../assets/puri.webp';
import img13 from '../assets/roti.jpg';
import img14 from '../assets/upma.jpg';
import img15 from '../assets/whiterice.avif';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const mealSectionRef = useRef(null);

  const imageList = [
    img1, img2, img3, img4, img5, img6, img7, img8,
    img9, img10, img11, img12, img13, img14, img15
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    pauseOnHover: false
  };

  useEffect(() => {
    axios.get('https://food-order-system-backend.onrender.com/server')
      .then((res) => setMeals(res.data))
      .catch((err) => console.log(err));
  }, []);

  const scrollToMeals = () => {
    mealSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />

    
      <section>
        <div className={innerstyles.bannerimg}>
          <img src={bannerImg} alt="banner" className="banner" />
          <div className={innerstyles.child}>
            <h4 className="ms-5">Welcome to Eatoes Restaurant</h4>
            <p className={innerstyles.bannerp}>Your Hunger Ends Here</p>
            <h3>
              Get <span style={{ color: 'yellow' }}>25%</span> OFF at Eatoes Restaurant
            </h3>
            <button onClick={scrollToMeals} className="btn btn-warning mt-2 ms-5">More</button>
          </div>
        </div>
      </section>

      
      <section className="py-5">
        <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1000, padding: '10px 0' }}>
          <h2 className="text-center mb-0">
            Our Best Popular <span style={{ color: 'green' }}>Recipes</span>
          </h2>
        </div>
        <div className="container mt-4">
          <Slider {...settings}>
            {imageList.map((image, index) => (
              <div key={index} className="p-2">
                <img
                  src={image}
                  alt={`slide-${index}`}
                  style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '20px' }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

    
      <section className="py-5">
        <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1000, padding: '10px 0' }}>
          <h2 className="text-center mb-0">
            About <span style={{ color: 'green' }}>Us</span>
          </h2>
        </div>
        <div className="container mt-4 text-center">
          <img
            src={aboutusImg}
            className="mx-auto d-block"
            alt="about"
            style={{ width: '800px', height: '500px', borderRadius: '20px' }}
          />
          <h6 className={`${innerstyles.abouth5} mt-3`}>
            We’re a passionate team of food lovers dedicated to serving fresh, delicious meals with a modern twist.
            Whether you’re craving a juicy burger, a crisp salad, or a comforting bowl of pasta, our menu is crafted
            with care using only the finest ingredients. At The Digital Diner, we believe that good food brings people together.
          </h6>
        </div>
      </section>

   
      <section className="py-5" ref={mealSectionRef}>
        <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1000, padding: '10px 0' }}>
          <h2 className="text-center mb-0 fw-bold">
            Choose Your Favorite <span style={{ color: 'green' }}>Meal</span>
          </h2>
        </div>
        <div className="container mt-4">
          <div className="row justify-content-center text-center">
            {meals.map((data) => (
              <div key={data._id} className="col-md-3 col-lg-4 mb-4">
                <NavLink
                  to={`/data/${data.service}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img
                    src={data.image}
                    alt="meal"
                    className="img-fluid rounded-3 shadow"
                    style={{ width: '100%', height: '500px' }}
                  />
                  <div className="mt-4">
                    <h5 className="d-inline">{data.service}</h5>
                    <span style={{ fontSize: '25px', marginLeft: '5px' }}>→</span>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="bg-warning text-black fw-semibold py-2 px-4 rounded-pill border-0 shadow-sm">
              Order Now
            </button>
          </div>
        </div>
      </section>

     
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;
