import Drive from './app/helpers/filesystem'

const imageUrl = 'https://avatars0.githubusercontent.com/u/2293792?s=460&v=4'
// Drive.disk()
//   .uploadFromUrl('example/1.jpg', imageUrl)
//   .then((data) => console.log('uploaded'))
//   .catch((e) => console.log(error))

// Drive.disk()
//   .resizeFromUrl('example/xs.jpg', imageUrl, 150, 150)
//   .then((data) => {
//     console.log('uploaded')
//     return Drive.disk().remove('example/xs.jpg')
//   })
//   .then((data) => console.log('deleted'))
//   .catch((e) => console.log(error))

Drive.disk('s3')
  .uploadFromUrl('example/xs.jpg', imageUrl)
  .then((data) => {
    console.log('uploaded')
    return Drive.disk('s3').remove('example/xs.jpg')
  })
  .then((data) => console.log('deleted'))
  .catch((e) => console.log(error))

// Drive.disk().resizeFromUrl('example/xs.jpg', imageUrl, 150, 150)
