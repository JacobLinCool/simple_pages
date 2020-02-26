var firebaseConfig = {
    apiKey: "AIzaSyAW060kfFPzaSKzflp9eXesmyn-GMYj-M8",
    authDomain: "hsnu-1481-website.firebaseapp.com",
    databaseURL: "https://hsnu-1481-website.firebaseio.com",
    projectId: "hsnu-1481-website",
    storageBucket: "hsnu-1481-website.appspot.com",
    messagingSenderId: "405025421965",
    appId: "1:405025421965:web:7b6d32809d1eb939"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  var name = [
    "",
    "程琬貽",
    "邱子珆",
    "俞仁恩",
    "陳郁蓁",
    "李赫珈",
    "王俊文",
    "王琮盛",
    "李昀",
    "林長宏",
    "林哲玄",
    "林振可",
    "林書瑋",
    "",
    "林緯翰",
    "林萬荃",
    "蔡宜勳",
    "高逸傑",
    "張佑禕",
    "張竣為",
    "莫仲軒",
    "陳承謙",
    "陳建樺",
    "彭定甫",
    "游立宇",
    "黃威翔",
    "黃羿齊",
    "詹亦揚",
    "劉益華",
    "劉皓恩"
  ];

document.body.addEventListener("load", function(){
  genSeatsChecks();
});


function genSeatsChecks() {
  var seats = document.getElementById("seats");
  seats.innerHTML = "";
  for(var i = 0; i < name.length; i++) {
    if(name[i] != "") {
      seats.innerHTML += `
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="check_${i}">
                    <label class="custom-control-label" for="customCheck1">${i} 號 ${name[i]}</label>
                </div>
      `;
    }
  }
}

function addData() {
  var data = {};
  data.comment = document.getElementById("comment");
  data.seats = [];
  for(var i = 0; i < name.length; i++) {
    if(name[i] != "") {
      if(document.getElementById("check_"+i).checked) seats.push(i);
    }
  }
  var d = new Date();
  database.ref("CleaningChecking/" + d.getFullYear() + "-" + (""+(d.getMonth()+1)).padStart(2, "0") + "-" + (""+d.getDate()).padStart(2, "0")).set(data).then(()=>{alert("success!")});
}
