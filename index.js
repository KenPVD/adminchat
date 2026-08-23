<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>XGAME Admin Chat</title>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background: #111;
    height: 100vh;
    overflow: hidden;
}

/* =========================
   CHAT APP
========================= */

.chat-app {
    width: 100%;
    max-width: 500px;
    height: 100vh;
    margin: auto;
    background: #18191a;
    display: flex;
    flex-direction: column;
    color: white;
}

/* =========================
   HEADER
========================= */

.header {
    height: 66px;
    flex-shrink: 0;
    background: #242526;
    border-bottom: 1px solid #3a3b3c;

    display: flex;
    align-items: center;

    padding: 8px 12px;
}

.avatar {
    width: 42px;
    height: 42px;

    border-radius: 50%;

    background: #6b7075;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 20px;
    font-weight: bold;

    margin-right: 10px;
}

.user-info {
    flex: 1;
}

.user-name {
    font-size: 15px;
    font-weight: bold;
}

.status {
    font-size: 12px;
    color: #b0b3b8;

    margin-top: 2px;
}

.status::before {
    content: "";
    width: 7px;
    height: 7px;

    display: inline-block;

    border-radius: 50%;
    background: #31a24c;

    margin-right: 4px;
}

/* buttons */

.header-btn {
    width: 38px;
    height: 38px;

    border: none;
    background: transparent;

    color: #168aff;

    font-size: 20px;

    cursor: pointer;
}

.header-btn:hover {
    background: #303133;
    border-radius: 50%;
}

/* =========================
   CHAT
========================= */

.messages {
    flex: 1;

    overflow-y: auto;

    padding: 15px 12px;

    display: flex;
    flex-direction: column;

    gap: 7px;
}

.messages::-webkit-scrollbar {
    width: 5px;
}

.messages::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 10px;
}

/* =========================
   MESSAGE
========================= */

.message {
    max-width: 75%;

    padding: 9px 13px;

    border-radius: 16px;

    font-size: 14px;

    line-height: 1.4;

    word-wrap: break-word;
}

.message.user {
    align-self: flex-start;

    background: #3a3b3c;

    border-bottom-left-radius: 5px;
}

.message.admin {
    align-self: flex-end;

    background: #0084ff;

    border-bottom-right-radius: 5px;
}

/* =========================
   EMPTY
========================= */

.empty {
    margin: auto;

    color: #777;

    font-size: 14px;
}

/* =========================
   INPUT AREA
========================= */

.input-area {
    min-height: 60px;

    background: #242526;

    border-top: 1px solid #3a3b3c;

    display: flex;

    align-items: center;

    padding: 8px;
}

.tool {
    width: 38px;
    height: 38px;

    border: none;

    background: transparent;

    color: #aaa;

    font-size: 20px;

    cursor: pointer;
}

.tool:hover {
    color: #168aff;
}

.input {
    flex: 1;

    height: 38px;

    border: none;

    outline: none;

    background: #3a3b3c;

    color: white;

    border-radius: 20px;

    padding: 0 14px;

    font-size: 14px;
}

.input::placeholder {
    color: #aaa;
}

.send {
    width: 40px;
    height: 40px;

    border: none;

    background: transparent;

    color: #168aff;

    font-size: 22px;

    cursor: pointer;
}

.send:hover {
    transform: scale(1.1);
}

/* =========================
   ADMIN MENU
========================= */

.menu {
    position: fixed;

    top: 65px;
    right: calc(50% - 240px);

    width: 210px;

    background: #242526;

    border: 1px solid #444;

    border-radius: 10px;

    box-shadow: 0 5px 20px #000;

    display: none;

    z-index: 100;
}

.menu.show {
    display: block;
}

.menu button {
    width: 100%;

    padding: 13px;

    border: none;

    background: transparent;

    color: white;

    text-align: left;

    cursor: pointer;

    font-size: 14px;
}

.menu button:hover {
    background: #3a3b3c;
}

.menu .danger {
    color: #ff4d4d;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

    .chat-app {
        max-width: none;
        width: 100%;
    }

    .menu {
        right: 10px;
    }

    .message {
        max-width: 82%;
    }

    .header {
        height: 62px;
    }

    .input-area {
        padding-bottom: max(8px, env(safe-area-inset-bottom));
    }
}
</style>
</head>

<body>

<div class="chat-app">

    <!-- HEADER -->
    <div class="header">

        <div class="avatar">
            X
        </div>

        <div class="user-info">

            <div class="user-name">
                Xgame
            </div>

            <div class="status">
                Đang hoạt động
            </div>

        </div>

        <button class="header-btn">
            ☎
        </button>

        <button class="header-btn">
            ▬
        </button>

        <button
            class="header-btn"
            onclick="toggleMenu()">
            ⋯
        </button>

    </div>


    <!-- MESSAGES -->
    <div
        id="messages"
        class="messages">

        <div class="empty">
            Đang tải tin nhắn...
        </div>

    </div>


    <!-- INPUT -->
    <div class="input-area">

        <button class="tool">
            🎤
        </button>

        <button class="tool">
            🖼️
        </button>

        <input
            id="messageInput"
            class="input"
            type="text"
            placeholder="Aa"
            autocomplete="off"
        >

        <button
            class="tool"
            onclick="sendEmoji()">
            😊
        </button>

        <button
            class="send"
            onclick="sendMessage()">
            ➤
        </button>

    </div>

</div>


<!-- MENU -->

<div
    id="menu"
    class="menu">

    <button onclick="closeMenu()">
        ⚙️ Cài đặt
    </button>

    <button
        class="danger"
        onclick="deleteAllMessages()">

        🗑️ Xóa tất cả tin nhắn

    </button>

</div>


<script type="module">

/* =====================================================
   FIREBASE
===================================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


/* =====================================================
   FIREBASE CONFIG
===================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyDcOZNhCEnL2izlTpe4Nxy4Jwtf7YNx89k",

    authDomain:
        "xgame-7ff37.firebaseapp.com",

    projectId:
        "xgame-7ff37",

    storageBucket:
        "xgame-7ff37.firebasestorage.app",

    messagingSenderId:
        "204757980002",

    appId:
        "1:204757980002:web:acdccd4c02be7be378923b"

};


const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);


/* =====================================================
   COLLECTION
===================================================== */

const messagesRef =
    collection(db, "messages");


/* =====================================================
   LOAD REALTIME MESSAGES
===================================================== */

const messagesBox =
    document.getElementById("messages");


const q = query(
    messagesRef,
    orderBy("time", "asc")
);


onSnapshot(q, (snapshot) => {

    messagesBox.innerHTML = "";

    if (snapshot.empty) {

        messagesBox.innerHTML = `
            <div class="empty">
                Chưa có tin nhắn
            </div>
        `;

        return;
    }


    snapshot.forEach((item) => {

        const data =
            item.data();


        const message =
            document.createElement("div");


        message.className =
            "message " +
            (
                data.type === "admin"
                    ? "admin"
                    : "user"
            );


        message.textContent =
            data.text || "";


        messagesBox.appendChild(message);

    });


    scrollBottom();

});


/* =====================================================
   SEND MESSAGE
===================================================== */

window.sendMessage = async function () {

    const input =
        document.getElementById(
            "messageInput"
        );


    const text =
        input.value.trim();


    if (!text)
        return;


    try {

        await addDoc(
            messagesRef,
            {

                text: text,

                type: "admin",

                time: serverTimestamp()

            }
        );


        input.value = "";

        input.focus();


    } catch (error) {

        console.error(error);

        alert(
            "Không gửi được tin nhắn!"
        );

    }

};


/* =====================================================
   ENTER TO SEND
===================================================== */

document
    .getElementById("messageInput")
    .addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


/* =====================================================
   EMOJI
===================================================== */

window.sendEmoji = function () {

    const input =
        document.getElementById(
            "messageInput"
        );

    input.value += " 😊";

    input.focus();

};


/* =====================================================
   SCROLL
===================================================== */

function scrollBottom() {

    setTimeout(() => {

        messagesBox.scrollTop =
            messagesBox.scrollHeight;

    }, 50);

}


/* =====================================================
   MENU
===================================================== */

window.toggleMenu = function () {

    document
        .getElementById("menu")
        .classList.toggle("show");

};


window.closeMenu = function () {

    document
        .getElementById("menu")
        .classList.remove("show");

};


/* =====================================================
   DELETE ALL
===================================================== */

window.deleteAllMessages = async function () {

    closeMenu();


    const confirmDelete =
        confirm(
            "Bạn có chắc muốn XÓA TẤT CẢ tin nhắn không?"
        );


    if (!confirmDelete)
        return;


    try {

        const snapshot =
            await getDocs(
                messagesRef
            );


        for (
            const item
            of snapshot.docs
        ) {

            await deleteDoc(
                doc(
                    db,
                    "messages",
                    item.id
                )
            );

        }


        alert(
            "Đã xóa tất cả tin nhắn!"
        );


    } catch (error) {

        console.error(error);

        alert(
            "Không thể xóa tin nhắn!"
        );

    }

};


/* =====================================================
   CLICK OUTSIDE MENU
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const menu =
            document.getElementById(
                "menu"
            );


        const button =
            event.target.closest(
                ".header-btn"
            );


        if (
            !menu.contains(event.target) &&
            !button
        ) {

            menu.classList.remove(
                "show"
            );

        }

    }
);

</script>

</body>
</html>
