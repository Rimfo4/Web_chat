const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const messages = document.querySelector('#messages');

function addMessage(senderNinkname, message) {
  const messageItem = document.createElement('li');
  if (senderNinkname === nickname) {
    messageItem.classList.add('mine');
  }
  const name = document.createElement('div');
  name.textContent = `${senderNinkname}:  `;
  name.classList.add('nickname');
  messageItem.appendChild(name);

  const msg = document.createElement('div');
  msg.textContent = `${message}`;
  messageItem.appendChild(msg);

  // messageItem.textContent = `${senderNinkname}: ${message}`; //<li>닉네임 : 메세지</li>
  messages.appendChild(messageItem);
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault(); //화면을 새로고침하는 기본 동작을 막는 코드.

  const message = chatInput.value.trim(); //앞 뒤 여백 지우기.
  if (!message) return; //메세지 작성 안함 => return

  // ws.send(message); //서버로 message 타입 데이터를 보내기
  ws.send(JSON.stringify({ type: 'chat', text: message }));
  // addMessage(message);

  chatInput.value = '';
  chatInput.focus();
});

// ----------Welcome WebSocket World----------

//웹 소켓으로 통신하기 위한 주소. (매개변수로 주소를 넣는다.)
const ws = new WebSocket(`ws://${location.host}`);
// 실제 실행은 위 코드가 함.

const nickname = prompt('당신의 닉네임을 입력하세요.').trim() || '익명';

// ws.on("open", () => {}); 이렇게 해도 됨. 근데 이렇게 쓰지 않음.
ws.onopen = () => {
  console.log('서버 연결');
  ws.send(JSON.stringify({ type: 'join', text: nickname })); //server에 ninkname 전송.
};
//server랑 send하면 아래 코드 실행됨.
ws.onmessage = (event) => {
  //string -> json
  const data = event.data;
  const json = JSON.parse(data);

  //type: chat -> 채팅창에 대화로 추가(li)
  switch (json.type) {
    case 'chat':
      console.log(json.text);
      console.log(json.nickname);
      addMessage(json.nickname, json.text);
      break;
  }
};
ws.onclose = () => {
  console.log('서버 연결 해제');
};
