import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const vndToUsd = (vndAmount) => (vndAmount / 23000).toFixed(2);

const PayPalButton = ({ amount, onSuccess }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AZUX4JxpgUbsBMZlbHYkrocFL8WrbXkSpU5Kt0VLGboGAkr7w-JMbo5PqVi-LelRRnWrOshQUoWXTO_W" }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: vndToUsd(amount), // Chuyển đổi từ VND sang USD
                                    currency_code: "USD",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onSuccess(details); // Callback khi thanh toán thành công
                    });
                }}
                onError={(err) => {
                    console.error("Payment error:", err);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
