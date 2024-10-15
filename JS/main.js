document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("nav button");
    const searchInput = document.querySelector(".input input");
    const searchButton = document.querySelector(".input button");
    const items = document.querySelectorAll(".item");
    const noDataMessage = document.createElement("div");

    // Create a "NO DATA" message element
    noDataMessage.textContent = "NO DATA";
    noDataMessage.classList.add("no-data");
    noDataMessage.style.display = "none"; // Hide initially
    document.querySelector(".items").appendChild(noDataMessage); // Add it to the DOM

    // Set the "ALL" button as active on page load
    buttons[0].classList.add("active");

    // Mapping of categories to item keywords
    const categoryMap = {
        "ALL": [],
        "CPU": ["INTEL", "AMD"],
        "MEMORY": ["HDD", "SSD", "RAM", "M2 NVMe"],
        "MOTHERBOARD": ["GIGABYTE", "MSI", "ASROCK"],
        "OS": ["MICROSOFT WINDOWS", "LINUX", "MAC"],
        "INPUT DEVICES": ["MOUSE", "KEYBOARD", "MICROPHONE"],
        "OUTPUT DEVICES": ["MONITOR", "PRINTERS", "PROJECTOR", "SPEAKER"],
        "SOFTWARE": ["SYSTEM SOFTWARE", "APPLICATION SOFTWARES"],
        "OTHERS": ["PSU", "GRAPHICS CARD", "FLASH DRIVE", "CASING", "DVD", "CPU COOLER", "UPS"]
    };

    // Filter items by category
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active")); // Remove active class from all buttons
            button.classList.add("active"); // Add active class to the clicked button

            const category = button.textContent.toUpperCase();
            filterItems(category);
        });
    });

    // Search functionality
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();
        searchItems(query);
    });

    searchInput.addEventListener("keyup", () => {      
        const query = searchInput.value.toLowerCase().trim();
        searchItems(query);
    });

    // Function to filter items based on category
    function filterItems(category) {
        let visibleItems = 0;
        items.forEach(item => {
            const itemName = item.querySelector("h2").textContent.toUpperCase();
            if (category === "ALL" || categoryMap[category].includes(itemName)) {
                item.style.display = "block";
                visibleItems++;
            } else {
                item.style.display = "none";
            }
        });

        // Show "NO DATA" if no items are visible
        if (visibleItems === 0) {
            noDataMessage.style.display = "block";
        } else {
            noDataMessage.style.display = "none";
        }
    }

    // Function to search items based on input
    function searchItems(query) {
        let visibleItems = 0;
        items.forEach(item => {
            const itemName = item.querySelector("h2").textContent.toLowerCase();
            if (itemName.includes(query)) {
                item.style.display = "block";
                visibleItems++;
            } else {
                item.style.display = "none";
            }
        });

        // Show "NO DATA" if no items are visible
        if (visibleItems === 0) {
            noDataMessage.style.display = "block";
        } else {
            noDataMessage.style.display = "none";
        }
    }
});
