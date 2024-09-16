const purple = document.querySelector('.color.purple');
const pink = document.querySelector('.color.pink');
const red = document.querySelector('.color.red');

setInterval(() => {
    purple.style.animation = 'color 3s ease-in-out infinite';
    red.style.animation = 'color 1.5s ease-in-out infinite';
    pink.style.animation = 'color 2s ease-in-out infinite';
    //     console.log('vl');
    setInterval(() => {
        purple.style.animation = 'color 3s ease-in-out infinite';
        red.style.animation = 'color 1.5s ease-in-out infinite';
        pink.style.animation = 'color 2s ease-in-out infinite';
        //     console.log('vl');

    }, 300);
}, 100);

const buttonOpenChat = document.querySelector('.button-open-chat');
const buttonCloseChat = document.querySelector('.chat-minimize');
const chatBox = document.querySelector('.chat-box');
const chatBoxWrapper = document.querySelector('.chat-box-wrapper');

buttonOpenChat.onclick = function () {
    chatBox.style.display = 'flex';
    chatBoxWrapper.style.animation = 'flyToTopChatBox333 .3s ease-in-out forwards';
    html.style.overflow = 'hidden';
}
buttonCloseChat.onclick = function () {
    chatBoxWrapper.style.animation = 'fadeOutChatBox333 .3s ease-in-out forwards';
    setTimeout(() => {
        chatBox.style.display = 'none';
        html.style.overflow = 'auto';
    }, 300);
}
// buttonOpenChat.onclick = function () {
//     if (chatBox.style.display === 'none' || chatBox.style.display === ''){
//         chatBox.style.display = 'flex';
//         chatBoxWrapper.style.animation = 'flyToTopChatBox .3s ease-in-out forwards';
//         html.style.overflow = 'hidden';
//     } else {
//         chatBox.style.animation = 'fadeOutChatBox .3s ease-in-out forwards';
//         setTimeout(() => {
//             chatBox.style.display = 'none';
//             html.style.overflow = 'auto';
//         }, 300);
//     }
// }
// buttonCloseChat.onclick = function () {
//     if (chatBox.style.display === 'none' || chatBox.style.display === ''){
//         chatBox.style.display = 'flex';
//         // chatBox.style.backgroundColor = '#00000044';
//         html.style.overflow = 'hidden';
//     } else {
//         chatBox.style.animation = 'fadeOutChatBox .3s ease-in-out forwards';
//         setTimeout(() => {
//             chatBox.style.display = 'none';
//             html.style.overflow = 'auto';
//         }, 300);
//     }
// }