module.exports = (on, config) => {
  config.env.IMAGE_1 = process.env.IMAGE_1 ? process.env.IMAGE_1 : 'VRT1'
  config.env.IMAGE_2 = process.env.IMAGE_2 ? process.env.IMAGE_2 : 'VRT2'
  return config
}