const purchaseDetailHTML = (price, date, id, description) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
        h1{ font-size: 30px !important;}
        h2{ font-size: 25px !important;}
        h3{ font-size: 18px !important;}
        h4{ font-size: 16px !important;}
        p, a{font-size: 15px !important;}

        .claseBoton{
            width: 30%;
                background-color: #a3a3a3;
                color: black; 
                padding: 16px 32px;
                text-align: center;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition-duration: 0.4s;
                cursor: pointer;
        }
        .claseBoton:hover{
            background-color: #000000;
            color: #ffffff;
        }
        .imag{
            width: 20px;
            height: 20px;
        }
        .contA{
            margin: 0px 5px 0 5px;
        }
        .afooter{
            color: #ffffff !important; 
            text-decoration: none;
            font-size: 13px !important;
        }
    </style>
</head>
<body>
    <div style="width: 100%; background-color: #e3e3e3;">
        <div style="padding: 20px 10px 20px 10px;">
            <div style="background-color: #c2c2c2; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                <img src="cid:logo" alt="" style="width: 200px; height: 60px;">
            </div>

            <div style="background-color: white; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                <h1>Thank you for purchasing at Vehibuy.com</h1>
                <p>The following are the purchase details: </p>
                <div style="border:#282828 solid 2px;">
                    <div style="display:flex; justify-content: space-between;">
                        <h3>Order Id: ${id}</h3> 
                        <h3>${date}</h3>
                    </div>
                    <div style="display:flex; justify-content: space-between;">
                    <div style="width: 100%;display:flex;">
                    <h4>Desciption: ${description}</h4></div>
                    <div style="width: 30%;display:flex; justify-content: center;">
                    <h3>Total Price: ${price} USD</h3></div>
                </div>
                <p style="text-align: right;">Payment method: MercadoPago</p>
                </div>
                
                <p style="margin-bottom: 50px;"><i>
                    Sincerely:</i><br><strong>VehiBuy </strong>Team</p>
            </div>

            <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                <a href="https://www.facebook.com/pretwor" class="contA"><img src="cid:fb" class="imag" /></a>
                <a href="https://www.linkedin.com/in/daniel-felipe-botache-zuluaga-0180391a4/" class="contA"><img src="cid:ld" class="imag" /></a>
                <a href="https://wa.me/5732156899" class="contA"><img src="cid:wapp" class="imag" /></a>
                <a href="mailto:vehibuy97@gmail.com" class="contA"><img src="cid:gmail" class="imag" /></a>

                <h4>Support</h4>
                <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                    Get in touch with us through the following means:<br>
                    E-mail <a class="afooter" href="mailto:vehibuy97@gmail.com">vehibuy97@gmail.com</a><br>
                    Whatsapp: <a class="afooter" href="https://wa.me/5732156899">+57 321 568 99</a><br>
                </p>
                <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                    © 2023 VehiBuy, All rights reserved.
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
};
module.exports = purchaseDetailHTML;
