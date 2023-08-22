// скрипты
const url = 'https://api.telegram.org/bot6525982560:AAFDLrlGgnm3_S4tzx3RMYJIOUfg0cHT0OI/sendMessage?chat_id=951317487&text=';
const UserFirstName = document.getElementById("UserFirstName");
const UserLastName = document.getElementById("UserLastName");
const UserEmail = document.getElementById("UserEmail");
const Evaluation = document.getElementById("Evaluation");
const Feedback = document.getElementById("Feedback");


let evaluation = '';
document.getElementById("Evaluation").addEventListener("change", function() {
    evaluation = this.value;
    if (evaluation > 3){
        document.getElementById("resultEvaluation").innerHTML = `Спасибо за оценку`;
    } else {
        document.getElementById("resultEvaluation").innerHTML = `Мы станем лучше`;
    }
  });

  let form = {
    name: `${UserFirstName.value} ${UserLastName.value}`,
    email: `${UserEmail.value}`,
    evaluation: `${evaluation}`,
    feedback: `${Feedback.value}`
  };

submit.onclick = function(event) {
    const message = Feedback.value;
    console.log(encodeURIComponent(`${message}`));
}