import Drive from './app/helpers/filesystem'

const imageUrl =
  'https://cdn.triplelights.com/uploads/2014-06/th/350x3500ExFC9ge_kyotofushimiinarilarger.jpg'
console.log(Drive.disk('s3').getFileExt(imageUrl))
Drive.disk().uploadFromUrl('example/1.jpg', imageUrl)
