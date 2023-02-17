const formatCurrency = (num) => {
  return Number(Number(num).toFixed(3)).toLocaleString()
}
const setCookie = (cookieName, cookieValue, exDay) => {
  const now = new Date()
  now.setTime(now.getTime() + exDay * 24 * 60 * 60 * 1000)
  document.cookie = `${cookieName}=${cookieValue};path=/;expires=${now}`
}
const removeCookie = (cookieName, cookieValue) => {
  const now = new Date()
  now.setTime(now.getTime() - 2 * 24 * 60 * 60 * 1000)
  document.cookie = `${cookieName}=${cookieValue};path=/;expires=${now}`
}
const getCookie = (cookieName) => {
  let cookieArray = document.cookie.split(";")
  let cookieValue = ""
  cookieArray.some((cookie) => {
    if (cookie.includes(cookieName)) {
      cookieValue = cookie.substring(cookie.indexOf("=") + 1)
      return true
    }
  })
  return cookieValue
}

export { formatCurrency, setCookie, getCookie, removeCookie }
