const input = document.querySelector('#input')
const image = document.querySelector('#image')
const previous = document.querySelector('#previous')
const previousTen = document.querySelector('#previous-10')
const next = document.querySelector('#next')
const nextTen = document.querySelector('#next-10')
const display = document.querySelector('#display')

input.addEventListener('input', () => {
  const encodedUrl = encodeURIComponent(input.value)
  setCookie('url', encodedUrl, 1)
  setCookie('position', 0, 1)
})

previous.addEventListener('click', () => {
  moveInGallery(-1)
})

next.addEventListener('click', () => {
  moveInGallery(1)
})

previousTen.addEventListener('click', () => {
  moveInGallery(-10)
})

nextTen.addEventListener('click', () => {
  moveInGallery(10)
})

const moveInGallery = (direction) => {
  const url = getCookie('url')
  const position = getCookie('position')
  let newPosition;
  if (position) {
    newPosition = Number.parseInt(position) + direction
  } else {
    newPosition = 0
  }
  setCookie('position', newPosition, 1)
  const newUrl = url.replace("%!", newPosition.toString().padStart(4, '0'))
  image.src = newUrl
  display.innerHTML = newUrl
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}