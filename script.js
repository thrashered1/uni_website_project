function validateForm(event) {
    event.preventDefault();

    // Вземане на стойностите от полетата
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Нулиране на съобщенията за грешка
    document.getElementById("first-name-error").textContent = "";
    document.getElementById("last-name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("date-error").textContent = "";
    document.getElementById("time-error").textContent = "";

    let hasError = false;

    // Валидация на име
    if (firstName.length < 2) {
        document.getElementById("first-name-error").textContent = "Името трябва да бъде поне 2 символа!";
        hasError = true;
    }

    // Валидация на фамилия
    if (lastName.length < 2) {
        document.getElementById("last-name-error").textContent = "Фамилията трябва да бъде поне 2 символа!";
        hasError = true;
    }

    // Валидация на имейл
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Моля, въведете валиден имейл адрес!";
        hasError = true;
    }

    // Валидация на парола
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("password-error").textContent = "Паролата трябва да съдържа поне 8 символа, големи и малки букви, число и специален символ!";
        hasError = true;
    }

    // Валидация на дата
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
        document.getElementById("date-error").textContent = "Моля, изберете дата, която е днес или в бъдещето!";
        hasError = true;
    }

    // Валидация на ден от седмицата и часове
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) {
        document.getElementById("date-error").textContent = "Сервизът е затворен в неделя!";
        hasError = true;
    }

    const availableHours = {
        weekdays: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"],
        saturday: ["10:00", "11:00", "12:00", "13:00"]
    };

    const validHours = (dayOfWeek === 6) ? availableHours.saturday : availableHours.weekdays;
    if (!validHours.includes(time)) {
        document.getElementById("time-error").textContent = "Избраният час не е наличен за този ден!";
        hasError = true;
    }

    if (hasError) {
        return false;
    }

    // Показване на модален прозорец
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    modalMessage.innerHTML = `Име: ${firstName} ${lastName}<br>Имейл: ${email}<br>Дата: ${date}<br>Час: ${time}`;
    modal.style.display = "block";

    // Затваряне на модалния прозорец
    const closeBtn = document.querySelector(".close");
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    return true;
}