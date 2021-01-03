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
    "劉皓恩",
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
    ""
  ];

var jobs = [
  "",
  "內掃-掃教室 <del>不用打掃的幹部</del>",  /* 1 */
  "<del>內掃-黑板＋講桌整理</del>",
  "<del>內掃-掃教室</del>",
  "內掃-掃走廊",
  "外掃-耙落葉",
  "內掃-掃具櫃＋置物櫃",  /* 6 */
  "記人的幹部",
  "內掃-拖教室",
  "內掃-窗戶",
  "內掃-拖走廊",
  "外掃-耙落葉",  /* 11 */
  "內掃-黑板＋講桌整理 <del>不用打掃的幹部</del>",
  "<del>內掃-拖教室</del>",
  "內掃-拖教室",
  "內掃-回收",
  "外掃-掃落葉",  /* 16 */
  "外掃-掃落葉",
  "<del>管打掃的幹部</del> (外掃自動放假)",
  "內掃-掃教室",
  "內掃-回收",
  "外掃-耙落葉",  /* 21 */
  "內掃-回收",
  "內掃-倒垃圾",
  "外掃-掃落葉",
  "內掃-倒廚餘",
  "內掃-回收",  /* 26 */
  "內掃-拖教室 <del>不用打掃的幹部</del>",
  "內掃-掃教室",
  ""
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
    if(jobs[i] && jobs[i] != "無") {
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
      if(!document.getElementById("check_"+i).checked) data.seats.push(i);
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
