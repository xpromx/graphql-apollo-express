import Drive from './app/helpers/filesystem'

const imageUrl = 'https://nodejs.org/static/images/logo.svg'
// Drive.disk()
//   .uploadFromUrl('example/1.jpg', imageUrl)
//   .then((data) => console.log('uploaded'))
//   .catch((e) => console.log(error))

Drive.disk()
  .uploadFromUrl('example/logo.svg', imageUrl)
  .then((data) => console.log('uploaded'))
  .catch((e) => console.log(error))
