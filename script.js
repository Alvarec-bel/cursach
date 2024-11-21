
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#recordsTable tbody");
    const form = document.getElementById("recordForm");
    const submitButton = form.querySelector("button");

    // Load records from localStorage
    const loadRecords = () => {
        const records = JSON.parse(localStorage.getItem("records")) || [];
        tableBody.innerHTML = "";
        records.forEach((record, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${record.name}</td>
                <td>${record.city}</td>
                <td>${record.vlk}</td>
                <td>
                    <button class="edit-button" onclick="editRecord(${index})">Редагувати</button>
                    <button class="delete-button" onclick="deleteRecord(${index})">Видалити</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    // Save records to localStorage
    const saveRecords = (records) => {
        localStorage.setItem("records", JSON.stringify(records));
        loadRecords();
    };

    // Add or update record
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const records = JSON.parse(localStorage.getItem("records")) || [];
        const newRecord = {
            name: document.getElementById("recordName").value,
            city: document.getElementById("recordCity").value,
            vlk: document.getElementById("recordVLK").value,
        };
        const editingIndex = form.dataset.editingIndex;
        if (editingIndex !== undefined) {
            records[editingIndex] = newRecord;
            delete form.dataset.editingIndex;
            submitButton.textContent = "Додати";
        } else {
            records.push(newRecord);
        }
        saveRecords(records);
        form.reset();
    });

    // Edit record
    window.editRecord = (index) => {
        const records = JSON.parse(localStorage.getItem("records"));
        const record = records[index];
        document.getElementById("recordName").value = record.name;
        document.getElementById("recordCity").value = record.city;
        document.getElementById("recordVLK").value = record.vlk;
        form.dataset.editingIndex = index;
        submitButton.textContent = "Редагувати";
    };

    // Delete record
    window.deleteRecord = (index) => {
        const records = JSON.parse(localStorage.getItem("records"));
        records.splice(index, 1);
        saveRecords(records);
    };

    loadRecords();
});
