var firebaseConfig = {
    apiKey: "AIzaSyAW060kfFPzaSKzflp9eXesmyn-GMYj-M8",
    authDomain: "hsnu-1481-website.firebaseapp.com",
    databaseURL: "https://hsnu-1481-website.firebaseio.com",
    projectId: "hsnu-1481-website",
    storageBucket: "hsnu-1481-website.appspot.com",
    messagingSenderId: "405025421965",
    appId: "1:405025421965:web:7b6d32809d1eb939",
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
    "",
];

var jobs = [
    "",
    "不用打掃的幹部" /* 1 */,
    "內掃-黑板＋講桌整理",
    "內掃-掃教室",
    "內掃-掃走廊",
    "外掃-耙落葉",
    "內掃-掃具櫃＋置物櫃" /* 6 */,
    "記人的幹部",
    "內掃-拖教室",
    "內掃-窗戶",
    "內掃-拖走廊",
    "外掃-耙落葉" /* 11 */,
    "不用打掃的幹部",
    "內掃-拖教室",
    "內掃-拖教室",
    "內掃-回收",
    "外掃-掃落葉" /* 16 */,
    "外掃-掃落葉",
    "管打掃的幹部",
    "內掃-掃教室",
    "內掃-掃教室",
    "外掃-耙落葉" /* 21 */,
    "內掃-回收",
    "內掃-倒垃圾",
    "外掃-掃落葉",
    "內掃-倒廚餘",
    "內掃-回收" /* 26 */,
    "不用打掃的幹部",
    "內掃-回收",
    "",
];

var app = new Vue({
    el: "#app",
    data() {
        return {
            name: sname,
            job: jobs,
            chair: new Array(sname.length).fill(true),
            work: new Array(sname.length).fill(true),
            comment: "",
        };
    },
    methods: {
        submit_data() {
            let btn = this.$refs.submit;
            btn.disabled = true;
            btn.innerHTML = "傳送中";
            let data = {};
            data.comment = this.comment;
            data.seats = [];
            for (let i = 0; i < this.name.length; i++) if (this.name[i] && !this.chair[i]) data.seats.push(i);

            data.jobs = [];
            for (let i = 0; i < this.job.length; i++)
                if (this.name[i] && this.job[i] != "無" && this.job[i].substring(0, 1) == "內" && !this.work[i])
                    data.jobs.push(i);

            let d = new Date();
            database
                .ref(
                    "CleanChecking/" +
                        d.getFullYear() +
                        "-" +
                        ("" + (d.getMonth() + 1)).padStart(2, "0") +
                        "-" +
                        ("" + d.getDate()).padStart(2, "0") +
                        "-" +
                        Date.now()
                )
                .set(data)
                .then(() => {
                    alert("已記錄!");
                    btn.innerHTML = "完成";
                });
        },
    },
});
