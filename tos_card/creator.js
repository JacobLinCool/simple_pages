function create() {
    document.getElementById("create").disabled = !0;
    var e = {};
    Array.from(document.getElementsByTagName("fieldset")[0].children).forEach(n => {
        n.children.length > 1 && (e[n.children[1].name] = n.children[1].value.replace(/\n/g, "<br>"))
    }), window.newW = window.open("url", "_blank"), fetch("https://tos-card.firebaseio.com/card.json", {
        method: "POST",
        body: JSON.stringify(e)
    }).then(e => e.json()).then(e => {
        setTimeout(function() {
            newW.location = "./view?card=" + e.name
        }, 50);
        document.getElementById("create").disabled = !1;
        window.clipboard = new ClipboardJS('#copy_btn');
        window.shareURL = location.origin + location.pathname + "view?card=" + e.name;
        document.getElementById("copy_btn").dataset.clipboardText = shareURL;
        
        Swal.fire({
            title: '分享卡片',
            input: 'text',
            inputValue: shareURL,
            inputAttributes: {
                autocapitalize: 'off'
            },
            confirmButtonText: '複製',
            showLoaderOnConfirm: true,
            preConfirm: (url) => {
                document.getElementById("copy_btn").click();
                Swal.fire("已複製","","success");
            }
        });
    })
}
function addMec(){document.getElementsByName("info")[0].value += `

機械族特性：
每首批消除 1 粒自身屬性符石，自身行動值提升 2%；每首批消除 1 粒心符石，自身行動值提升 1%。行動值愈高，自身攻擊力提升愈多，最大提升至 2 倍。

當所有機械族成員的行動值達至 50% 或以上時，機械族成員屬性的符石效果提升，每個機械族成員可提升 10% 效果，最高 60%。

當所有機械族成員的行動值達至 100% 時，機械族成員每回合以 25% 自身攻擊力隨機追打自身屬性或自身克制屬性的攻擊 1 至 2 次

條件：
隊伍中有 2 個或以上的機械族成員`;
}
async function uploadImg(file) {
    var hdr = new Headers();
    hdr.append("Authorization", "Client-ID 7bde459dc4640c8");

    var data = new FormData();
    data.append("image", file);

    var opt = {
        method: 'POST',
        headers: hdr,
        body: data,
        redirect: 'follow'
    };
    var r;
    try {
        r = await fetch("https://api.imgur.com/3/image", opt).then(r => r.json()).then(result => result.data.id);
    } catch (err) {}
    if (!r) r = "Failed to Upload.";
    return r;
}

function preview() {
    var url = "./view?";
    Array.from(document.getElementsByTagName("fieldset")[0].children).forEach(elm => {
        if (elm.children.length > 1) {
            url += encodeURIComponent(elm.children[1].name) + "=" + encodeURIComponent(elm.children[1].value.replace(/\n/g, "<br>")) + "&";
        }
    });
    var newW = window.open("url", "_blank");
    setTimeout(function() {
        newW.location = url
    }, 50);
}
