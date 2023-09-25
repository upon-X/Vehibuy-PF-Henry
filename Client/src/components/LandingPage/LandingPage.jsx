import { Link } from 'react-router-dom'
import React from 'react'
import style from './Landing.module.css'

function LandingPage() {
  return (
    <div>
      <div className={`${style.Container} ${style.FirstSection}`}>
        <div className={style.ContainerText}>
        <h1 className={`${style.title} ${style.mainTitle}`}>Find your<br /> next<br /> acquisition</h1>
          <Link to="/home">
            <button className={style.button}>View more</button>
          </Link>
        </div>
      </div>
      <div className={`${style.Container} ${style.SecondSection}`}>
        <div className={style.ContainerText}>
          <h2 className={style.sectionTitle}>¿Who we are?</h2>
          <p className={style.sectionText}>
          At our company, we specialize in providing you with a unique and personalized shopping experience so that you can acquire the luxury car of your dreams. We are here to help you find what you are looking for. Let us make your dreams of owning a luxury car come true today!
          </p>
        </div>
      </div>
      <div className={`${style.Container} ${style.ThirdSection}`}>
        <div className={style.ContainerText}>
          <h2 className={style.sectionTitle}>Success comes to those who work for it.</h2>
          <div className={style.video}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/mmzn77xOCe0"
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className={`${style.Container} ${style.FourthSection}`}>
        <div className={style.ContainerText}>
          <h2 className={style.sectionTitle}>Let's do this together.</h2>
          <div className={style.customerReview}>
            <div className={style.review}>
              <div className={style.reviewHeader}>
                <h3 className={style.customerName}>John Doe</h3>
                <div className={style.starRating}>
                  <span className={style.star}>&#9733;</span>
                  <span className={style.star}>&#9733;</span>
                  <span className={style.star}>&#9733;</span>
                  <span className={style.star}>&#9733;</span>
                  <span className={style.star}>&#9734;</span>
                </div>
              </div>
              <p className={style.reviewText}>
                "Incredible shopping experience! I found my dream car and the sales team was very friendly and helpful. I would definitely recommend this company to anyone looking for a luxury car."
              </p>
            </div>
            <div className={style.review}>
              <div className={style.reviewHeader}>
                <h3 className={style.customerName}>Juan Villalba</h3>
                <div className={style.starRating}>
                  <span className={style.star}>&#9733;</span>
                  <span className={style.star}>&#9733;</span>
                  <span className={style.star}>&#9733;</span>
                  <span className={style.star}>&#9733;</span>
                  <span className={style.star}>&#9733;</span>
                </div>
              </div>
              <p className={style.reviewText}>
                "Excelente servicio al cliente y una amplia selección de autos de lujo. Mi experiencia de compra fue sin problemas y estoy muy satisfecha con mi nuevo automóvil. ¡Definitivamente volveré a comprar aquí en el futuro!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;