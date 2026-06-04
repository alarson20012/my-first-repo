// Calendar Start
document.addEventListener("DOMContentLoaded", function () {
    // try {
    //     const response = await fetch("/photo-url.json");
    //     const data = await response.json();
    //     document.getElementById("pfp-img").src = data.url;
    // } catch (error) {
    //     console.error("Error fetching profile picture URL:", error);
    // }

    // // Profile Picture
    // const savedImg = localStorage.getItem("profilePicture");
    // if (savedImg) {
    //     document.getElementById("pfp-img").src = savedImg;
    // }


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
            addAvailability.style.display = "block"
            save.style.display = "block";
            loginModal.style.display = "none";
            e.preventDefault();
        } else {
            publicSchedule.style.display = "block";
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
    });


    // uploadBtn.addEventListener("click", function () {
    //     const fileInput = document.getElementById("photoUpload");
    //     const file = fileInput.files && fileInput.files[0];
    //     if (!file) {
    //         alert("Please select an image file.");
    //         return;
    //     }

    //     if (!file.type.startsWith("image/")) {
    //         alert("Please select a valid image file.");
    //         return;
    //     }

    //     const reader = new FileReader();

    //     const formData = new FormData();
    //     formData.append("photo", file);

    //     try {
    //         const response = fetch("/upload-photo", {
    //             method: "POST",
    //             body: formData
    //         })

    //         const data = await response.json();

    //         document.getElementById("pfp-img").src = data.url;
    //     } catch (error) {
    //         console.error("Error uploading photo:", error);
    //     }



    //     reader.onload = function (e) {
    //         const dataUrl = e.target.result;

    //         document.getElementById("pfp-img").src = dataUrl;

    //         // Save to localStorage
    //         localStorage.setItem("profilePicture", dataUrl);

    //         const modal = document.getElementById("editPhotoModal");
    //         modal.style.display = "none";
    //     };

    //     reader.readAsDataURL(file);

    // });


    // public schedule modal
    closePublic.addEventListener("click", () => {
        document.querySelector("#publicSchedule").style.display = "none";
    })

    // inseting availability into calendar
    save.addEventListener("click", function () {
        // FIRST AVAILABILITY
        const startTime = document.getElementById("first-start").value;
        const endTime = document.getElementById("first-end").value;
        const service = document.getElementById("first-service").value;
        document.getElementById("first-avail").textContent = `${startTime} - ${endTime} : ${service}`;

        // SECOND AVAILABILITY
        const secondStartTime = document.getElementById("second-start").value;
        const secondEndTime = document.getElementById("second-end").value;
        const secondService = document.getElementById("second-service").value;
        document.getElementById("second-avail").textContent = `${secondStartTime} - ${secondEndTime} : ${secondService}`;

        // THIRD AVAILABILITY
        const thirdStartTime = document.getElementById("third-start").value;
        const thirdEndTime = document.getElementById("third-end").value;
        const thirdService = document.getElementById("third-service").value;
        document.getElementById("third-avail").textContent = `${thirdStartTime} - ${thirdEndTime} : ${thirdService}`;

        // FOURTH AVAILABILITY
        const fourthStartTime = document.getElementById("fourth-start").value;
        const fourthEndTime = document.getElementById("fourth-end").value;
        const fourthService = document.getElementById("fourth-service").value;
        document.getElementById("fourth-avail").textContent = `${fourthStartTime} - ${fourthEndTime} : ${fourthService}`;

        // FIFTH AVAILABILITY
        const fifthStartTime = document.getElementById("fifth-start").value;
        const fifthEndTime = document.getElementById("fifth-end").value;
        const fifthService = document.getElementById("fifth-service").value;
        document.getElementById("fifth-avail").textContent = `${fifthStartTime} - ${fifthEndTime} : ${fifthService}`;

        // SIXTH AVAILABILITY
        const sixthStartTime = document.getElementById("sixth-start").value;
        const sixthEndTime = document.getElementById("sixth-end").value;
        const sixthService = document.getElementById("sixth-service").value;
        document.getElementById("sixth-avail").textContent = `${sixthStartTime} - ${sixthEndTime} : ${sixthService}`;

        document.getElementById("availabilityModal").style.display = "none";
    });
});


