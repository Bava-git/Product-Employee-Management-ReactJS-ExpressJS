const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "uploads/");
    },

    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`)
    }

});

const fileFilter = (req, file, cd) => {
    if (file.mimetype.startsWith('image/')) {
        cd(null, true);
    } else {
        cd(new Error("Not an image, Please upload image"), false);
    }
}

const multerConfig = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { filesize: 1024 * 1024 * 5 },
})

module.exports = multerConfig;