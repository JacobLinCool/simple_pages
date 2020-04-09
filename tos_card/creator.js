function create(){document.getElementById("create").disabled=!0;var e={};Array.from(document.getElementsByTagName("fieldset")[0].children).forEach(n=>{n.children.length>1&&(e[n.children[1].name]=n.children[1].value.replace(/\n/g,"<br>"))}),window.newW=window.open("url","_blank"),fetch("https://tos-card.firebaseio.com/card.json",{method:"POST",body:JSON.stringify(e)}).then(e=>e.json()).then(e=>{setTimeout(function(){newW.location="./view?card="+e.name},50),document.getElementById("create").disabled=!1})}
function addMec(){document.getElementsByName("info")[0].value += `

機械族特性：
每首批消除 1 粒自身屬性符石，自身行動值提升 2%；每首批消除 1 粒心符石，自身行動值提升 1%。行動值愈高，自身攻擊力提升愈多，最大提升至 2 倍。

當所有機械族成員的行動值達至 50% 或以上時，機械族成員屬性的符石效果提升，每個機械族成員可提升 10% 效果，最高 60%。

當所有機械族成員的行動值達至 100% 時，機械族成員每回合以 25% 自身攻擊力隨機追打自身屬性或自身克制屬性的攻擊 1 至 2 次

條件：
隊伍中有 2 個或以上的機械族成員`;
                 }
