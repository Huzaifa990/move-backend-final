const passwordPattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/);
const base64ImgPattern = new RegExp(/^data:image\/([a-zA-Z]*);base64,([^"]*)$/);

module.exports = {
  passwordPattern,
  base64ImgPattern,
};
