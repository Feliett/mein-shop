paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: { value: "20.00" }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert("Zahlung erfolgreich! Danke, " + details.payer.name.given_name);
        });
    }
}).render("#paypal-button-container");
