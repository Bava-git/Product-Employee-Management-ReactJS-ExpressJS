const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "uploads/");
    },

    filename: (req, file, cd) => {
        const customName = file.originalname;
        cd(null, customName ? customName : `${Date.now()}-${file.originalname}`)
    }

});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg") {
        cb(null, true); // accept
    } else {
        cb(new Error("Only JPG files are allowed"), false); // reject
    }
};

const multerConfig = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { filesize: 1024 * 1024 * 5 },
});

module.exports = multerConfig;