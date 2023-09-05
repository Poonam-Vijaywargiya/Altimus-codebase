const mongoose =  require('mongoose');

const File = mongoose.model('File', {
    name: String,
    data: Buffer,
    email: String,
    type: String,
    projectid: String, 
    projectname: String,
    uploadedfile: String,
    pdfdata: Buffer
  });
  

module.exports= File