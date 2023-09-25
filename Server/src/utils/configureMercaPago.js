require('dotenv').config();

function configureMercaPago(mercadoPago) {
  mercadoPago.configure({
    access_token: "TEST-7696100077810378-090516-0065c6383422d361922e5503b2475c4e-1470107629",
    // access_token: "TEST-2210400240400034-090609-0a61b6052774a9108bb75f4777f1f4ce-432818868",
  });
}

module.exports = { configureMercaPago };