export default (error) => {
  if ('message' in error) {
    console.log(error)
    return {
      code: 'extensions' in error ? error.extensions.code : error.name,
      message: error.message
    }
  }
}
