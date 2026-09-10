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
