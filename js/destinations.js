document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const searchInput = document.getElementById("destinationSearch");
    const searchButton = document.getElementById("searchButton");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const destinationList = document.getElementById("destinationList");
    const resultCount = document.getElementById("resultCount");
    const noResults = document.getElementById("noResults");

    let destinations = [];
    let currentFilter = "all";


    // ==========================================
    // LOAD DESTINATIONS FROM PYTHON BACKEND
    // ==========================================

    function loadDestinations() {

        fetch("http://localhost:5000/api/destinations")

            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Unable to connect to the backend."
                    );
                }

                return response.json();
            })

            .then(data => {

                console.log("Destinations loaded:", data);

                destinations = data;

                displayDestinations(destinations);

            })

            .catch(error => {

                console.error("Backend error:", error);

                destinationList.innerHTML = `
                    <div class="backend-error">
                        <i class="fa-solid fa-triangle-exclamation"></i>

                        <h3>Unable to load destinations</h3>

                        <p>
                            Please make sure the Python backend
                            is running on port 5000.
                        </p>
                    </div>
                `;

            });
    }


    // ==========================================
    // DISPLAY DESTINATIONS
    // ==========================================

    function displayDestinations(data) {

        destinationList.innerHTML = "";

        if (data.length === 0) {

            noResults.style.display = "block";

            resultCount.textContent = "Showing 0 destinations";

            return;
        }

        noResults.style.display = "none";


        data.forEach(destination => {

            const card = document.createElement("article");

            card.className = "destination-item";


            // Convert category array into text
            const categories = Array.isArray(destination.category)
                ? destination.category
                : [destination.category];


            card.dataset.category = categories.join(" ");
            card.dataset.name = destination.name.toLowerCase();


            card.innerHTML = `

                <div
                    class="destination-photo"
                    style="
                        background-image:
                        linear-gradient(
                            transparent,
                            rgba(0,0,0,0.45)
                        ),
                        url('${destination.image}');
                    "
                >

                    <span class="destination-category">
                        ${getMainCategory(categories)}
                    </span>

                    <button
                        class="destination-heart"
                        type="button"
                        aria-label="Add ${destination.name} to favorites"
                    >

                        <i class="fa-regular fa-heart"></i>

                    </button>

                </div>


                <div class="destination-content">

                    <div class="destination-title-row">

                        <div>

                            <h3>
                                ${destination.name}
                            </h3>

                            <div class="destination-location">

                                <i class="fa-solid fa-location-dot"></i>

                                ${destination.country}

                            </div>

                        </div>


                        <div class="destination-rating">

                            ⭐ ${destination.rating}

                        </div>

                    </div>


                    <p class="destination-description">

                        ${destination.description}

                    </p>


                    <div class="destination-meta">

                        ${categories.map(category => `
                            <span class="meta-tag">
                                ${formatCategory(category)}
                            </span>
                        `).join("")}

                    </div>


                    <div class="destination-footer">

                        <div class="budget-info">

                            <span>
                                Average Budget
                            </span>

                            <strong>
                                ${destination.budget}
                            </strong>

                        </div>


                        <a
                            href="destination-details.html?destination=${encodeURIComponent(destination.name)}"
                            class="explore-btn"
                        >
                            Explore
                        </a>

                    </div>

                </div>

            `;


            destinationList.appendChild(card);

        });


        // Update result count
        resultCount.textContent =
            `Showing ${data.length} destination${data.length !== 1 ? "s" : ""}`;


        // Add favorite functionality
        addFavoriteListeners();

    }


    // ==========================================
    // MAIN CATEGORY
    // ==========================================

    function getMainCategory(categories) {

        if (!categories || categories.length === 0) {
            return "Travel";
        }

        return formatCategory(categories[0]);
    }


    // ==========================================
    // FORMAT CATEGORY
    // ==========================================

    function formatCategory(category) {

        if (!category) {
            return "";
        }

        return category.charAt(0).toUpperCase()
            + category.slice(1);

    }


    // ==========================================
    // FILTER DESTINATIONS
    // ==========================================

    function filterDestinations() {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


        const filtered = destinations.filter(destination => {

            const name =
                destination.name.toLowerCase();

            const country =
                destination.country.toLowerCase();

            const description =
                destination.description.toLowerCase();


            const categories =
                Array.isArray(destination.category)
                    ? destination.category
                    : [destination.category];


            const categoryText =
                categories.join(" ").toLowerCase();


            // Search match
            const matchesSearch =
                name.includes(searchText) ||
                country.includes(searchText) ||
                description.includes(searchText) ||
                categoryText.includes(searchText);


            // Category match
            const matchesFilter =
                currentFilter === "all" ||
                categories
                    .map(category => category.toLowerCase())
                    .includes(currentFilter);


            return matchesSearch && matchesFilter;

        });


        displayDestinations(filtered);

    }


    // ==========================================
    // SEARCH BUTTON
    // ==========================================

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            filterDestinations
        );

    }


    // ==========================================
    // SEARCH WHILE TYPING
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterDestinations
        );


        // Allow Enter key
        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    filterDestinations();

                }

            }
        );

    }


    // ==========================================
    // CATEGORY FILTER BUTTONS
    // ==========================================

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                // Remove active from all buttons
                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });


                // Add active to selected button
                button.classList.add("active");


                // Get filter
                currentFilter =
                    button.dataset.filter;


                filterDestinations();

            }
        );

    });


    // ==========================================
    // FAVORITE BUTTONS
    // ==========================================

    function addFavoriteListeners() {

        const heartButtons =
            document.querySelectorAll(
                ".destination-heart"
            );


        heartButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();


                    const icon =
                        button.querySelector("i");


                    if (
                        icon.classList.contains(
                            "fa-regular"
                        )
                    ) {

                        icon.classList.remove(
                            "fa-regular"
                        );

                        icon.classList.add(
                            "fa-solid"
                        );

                        icon.style.color =
                            "#ef4444";


                    } else {

                        icon.classList.remove(
                            "fa-solid"
                        );

                        icon.classList.add(
                            "fa-regular"
                        );

                        icon.style.color = "";

                    }

                }
            );

        });

    }


    // ==========================================
    // LOAD DATA
    // ==========================================

    loadDestinations();

});