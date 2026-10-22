document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navigationLinks = document.querySelectorAll(".nav-menu a");

    navigationLinks.forEach(function (link) {
        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage = href
            .split("/")
            .pop()
            .split("#")[0]
            .toLowerCase();

        if (
            linkPage === currentPage &&
            currentPage !== ""
        ) {
            link.classList.add("active");
        }
    });

    document.addEventListener("click", function (event) {
        if (!navMenu || !menuBtn) {
            return;
        }

        if (
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            navMenu.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (
                targetId === "#" ||
                targetId === ""
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    const navbar = document.querySelector(".navbar");

    function handleNavbarScroll() {
        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );

    handleNavbarScroll();

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener(
            "click",
            function () {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }

    const searchInputs =
        document.querySelectorAll(".search-input");

    searchInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            const searchText =
                this.value.trim().toLowerCase();

            const searchCards =
                document.querySelectorAll("[data-search]");

            searchCards.forEach(function (card) {
                const searchableText =
                    card
                        .getAttribute("data-search")
                        .toLowerCase();

                card.style.display =
                    searchableText.includes(searchText)
                        ? ""
                        : "none";
            });
        });
    });

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach(function (button) {
        updateFavoriteButton(button);

        button.addEventListener("click", function () {
            const destination =
                this.dataset.destination;

            if (!destination) {
                return;
            }

            toggleFavorite(destination);
            updateFavoriteButton(this);
        });
    });

    updateLoginUI();

    const logoutButtons =
        document.querySelectorAll(".logout-btn");

    logoutButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            logoutUser();
        });
    });

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent =
            new Date().getFullYear();
    });
});

function saveData(key, value) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;
    } catch (error) {
        console.error(
            "Unable to save data:",
            error
        );

        return false;
    }
}

function getData(key, defaultValue = null) {
    try {
        const data =
            localStorage.getItem(key);

        if (data === null) {
            return defaultValue;
        }

        return JSON.parse(data);
    } catch (error) {
        console.error(
            "Unable to read data:",
            error
        );

        return defaultValue;
    }
}

function removeData(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(
            "Unable to remove data:",
            error
        );

        return false;
    }
}

function getFavorites() {
    return getData(
        "travelAIFavorites",
        []
    );
}

function setFavorites(favorites) {
    saveData(
        "travelAIFavorites",
        favorites
    );
}

function addFavorite(destination) {
    let favorites = getFavorites();

    const exists = favorites.some(function (item) {
        const name =
            typeof item === "string"
                ? item
                : item.name;

        return (
            name &&
            name.toLowerCase() ===
                destination.toLowerCase()
        );
    });

    if (!exists) {
        favorites.push({
            id: Date.now(),
            name: destination
        });

        setFavorites(favorites);
    }

    return favorites;
}

function removeFavorite(destination) {
    let favorites = getFavorites();

    favorites = favorites.filter(function (item) {
        const name =
            typeof item === "string"
                ? item
                : item.name;

        return (
            name &&
            name.toLowerCase() !==
                destination.toLowerCase()
        );
    });

    setFavorites(favorites);

    return favorites;
}

function toggleFavorite(destination) {
    const favorites = getFavorites();

    const exists = favorites.some(function (item) {
        const name =
            typeof item === "string"
                ? item
                : item.name;

        return (
            name &&
            name.toLowerCase() ===
                destination.toLowerCase()
        );
    });

    if (exists) {
        return removeFavorite(destination);
    }

    return addFavorite(destination);
}

function updateFavoriteButton(button) {
    if (!button) {
        return;
    }

    const destination =
        button.dataset.destination;

    if (!destination) {
        return;
    }

    const favorites = getFavorites();

    const exists = favorites.some(function (item) {
        const name =
            typeof item === "string"
                ? item
                : item.name;

        return (
            name &&
            name.toLowerCase() ===
                destination.toLowerCase()
        );
    });

    const icon =
        button.querySelector("i");

    if (exists) {
        button.classList.add("active");

        if (icon) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        }

        button.setAttribute(
            "aria-label",
            "Remove from favorites"
        );
    } else {
        button.classList.remove("active");

        if (icon) {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }

        button.setAttribute(
            "aria-label",
            "Add to favorites"
        );
    }
}

function isLoggedIn() {
    return (
        getData(
            "travelAILoggedIn",
            false
        ) === true
    );
}

function getCurrentUser() {
    return getData(
        "travelAIUser",
        null
    );
}

function setCurrentUser(user) {
    saveData(
        "travelAIUser",
        user
    );
}

function loginUser(user) {
    saveData(
        "travelAIUser",
        user
    );

    saveData(
        "travelAILoggedIn",
        true
    );

    updateLoginUI();
}

function logoutUser() {
    localStorage.removeItem(
        "travelAILoggedIn"
    );

    localStorage.removeItem(
        "travelAIUser"
    );

    window.location.href =
        getPagePath("login.html");
}

function updateLoginUI() {
    const loggedIn = isLoggedIn();
    const user = getCurrentUser();

    const loginButtons =
        document.querySelectorAll(".login-btn");

    const profileButtons =
        document.querySelectorAll(".profile-btn");

    loginButtons.forEach(function (button) {
        button.style.display =
            loggedIn ? "none" : "";
    });

    profileButtons.forEach(function (button) {
        if (loggedIn) {
            button.style.display = "";
        }
    });

    const userNameElements =
        document.querySelectorAll(".user-name");

    userNameElements.forEach(function (element) {
        if (user && user.name) {
            element.textContent = user.name;
        }
    });
}

function getPagePath(page) {
    const currentPath =
        window.location.pathname;

    if (
        currentPath.includes("/pages/")
    ) {
        return page;
    }

    return "pages/" + page;
}

function goToPage(page) {
    window.location.href =
        getPagePath(page);
}

function requireLogin() {
    if (!isLoggedIn()) {
        const currentPage =
            window.location.pathname;

        sessionStorage.setItem(
            "travelAIRedirectAfterLogin",
            currentPage
        );

        window.location.href =
            getPagePath("login.html");

        return false;
    }

    return true;
}

document.addEventListener(
    "click",
    function (event) {
        const button =
            event.target.closest(
                "[data-require-login]"
            );

        if (!button) {
            return;
        }

        if (!requireLogin()) {
            event.preventDefault();
        }
    }
);

function showNotification(
    message,
    type = "success"
) {
    let container =
        document.getElementById(
            "notificationContainer"
        );

    if (!container) {
        container =
            document.createElement("div");

        container.id =
            "notificationContainer";

        container.style.position =
            "fixed";

        container.style.top =
            "85px";

        container.style.right =
            "20px";

        container.style.zIndex =
            "9999";

        container.style.display =
            "flex";

        container.style.flexDirection =
            "column";

        container.style.gap =
            "10px";

        document.body.appendChild(
            container
        );
    }

    const notification =
        document.createElement("div");

    notification.textContent =
        message;

    notification.style.padding =
        "12px 18px";

    notification.style.borderRadius =
        "8px";

    notification.style.color =
        "#ffffff";

    notification.style.fontSize =
        "13px";

    notification.style.fontFamily =
        "Poppins, sans-serif";

    notification.style.boxShadow =
        "0 8px 25px rgba(0,0,0,.15)";

    if (type === "error") {
        notification.style.background =
            "#ef4444";
    } else if (type === "warning") {
        notification.style.background =
            "#f59e0b";
    } else {
        notification.style.background =
            "#2563eb";
    }

    container.appendChild(
        notification
    );

    setTimeout(function () {
        notification.style.opacity =
            "0";

        notification.style.transform =
            "translateX(20px)";

        notification.style.transition =
            "all .3s ease";

        setTimeout(function () {
            notification.remove();
        }, 300);
    }, 2500);
}

function validateForm(form) {
    if (!form) {
        return false;
    }

    const requiredFields =
        form.querySelectorAll("[required]");

    let valid = true;

    requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
            field.classList.add(
                "input-error"
            );

            valid = false;
        } else {
            field.classList.remove(
                "input-error"
            );
        }
    });

    if (!valid) {
        showNotification(
            "Please fill in all required fields.",
            "error"
        );
    }

    return valid;
}

document.addEventListener(
    "click",
    function (event) {
        const toggle =
            event.target.closest(
                ".password-toggle"
            );

        if (!toggle) {
            return;
        }

        const input =
            document.getElementById(
                toggle.dataset.target
            );

        if (!input) {
            return;
        }

        if (input.type === "password") {
            input.type = "text";

            toggle.classList.remove(
                "fa-eye"
            );

            toggle.classList.add(
                "fa-eye-slash"
            );
        } else {
            input.type = "password";

            toggle.classList.remove(
                "fa-eye-slash"
            );

            toggle.classList.add(
                "fa-eye"
            );
        }
    }
);

function savePreferences(preferences) {
    saveData(
        "travelAIPreferences",
        preferences
    );

    showNotification(
        "Your travel preferences have been saved."
    );
}

function getPreferences() {
    return getData(
        "travelAIPreferences",
        {
            travelType: "",
            budget: "",
            duration: "",
            interests: [],
            weather: "",
            accommodation: ""
        }
    );
}

function saveItinerary(itinerary) {
    saveData(
        "travelAIItinerary",
        itinerary
    );

    showNotification(
        "Your itinerary has been saved."
    );
}

function getItinerary() {
    return getData(
        "travelAIItinerary",
        []
    );
}

function saveBudget(budget) {
    saveData(
        "travelAIBudget",
        budget
    );

    showNotification(
        "Your travel budget has been saved."
    );
}

function getBudget() {
    return getData(
        "travelAIBudget",
        null
    );
}

function selectDestination(destination) {
    localStorage.setItem(
        "selectedDestination",
        destination
    );

    goToPage(
        "destination-details.html"
    );
}

function getSelectedDestination() {
    return localStorage.getItem(
        "selectedDestination"
    );
}

function clearSelectedDestination() {
    localStorage.removeItem(
        "selectedDestination"
    );
}

window.addEventListener(
    "resize",
    function () {
        const navMenu =
            document.querySelector(
                ".nav-menu"
            );

        const menuBtn =
            document.getElementById(
                "menuBtn"
            );

        if (
            window.innerWidth > 768 &&
            navMenu
        ) {
            navMenu.classList.remove(
                "active"
            );

            if (menuBtn) {
                const icon =
                    menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );
                }
            }
        }
    }
);