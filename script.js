function showTab(tabName, button) {

    // Hide all tabs
    const tabs = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });


    // Remove active state from navigation
    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });


    // Show selected tab
    document.getElementById(tabName)
        .classList.add("active");


    // Highlight selected button
    button.classList.add("active");
}


/* Upload */

document
    .getElementById("uploadForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const fileInput =
            document.getElementById("fileInput");

        const message =
            document.getElementById("uploadMessage");

        if (!fileInput.files.length) {
            message.textContent = "Please select a file.";
            return;
        }

        const formData = new FormData();

        formData.append(
            "file",
            fileInput.files[0]
        );


        try {

            const response = await fetch(
                "/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            message.textContent = data.message;

        } catch (error) {

            message.textContent =
                "Upload failed.";

            console.error(error);
        }
    });


/* Scan */

async function startScan() {

    const message =
        document.getElementById("scanMessage");

    message.textContent =
        "Starting scan...";


    try {

        const response = await fetch(
            "/scan",
            {
                method: "POST"
            }
        );

        const data = await response.json();

        message.textContent =
            data.message;

    } catch (error) {

        message.textContent =
            "Scan failed.";

        console.error(error);
    }
}


/* Report */

async function loadReport() {

    try {

        const response =
            await fetch("/report");

        const data =
            await response.json();

        const report =
            data.report;

        document.getElementById(
            "reportStatus"
        ).textContent = report.status;

        document.getElementById(
            "filesScanned"
        ).textContent = report.files_scanned;

        document.getElementById(
            "findings"
        ).textContent = report.findings;

    } catch (error) {

        console.error(error);
    }
}
