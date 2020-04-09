var isMessengerBuiltIn = (navigator.userAgent.includes("FBAN") && navigator.userAgent.includes("Messenger"));
if(isMessengerBuiltIn) {
document.getElementsByClassName("page-Home")[0].innerHTML = `<h3 style="color: red">我們懷疑你正在使用 Messenger 內建的網頁瀏覽器瀏覽。<br>強烈建議你使用 Safari 或 Chrome 來瀏覽此網站。</h3>`;
}
