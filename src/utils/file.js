function generateText(filename,text) {
  let element = document.createElement('a');
  element.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download',filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//将编辑器的内容以txt形式保存到本地
export default {
  generateText
}
