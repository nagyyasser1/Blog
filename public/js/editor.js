// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAeVtaRz_l_hJ5-PCqw2FEzxqpWVe35bkA',
//   authDomain: 'blogging-website-2f62d.firebaseapp.com',
//   projectId: 'blogging-website-2f62d',
//   storageBucket: 'blogging-website-2f62d.appspot.com',
//   messagingSenderId: '66030395933',
//   appId: '1:66030395933:web:3e603b65d4012040751cf4',
// }

// Initialize Firebase
// firebase.initializeApp(firebaseConfig)

// let db = firebase.firestore()
// --------------------------------------------------------------====
import { db } from '../js/firebase.js'
const blogTitleField = document.querySelector('.title')
const articleFeild = document.querySelector('.article')

// banner
const bannerImage = document.querySelector('#banner-upload')
const banner = document.querySelector('.banner')
let bannerPath

const publishBtn = document.querySelector('.publish-btn')
const uploadInput = document.querySelector('#image-upload')

bannerImage.addEventListener('change', () => {
  uploadImage(bannerImage, 'banner')
})

uploadInput.addEventListener('change', () => {
  uploadImage(uploadInput, 'image')
})

const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files
  if (file && file.type.includes('image')) {
    const formdata = new FormData()
    formdata.append('image', file)

    fetch('/upload', {
      method: 'post',
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (uploadType == 'image') {
          addImage(data, file.name)
        } else {
          bannerPath = `${location.origin}/${data}`
          banner.style.backgroundImage = `url("${bannerPath}")`
        }
      })
  } else {
    alert('upload Image only')
  }
}

const addImage = (imagepath, alt) => {
  let curPos = articleFeild.selectionStart
  let textToInsert = `\r![${alt}](${imagepath})\r`
  articleFeild.value =
    articleFeild.value.slice(0, curPos) +
    textToInsert +
    articleFeild.value.slice(curPos)
}

let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

publishBtn.addEventListener('click', () => {
  if (articleFeild.value.length && blogTitleField.value.length) {
    // generating id
    let letters = 'abcdefghijklmnopqrstuvwxyz'
    let blogTitle = blogTitleField.value.split(' ').join('-')
    let id = ''
    for (let i = 0; i < 4; i++) {
      id += letters[Math.floor(Math.random() * letters.length)]
    }

    // setting up docName
    let docName = `${blogTitle}-${id}`
    let date = new Date() // for published at info

    //access firstore with db variable;
    db.collection('blogs')
      .doc(docName)
      .set({
        title: blogTitleField.value,
        article: articleFeild.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`,
      })
      .then(() => {
        console.log('ok')
        location.href = `/${docName}`
      })
      .catch((err) => {
        console.error(err)
      })
  }
})