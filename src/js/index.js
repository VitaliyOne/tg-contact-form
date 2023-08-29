// скрипты
const url = 'https://api.telegram.org/bot6525982560:AAFDLrlGgnm3_S4tzx3RMYJIOUfg0cHT0OI/sendMessage?chat_id=951317487&text=';

submit.onclick = function(event) {
  if ( validateForm()) {
  const check = checkEvaluation(document.querySelector('input[name="rating"]:checked').value);
  let checkNew = '';
  if (check === undefined) { checkNew = 'не выбрана'
  } else {checkNew = check
  }
  const api = `Имя:  ${UserFirstName.value} ${UserLastName.value} %0AОценка:  ${checkNew} %0AЭлектронная почта:  ${UserEmail.value} %0AСообщение:  ${encodeURIComponent(Feedback.value)}`;
  fetch(url+api)
  .then(response => responsOut(response.status))
  .catch(err => alert(`Ошибка отправки`))
  } else {
    return console.log('Форма не отправлена')
  }
}

function responsOut(response) {
  const responseNew = response;
  if (responseNew >= 400) {
    alert('Ошибка на сервере')
    return response
  } else {
    document.getElementById("submit").value = 'Спасибо за обращение!';
    document.getElementById("submit").style.width='220px';
    return response
  }
}

function checkEvaluation (evaluation) {
  switch (evaluation) {
    case '1':
      evaluation = "Очень плохо";
      return evaluation;
    case '2':
      evaluation = "Плохо";
      return evaluation;
    case '3':
      evaluation = "Удовлетворительно";
      return evaluation;
    case '4':
      evaluation = "Хорошо";
      return evaluation;
    case '5':
      evaluation = "Отлично";
      return evaluation;
  }
}
let keyRed = '';
function validateForm (){
  if (`${UserFirstName.value}` ===''||`${UserEmail.value}`==='') {
    if (`${UserFirstName.value}` ===''){
    document.getElementById('UserFirstName').style.cssText = "border-color: rgba(255, 0, 0, .7);";
    }
    if (`${UserEmail.value}`==='')  {
      document.getElementById('UserEmail').style.cssText = "border-color: rgba(255, 0, 0, .7);";
    }
    alert('Заполните обязательные пункты формы')
    keyRed = 'on';
    return false;
  } else {
    return true;
  }
};

document.querySelectorAll(".textInputeFeedback").forEach(elem => elem.addEventListener("keydown",
 () => {
      if (keyRed === 'on') {
        if (`${UserEmail.value}` !== '')  {
        document.getElementById('UserEmail').style.cssText = "border-color: rgba(255, 0, 0, .0);";
        } else if (`${UserFirstName.value}` !== '') {
        document.getElementById('UserFirstName').style.cssText = "border-color: rgba(255, 0, 0, .0);";
        }
      }
  }));