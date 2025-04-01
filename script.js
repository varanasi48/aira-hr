async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const responseBox = document.getElementById("response-box");

    if (!userInput) {
        responseBox.innerHTML = "Please enter a message.";
        return;
    }

    responseBox.innerHTML = "Loading...";

    try {
        const res = await fetch("https://prod-27.southindia.logic.azure.com:443/workflows/85f75962d39548859fb6ae15c2000ab8/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=5B0NUteoK_x67gzDOsJImwHOmorHMIZGmnqVityqo_8", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: [{ role: "user", content: userInput }] })
        });

        const data = await res.json();
        responseBox.innerHTML = data.response || "No response received.";
    } catch (error) {
        responseBox.innerHTML = "Error: " + error.message;
    }
}
