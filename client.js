const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const messages = document.querySelector('#messages');

function addMessage(message) {
  const messageItem = document.createElement('li');
  messageItem.textContent = message;
  messages.appendChild(messageItem);
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault(); //화면을 새로고침하는 기본 동작을 막는 코드.

  const message = chatInput.value.trim(); //앞 뒤 여백 지우기.
  if (!message) return; //메세지 작성 안함 => return

  addMessage(message);

  chatInput.value = '';
  chatInput.focus();
});

// ----------Welcome WebSocket World----------

//웹 소켓으로 통신하기 위한 주소. (매개변수로 주소를 넣는다.)
const ws = new WebSocket(`ws://${location.host}`);
// 실제 실행은 위 코드가 함.

// ws.on("open", () => {}); 이렇게 해도 됨. 근데 이렇게 쓰지 않음.
ws.onopen = () => {
  console.log('서버 연결');
};

ws.onclose = () => {
  console.log('서버 연결 해제');
};
