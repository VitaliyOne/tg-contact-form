// скрипты
const url = 'https://api.telegram.org/bot6525982560:AAFDLrlGgnm3_S4tzx3RMYJIOUfg0cHT0OI/sendMessage?chat_id=951317487&text=';

submit.onclick = function(event) {
  check = checkEvaluation(Evaluation.value);
  const api = `Имя: ${UserFirstName.value} ${UserLastName.value} %0AОценка:  ${check} %0AЭлектронная почта: ${UserEmail.value} %0AСообщение: ${encodeURIComponent(Feedback.value)}`;
  fetch(url+api)
  .then(response => responsOut(response.status))
  .catch(err => alert(`Ошибка отправки`))
}

function responsOut(response) {
  const responseNew = response;
  if (responseNew >= 400) {
    console.log('Ошибка отправки')
    return response
  } else {
    console.log('Удачно')
    return response
  }
}

function checkEvaluation (evaluation) {
  switch (evaluation) {
    case '1':
      evaluation = "очень плохо";
      return evaluation;
    case '2':
      evaluation = "плохо";
      return evaluation;
    case '3':
      evaluation = "удовлетворительно";
      return evaluation;
    case '4':
      evaluation = "хорошо";
      return evaluation;
    case '5':
      evaluation = "отлично";
      return evaluation;
  }
}

/*let evaluation = '';
document.getElementById("Evaluation").addEventListener("change", function() {
    evaluation = this.value;
  });/*

 /*let form = {
    name: `${UserFirstName.value} ${UserLastName.value}`,
    email: `${UserEmail.value}`,
    evaluationForm: `${Evaluation.value}`,
    feedback: `${Feedback.value}`
   };*/