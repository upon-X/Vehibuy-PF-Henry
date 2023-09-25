import React, { useState } from 'react';
import styles from './TermsAndConditions.module.css';

const TermsAndConditions = () => {
  const termsText = `Welcome to our Terms & Conditions section, for the sale of luxury cars. Below you will find important information to ensure a satisfactory experience when purchasing one of our vehicles.

  Warranty
  Our luxury cars come with a standard [X] year warranty that covers manufacturing defects and mechanical problems. However, please note that the warranty does not cover damage caused by accidents, misuse or unauthorized modifications.
  
  Responsability:
  When purchasing a luxury car, the buyer accepts the responsibility of maintaining the vehicle in good condition and following the maintenance instructions provided by the manufacturer. We are not responsible for any damage or injury caused by misuse of the vehicle.
  
  Delivery and Deadlines:
  We will do our best to deliver your luxury car in the shortest possible time. However, please note that delivery times may vary depending on the availability of the model and other external factors. We will keep you informed about the progress of your order.
  
  Legal Issues:
  It is important that you are familiar with the laws and regulations related to the sale of luxury cars. By making a purchase, you agree to comply with all applicable laws, including those related to import and export, taxes, and any other legal requirements specific to your country or region.
  
  Return Policy:
  We offer an [X]day return policy for our luxury cars. If you are not satisfied with your purchase, please contact us within this period for more information on how to proceed with the return.
  
  Privacy and Data Protection:
  We respect your privacy and protect your personal data in accordance with applicable privacy laws. We will use your personal information only for purposes related to your purchase and will not share it with third parties without your consent.
  
  Contact us:
  If you have any questions or concerns related to our Terms and Conditions, please do not hesitate to contact us through the communication channels provided on our website.
  
  Thank you for choosing us as your luxury car supplier. We look forward to providing you with an exceptional experience.`;

  const [activeSection, setActiveSection] = useState('Warranty');

  const handleButtonClick = (section) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    sectionElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.coverImage}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Terms & Conditions</h1>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${activeSection === 'Warranty' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Warranty')}
          >
            Warranty
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Responsability' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Responsability')}
          >
            Responsability
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Delivery and Deadlines' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Delivery and Deadlines')}
          >
            Delivery and Deadlines
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Legal Issues' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Legal Issues')}
          >
            Legal Issues
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Return Policy' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Return Policy')}
          >
            Return Policy
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Privacy and Data Protection' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Privacy and Data Protection')}
          >
            Privacy and Data Protection
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Contact' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Contact')}
          >
            Contact
          </button>
        </div>
        <div className={styles.paragraphsContainer}>
          <h2 className={styles.subtitle} id="Warranty">
            Warranty
          </h2>
          <p>{termsText.substring(0, termsText.indexOf('Responsability'))}</p>
          <h2 className={styles.subtitle} id="Responsability">
            Responsability
          </h2>
          <p>{termsText.substring(termsText.indexOf('Responsability'), termsText.indexOf('Delivery and Deadlines'))}</p>
          <h2 className={styles.subtitle} id="Delivery and Deadlines">
            Delivery and Deadlines
          </h2>
          <p>{termsText.substring(termsText.indexOf('Delivery and Deadlines'), termsText.indexOf('Legal Issues'))}</p>
          <h2 className={styles.subtitle} id="Legal Issues">
            Legal Issues
          </h2>
          <p>{termsText.substring(termsText.indexOf('Legal Issues'), termsText.indexOf('Return Policy'))}</p>
          <h2 className={styles.subtitle} id="Return Policy">
            Return Policy
          </h2>
          <p>{termsText.substring(termsText.indexOf('Return Policy'), termsText.indexOf('Privacy and Data Protection'))}</p>
          <h2 className={styles.subtitle} id="Privacy and Data Protection">
            Privacy and Data Protection
          </h2>
          <p>{termsText.substring(termsText.indexOf('Privacy and Data Protection'), termsText.indexOf('Contact'))}</p>
          <h2 className={styles.subtitle} id="Contact">
            Contact
          </h2>
          <p>{termsText.substring(termsText.indexOf('Contact'))}</p>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img src="../../../public/frontal.jpg" alt="Auto 1" />
            <p>(Does not cover front crashes)</p>
          </div>
          <div className={styles.card}>
            <img src="../../../public/lateral.jpg" alt="Auto 2" />
            <p>(Does not cover side crashes)</p>
          </div>
          <div className={styles.card}>
            <img src="../../../public/trasero.jpg" alt="Auto 3" />
            <p>(Does not cover back crashes)</p>
          </div>
        </div>
        <p className={styles.thanks}>Thank you for choosing us as your luxury car supplier. We look forward to providing you with an exceptional experience.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;