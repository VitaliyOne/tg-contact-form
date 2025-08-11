// js scripts
const telegramApiUrl = 'https://api.telegram.org/';
const LOCAL_BOT_TOKEN_KEY = 'localBotToken';
const LOCAL_BOT_CHAT_ID_KEY = 'localBotChatId';
let isBotFormInValid = false;
let isFormInValid = false;

const getBotToken = () => {
  return localStorage.getItem(LOCAL_BOT_TOKEN_KEY);
}

const setBotToken = (value) => {
  localStorage.setItem(LOCAL_BOT_TOKEN_KEY, value);
}

const getBotChatId = () => {
  return localStorage.getItem(LOCAL_BOT_CHAT_ID_KEY);
}

const setBotChatId = (value) => {
  localStorage.setItem(LOCAL_BOT_CHAT_ID_KEY, value);
}

window.onload = function(){
  const botToken = getBotToken();
  const botChatId = getBotChatId();
  if (botToken && botChatId) {
    const tokenInput = document.getElementById("token");
    if (tokenInput) {
      tokenInput.value = `${botToken}`;
    }
    const chaIdInput = document.getElementById("chatId")
    if (chaIdInput) {
      chaIdInput.value = `${botChatId}`;
    }
    showFeedBackForm();
  }
}

submit.onclick = function(event) {
  if ( validateForm()) {
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    const ratingText = getRatingText((ratingInput || {}).value);
    const userFirstNameInput = document.getElementById("userFirstName");
    const userFirstNameText = (userFirstNameInput || {}).value;
    const userLastNameIput = document.getElementById("userLastName");
    const userLastNameText = (userLastNameIput || {}).value;
    const userEmailImput = document.getElementById("userEmail");
    const userEmailText = (userEmailImput || {}).value;
    const messageInput = document.getElementById("message");
    const messageText = (messageInput|| {}).value;
    const botToken = getBotToken();
    const botChatId = getBotChatId();
    const getFeedbackFormMessage = `Имя:  ${userFirstNameText} ${userLastNameText} %0AОценка:  ${ratingText} %0AЭлектронная почта:  ${userEmailText} %0AСообщение:  ${encodeURIComponent(messageText)}`;
    fetch(telegramApiUrl+botToken+'/sendMessage?chat_id='+botChatId+`&text=`+getFeedbackFormMessage)
    .then(response => {
      if (response.status >= 400) {
        alert('Ошибка на сервере')
      } else {
        const submitButton = document.getElementById("submit")
        if (submitButton) {
          submitButton.value = 'Спасибо за обращение!';
          submitButton.style.width='220px';
        }
      }
    })
    .catch(err => alert(`Ошибка отправки`));
  }
}

saveBotDataButton.onclick = function(event) {
  if (validateBotForm()){
  saveBotData();
  showFeedBackForm();
  }
}

function saveBotData () {
  const tokenInput = document.getElementById("token");
  const chaIdInput = document.getElementById("chatId")
  if (tokenInput && chaIdInput){
    setBotToken(`${token.value}`);
    setBotChatId(`${chatId.value}`);
  }
} 

function getRatingText (evaluation) {
  switch (evaluation) {
    case '1':
      return "Очень плохо";
    case '2':
      return "Плохо";
    case '3':
      return "Удовлетворительно";
    case '4':
      return "Хорошо";
    case '5':
      return "Отлично";
    default : 
      return 'не выбрана';
  }
}

function validateBotForm () {
  const tokenInput = document.getElementById('token')
  const chatIdInput = document.getElementById('chatId')
  if ((tokenInput && !tokenInput.value) || (chatIdInput && !chatIdInput.value)) {
    changingColorBotForm (tokenInput, chatIdInput)
    isBotFormInValid = true;
    return false
  } else {
    return true
  }
}

function changingColorBotForm (tokenInput, chatIdInput) {
  if (!tokenInput.value) {
    tokenInput.style.cssText = "border-color: rgba(255, 0, 0, .7)";
  }
  if (!chatIdInput.value) {
      chatIdInput.style.cssText = "border-color: rgba(255, 0, 0, .7)";
  }
}
   
document.querySelectorAll(".inputDataEntryField").forEach(elem => elem.addEventListener("keydown",
 () => {
      if (isBotFormInValid) {
        const tokenInput = document.getElementById('token');
        const chatIdInput =  document.getElementById('chatId');
        if (tokenInput && tokenInput.value) {
          tokenInput.style.cssText = "border-color: #6d6c6c2a;;";
        }
        if (chatIdInput && chatIdInput.value) {
          chatIdInput.style.cssText = "border-color: #6d6c6c2a;;";
        }
      }
  }));

function validateForm (){
  const userFirstNameInput = document.getElementById("userFirstName");
  const userEmailImput = document.getElementById("userEmail");
  if ((userFirstNameInput && !userFirstNameInput.value)|| (userEmailImput && !userEmailImput.value)) {
     changingColorForm (userFirstNameInput, userEmailImput);
     isFormInValid = true;
     return false
   } else {
     return true
  } 
};

function changingColorForm (userFirstNameInput, userEmailImput) {
  if (!userFirstNameInput.value) {
    userFirstNameInput.style.cssText = "border-color: rgba(255, 0, 0, .7)";
    }
  if (!userEmailImput.value) {
    userEmailImput.style.cssText = "border-color: rgba(255, 0, 0, .7);";
  }
}

document.querySelectorAll(".inputDataEntryField").forEach(elem => elem.addEventListener("keydown",
 () => {
      if (isFormInValid) {
        const userEmailInput = document.getElementById('userEmail');
        const userFirstNameInput =  document.getElementById('userFirstName');
        if (userEmailInput && userEmailInput.value) {
          userEmailInput.style.cssText = "border-color: #6d6c6c2a;";
        }
        if (userFirstNameInput && userFirstNameInput.value) {
          userFirstNameInput.style.cssText = "border-color: #6d6c6c2a;;";
        }
      }
  }));
 
  function showFeedBackForm () {
    const hideFeedbackForm = document.getElementById('hideFeedbackForm');
    if (hideFeedbackForm) {
    hideFeedbackForm.classList.add('open');
    hideFeedbackForm.style.opacity='1';
    }
  }