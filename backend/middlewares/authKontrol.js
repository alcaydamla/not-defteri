const jwt = require("jsonwebtoken");
const Kullanici = require("../models/kullaniciModel");

const authKontrol = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ hata: "Yetkilendirme token'i gerekli" });
    }

    const token = authorization.split(" ")[1]; 
    
    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);
        req.kullanici = await Kullanici.findOne({ _id }).select("_id");
        next();
    } catch (error) {
        console.error("Token doğrulama hatası:", error);
        res.status(401).json({ hata: "İstek yetkili değil" });
    }
};

module.exports = authKontrol;
