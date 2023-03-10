const multer=require('multer');
const path=require('path')


//STORAGE
const storage=multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploadFiles')
    },
    filename: function(req, file, cb) {
        console.log(file);
        const ext=path.extname(file.originalname);
        cb(null, file.fieldname+'-'+Date.now()+ext);
    }
})


//UPLOAD
const upload=multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if(file.mimetype=="image/png"||file.mimetype=="text/csv"||file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"||
            file.mimetype=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            cb(null, true);
        }
        else {
            cb(new Error("File format is not supported"));
        }
    },
    limits: {fileSize: 1024*1024*2}
})



module.exports={
    upload
};