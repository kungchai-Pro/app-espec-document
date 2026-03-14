// import FetchApi from './Functionapi';
import {host}from './Functionapi';
// update file 
export function UploadFiles(file) {
  
    const fd = new FormData();
    // var newFileName = `${Date.now()}`+file.name;
    fd.append('file',file);
    console.log(fd);

    return fetch(host + `/file/images/uploadfile`, {
      method: 'POST',
      body: fd
    }).then(res => res.json())
      .then(json => { return json })
      .catch(err => console.log(err));
  
  }