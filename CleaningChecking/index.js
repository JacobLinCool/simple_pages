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

  var sname = [
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

var jobs = [
  "",
  "內掃-掃地",  /* 1 */
  "無",
  "內掃-掃地",
  "內掃-",
  "外掃-",
  "內掃-",  /* 6 */
  "內掃-",
  "內掃-",
  "內掃-",
  "內掃-",
  "內掃-",  /* 11 */
  "內掃-",
  "內掃-",
  "內掃-",
  "內掃-",
  "內掃-",  /* 16 */
  "內掃-",
  "內掃-",
  "內掃-",
  "內掃-",
  "內掃-",  /* 21 */
  "內掃-",
  "內掃-",
  "內掃-",
  "內掃-",
  "內掃-",  /* 26 */
  "內掃-",
  "內掃-",
  "內掃-"
];


function genSeatsChecks() {
  var seats = document.getElementById("seats");
  seats.innerHTML = "";
  for(var i = 0; i < sname.length; i++) {
    if(sname[i] != "") {
      seats.innerHTML += `
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="check_${i}">
                    <label class="custom-control-label" for="check_${i}">${i} 號 ${sname[i]}</label>
                </div>
      `;
    }
  }
  for(var i = 0; i < jobs.length; i++) {
    if(jobs[i] != "無" && jobs[i].substring(0,1) == "內") {
      document.getElementById("jobs").innerHTML += `
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="job_${i}">
                    <label class="custom-control-label" for="job_${i}">${i} 號 ${sname[i]}: ${jobs[i]}</label>
                </div>
      `;
    }
  }
}

function addData() {
  var btn = document.getElementById("btn");
  btn.disabled = true;
  btn.innerHTML = "傳送中";
  var data = {};
  data.comment = document.getElementById("comment").value;
  data.seats = [];
  for(var i = 0; i < sname.length; i++) {
    if(sname[i] != "") {
      if(document.getElementById("check_"+i).checked) data.seats.push(i);
    }
  }
  data.jobs = [];
  for(var i = 0; i < jobs.length; i++) {
    if(jobs[i] != "無" && jobs[i].substring(0,1) == "內") {
      if(!document.getElementById("job_"+i).checked) data.jobs.push(i);
    }
  }
  var d = new Date();
  database.ref("CleanChecking/" + d.getFullYear() + "-" + (""+(d.getMonth()+1)).padStart(2, "0") + "-" + (""+d.getDate()).padStart(2, "0") + "-" + Date.now()).set(data).then(()=>{
    alert("已記錄!");
    btn.innerHTML = "完成";
  });
}
