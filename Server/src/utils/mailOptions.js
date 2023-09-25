let mailOptions = (to, subject, html) => {
  return (mailOptions = {
    from: "VehiBuy",
    to: to,
    subject: subject,
    html: html,
    attachments: [
      {
        filename: "facebook.png",
        path: process.cwd() + "/src/utils/icons/facebook.png",
        cid: "fb",
      },
      {
        filename: "LOGO.png",
        path: process.cwd() + "/src/utils/icons/LOGO.png",
        cid: "logo",
      },
      {
        filename: "linkedin.png",
        path: process.cwd() + "/src/utils/icons/linkedin.png",
        cid: "ld",
      },
      {
        filename: "gmail.png",
        path: process.cwd() + "/src/utils/icons/gmail.png",
        cid: "gmail",
      },
      {
        filename: "wapp.png",
        path: process.cwd() + "/src/utils/icons/wapp.png",
        cid: "wapp",
      },
    ],
  });
};
module.exports = mailOptions;
