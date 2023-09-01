// скрипты
//const botToken = 'bot6525982560:AAFDLrlGgnm3_S4tzx3RMYJIOUfg0cHT0OI';
//const botChatId = '951317487';
const telegramApiUrl = 'https://api.telegram.org/';
let botToken = localStorage.getItem('localBotToken');
let botChatId = localStorage.getItem('localBotChatId');
let isBotFormInValid = false;
let isFormInValid = false;

window.onload = function(){
  if (botToken && botChatId) {
    const tokenInput = document.getElementById("token");
    if (tokenInput) {
      tokenInput.value = `${botToken}`;
    }
    const chaIdInput = document.getElementById("chatId")
    if (chaIdInput) {
      chaIdInput.value = `${botChatId}`;
    }
    hideBotDataForm();
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
  hideBotDataForm();
  showFeedBackForm();
  }
}

function saveBotData () {
    localStorage.setItem('localBotToken', `${token.value}`);
    localStorage.setItem('localBotChatId', `${chatId.value}`);
}

botDataFormTitle.onclick = function(event){
    const formCollapse = document.getElementById('formCollapse')
    if (formCollapse) {
      formCollapse.style.display='block';
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
    default : //если попадает что-то лишнее
      return 'не выбрана';
  }
}

function validateBotForm () {//разбить на функции валидации, подкраски, алерт
  const tokenInput = document.getElementById('token')
  const chatIdInput = document.getElementById('chatId')
  if (tokenInput || chatIdInput) {
    changingColorBotForm ()
    return alertFillBotForm ()
  }
}

function changingColorBotForm () {
  const tokenInput = document.getElementById('token')
  const chatIdInput = document.getElementById('chatId')
  if (tokenInput.value === '') {
    tokenInput.style.cssText = "border-color: rgba(255, 0, 0, .7)";
  }
  if (chatIdInput.value === '') {
      chatIdInput.style.cssText = "border-color: rgba(255, 0, 0, .7)";
  }
}

function alertFillBotForm (){
  const tokenInput = document.getElementById('token')
  const chatIdInput = document.getElementById('chatId')
  if (tokenInput.value === '' || chatIdInput.value === '') {
    alert('Заполните обязательные поля формы')
    isBotFormInValid = true;
    return false
  } else {
    return true
  }
}
   
document.querySelectorAll(".inputeDataEntryField").forEach(elem => elem.addEventListener("keydown",
 () => {
      if (isBotFormInValid) {
        const tokenInput = document.getElementById('token');
        if (tokenInput && tokenInput.value !== '') {
          tokenInput.style.cssText = "border-color: rgba(255, 0, 0, .0);";
        }
        const chatIdInput =  document.getElementById('chatId');
        if (chatIdInput && chatIdInput.value !== '') {
          chatIdInput.style.cssText = "border-color: rgba(255, 0, 0, .0);";
        }
      }
  }));

function validateForm (){
    const userFirstNameInput = document.getElementById("userFirstName");
    const userEmailImput = document.getElementById("userEmail");
    if (userFirstNameInput || userEmailImput) {
      changingColorForm ();
      return alertFillForm ();
    } 
};

function changingColorForm () {
  const userFirstNameInput = document.getElementById("userFirstName");
  const userEmailImput = document.getElementById("userEmail");
  if (userFirstNameInput.value === '') {
    userFirstNameInput.style.cssText = "border-color: rgba(255, 0, 0, .7)";
    }
if (userEmailImput.value === '') {
    userEmailImput.style.cssText = "border-color: rgba(255, 0, 0, .7);";
  }
}

function alertFillForm (){
  const userFirstNameInput = document.getElementById("userFirstName");
  const userEmailImput = document.getElementById("userEmail");
  if (userFirstNameInput.value === '' || userEmailImput.value === '') {
    alert('Заполните обязательные поля формы') 
    isFormInValid = true;
    return false
  } else {
    return true
  }
}


document.querySelectorAll(".textInputeFeedback").forEach(elem => elem.addEventListener("keydown",
 () => {
      if (isFormInValid) {
        const userEmailInput = document.getElementById('userEmail');
        const userFirstNameInput =  document.getElementById('userFirstName');
        if (userEmailInput && userEmailInput.value !== '') {
          userEmailInput.style.cssText = "border-color: rgba(255, 0, 0, .0);";
        }
        if (userFirstNameInput &&  userFirstNameInput.value !== '') {
          userFirstNameInput.style.cssText = "border-color: rgba(255, 0, 0, .0);";
        }
      }
  }));

  function hideBotDataForm () {
    const formCollapse = document.getElementById('formCollapse')
    if (formCollapse) {
      formCollapse.style.display='none';
    }
  }
  
  function showFeedBackForm () {
    const hideFeedbackForm = document.getElementById('hideFeedbackForm')
    if (hideFeedbackForm) {
    hideFeedbackForm.classList.add('open');
    hideFeedbackForm.style.opacity='1';
    }
  }