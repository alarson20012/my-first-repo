// Calendar Start
document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("days");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let currentDate = new Date();
    let today = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;

        daysContainer.innerHTML = "";

        // Previous month's dates 
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }

        // current month's dates
        // for (let i = 1; i <= lastDay; i++) {
        //     const dayDiv = document.createElement("div");
        //     dayDiv.textContent = i;
        //     if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        //         dayDiv.classList.add("today");
        //     }
        //     daysContainer.appendChild(dayDiv);
        // }
        // current month's dates
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.style.cursor = "pointer"; // visual feedback

            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add("today");
            }

            // Add click handler
            dayDiv.addEventListener("click", function () {
                openModal(i, month, year);
            });

            daysContainer.appendChild(dayDiv);
        }


        // Next month's dates
        const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i = 1; i <= - nextMonthStartDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }


    }

    const modal = document.getElementById("modal");
    const modalDate = document.getElementById("modal-date");
    const closeModal = document.getElementById("close-modal");

    function openModal(day, month, year) {
        modalDate.textContent = `${months[month]} ${day}, ${year}`;
        modal.classList.remove("hidden");
    }

    closeModal.addEventListener("click", function () {
        modal.classList.add("hidden");
    });

    // Close when clicking outside the modal content
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            modal.classList.add("hidden");
        }
    });


    prevButton.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    })

    nextButton.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    })

    renderCalendar(currentDate);

    // End of Calendar

    document.getElementById("bookBtn").addEventListener("click", function () {
        const calendarDiv = document.querySelectorAll("*.calendarDiv");
        calendarDiv.forEach(div => div.style.display = "block");

    });

    document.getElementById("closeBtn").addEventListener("click", function () {
        document.querySelector(".calendarDiv").style.display = "none";

    });

    // Nav Bar 
    const navBar = document.getElementById("main-nav");
    // navBar.style.classList.add("nav-hidden");

    const menuButton = document.getElementById("menu-button");
    menuButton.addEventListener("click", function () {
        navBar.style.display = navBar.style.display === "block" ? "none" : "block";
    });


    // Login-submit Button
    function loginForm(e) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const message = document.getElementById("message");
        if (username === "admin" && password === "password") {
            message.textContent = "Login successful!";
            message.style.color = "green";
            editPhotoBtn.style.display = "block";
            addAvailability.style.display = "block";
            loginModal.style.display = "none";
            e.preventDefault();
        } else {

            message.textContent = "Invalid username or password.";
            message.style.color = "red";
            e.preventDefault();
        }

    }

    loginModal.addEventListener("submit", loginForm);

    // Cancel button
    document.getElementById("closeLogin").addEventListener("click", function () {
        document.querySelector("#loginModal").style.display = "none";
    });

    addAvailability.addEventListener("click", function () {
        document.querySelector("#availabilityModal").style.display = "block";
    });

    // Edit Photo Button
    editPhotoBtn.addEventListener("click", function () {
        document.querySelector("#editPhotoModal").style.display = "block";
    })

    uploadBtn.addEventListener("click", function () {
        const fileInput = document.getElementById("photoUpload");
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("pfp-img").src = e.target.result;
                document.querySelector("#editPhotoModal").style.display = "none";
            }
            reader.readAsDataURL(file);
        }


    });
});
