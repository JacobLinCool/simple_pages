// Copyright JacobLinCool

window.addEventListener("load", async () => {
    await setUpFirebase();
    window.user = new user();
    await buildPage("https://jacoblincool.github.io/simple_pages/SGCP/pages.json");
    await user.after(main);
});

function main() {
    if(user.getState().login) {
        switcher.go("home");
    }
    else {
        switcher.go("login");
    }
}

async function setUpFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyCh9WtwVuFPRyFBL5pMIyq6EBbh_dpZpHA",
        authDomain: "sgcp-1481.firebaseapp.com",
        databaseURL: "https://sgcp-1481.firebaseio.com",
        projectId: "sgcp-1481",
        storageBucket: "sgcp-1481.appspot.com",
        messagingSenderId: "953647653854",
        appId: "1:953647653854:web:592b0980ac301e8177b34f",
        measurementId: "G-K1J2D8Y50V"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    window.database = firebase.database();
    return 1;
}

function user() {
    this.state = { login: false };
    firebase.auth().useDeviceLanguage();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.state.login = true;
            this.state.name = user.displayName;
            this.state.email = user.email;
            this.state.verified = user.emailVerified;
            this.state.photo = user.photoURL;
            this.state.anonymous = user.isAnonymous;
            this.state.uid = user.uid;
            this.state.provider = user.providerData;
        } else {
            this.state = { login: false };
        }
        this.afterChanged();
    });
    this.getState = async function() {
        return this.state;
    };
    this.afterChanged = function() {
        safeLog("[User] User State Changed.", this.state);
    };
    this.after = async function(after) {
        this.afterChanged = after;
        return true;
    };
    this.create = async function(data) {
        return firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(() => {
            safeLog("[User] Account Created.", this.state);
        }).catch(e => {
            safeLog("[User] Error.", e);
        });
    };
    this.logIn = async function(data) {
        return firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(() => {
            safeLog("[User] Logged In.", this.state);
        }).catch(e => {
            safeLog("[User] Error.", e);
        });
    };
    this.logOut = async function() {
        return firebase.auth().signOut().then(() => {
            safeLog("[User] Logged Out.", this.state);
        }).catch(e => {
            safeLog("[User] Error.", e);
        });
    };
    this.googleLogin = async function() {
        var google = new firebase.auth.GoogleAuthProvider();
        google.addScope("https://www.googleapis.com/auth/contacts.readonly");
        google.setCustomParameters({
            "login_hint": "user@example.com"
        });
        return firebase.auth().signInWithPopup(google).then(result => {
            safeLog("[User] Logged In.", this.state);
        }).catch(e => {
            safeLog("[User] Error.", e);
        });
    };

}

async function safeLog(msg=null, data=null) {
    try {
        if(data) {
            console.log(msg, data);
            return true;
        }
        else {
            console.log(msg);
            return true;
        }
    }
    catch(e) {
        console.error("[Safe Log]: Error.", e);
        return false;
    }
}

async function buildPage(pageURL="pages") {
    pages = await fetch(pageURL).then(r => r.json()).catch(e => {
        safeLog("[Page Builder] Error.", e);
    });
    var pageList = [];
    var loader = [];
    var lindex = [];
    pages.forEach(page => {
        let pageContainers = document.getElementById("pageContainers");
        let navbar = document.getElementById("navbar").children[0];
        let pageContainer = document.createElement("div");
        let btnWrap = document.createElement("li");
        let btn = document.createElement("a");
        pageContainer.classList.add("page", "hide");
        btnWrap.classList.add("nav-item")
        btn.classList.add("nav-link");

        loader.push(fetch(page.url).then(r=>r.text()));
        lindex.push(pageContainer);

        btnWrap.appendChild(btn);
        navbar.appendChild(btnWrap);
        pageContainers.appendChild(pageContainer);
        btn.innerHTML = page.settings.name;

        pageList.push({settings: page.settings, trigger: btnWrap, target: pageContainer});
    });

    await Promise.all(loader).then(loaded => {
        for(let i = 0; i < loaded.length; i++) {
            lindex[i].innerHTML = loaded[i];
        }
    });

    window.switcher = new pageSwitcher(pageList);

    return true;
}

function pageSwitcher(list) {
    this.list = list;
    this.go = function(page) {
        this.list.forEach(p => {
            if(p.settings.name == page) {
                p.trigger.classList.add("active");
                p.target.classList.remove("hide");
            }
            else {
                p.trigger.classList.remove("active");
                p.target.classList.add("hide");
            }
        });
    };
    this.list.forEach(p => {
        p.trigger.addEventListener("click", () => {
            this.go(p.settings.name);
        });
    });
}
