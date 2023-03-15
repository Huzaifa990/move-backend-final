import React from "react";
import visa from "../../img/visa.svg";
import { InputMask } from "primereact/inputmask";
import master from "../../img/mastercard.svg";
import cancel from "../../img/remove.png";

export default function CarListingDump() {
  function togglePopupCredit() {
    const popupContainer = document.getElementById("popCredit");
    if (popupContainer.style.display === "block") {
      popupContainer.style.display = "none";
    } else {
      popupContainer.style.display = "block";
    }
  }

  function logoChange() {
    var cardNum = document.getElementById("cc-1").value;
    if (cardNum[0] === "5") {
      document.getElementById("visaLogo").style.visibility = "hidden";
      document.getElementById("visaLogo").style.position = "absolute";
    } else if (cardNum[0] === "4") {
      document.getElementById("masterLogo").style.visibility = "hidden";
      document.getElementById("masterLogo").style.position = "absolute";
    } else {
      document.getElementById("masterLogo").style.visibility = "visible";
      document.getElementById("masterLogo").style.position = "relative";
      document.getElementById("visaLogo").style.visibility = "visible";
      document.getElementById("visaLogo").style.position = "relative";
    }
  }

  function toggleOffCredit() {
    const popupContainer = document.getElementById("popCredit");
    popupContainer.style.display = "none";
  }

  return (
    <div>
      <div class="popup-container-credit" id="popCredit">
        <div class="popup-credit">
          <img
            src={cancel}
            style={{ width: "35px", cursor: "pointer", marginLeft: "100%" }}
            onClick={toggleOffCredit}
            alt="button close"
          />
          <div className="popup-credit-flex">
            <h1 className="card-section-heading">Enter Card Details</h1>
            <form className="credit-card">
              <div className="front">
                <div className="card-data-row">
                  <div className="brand-name">Card Details</div>
                  <img data-logo src={visa} id="visaLogo" alt="card" className="card-logo" />
                  <img data-logo src={master} id="masterLogo" alt="card" className="card-logo" />
                </div>
                <fieldset className="form-group">
                  <legend>Card Number</legend>
                  <label for="cc-1">Card Number</label>
                  <div data-connected-inputs className="cc-inputs horizontal-input-stack">
                    <InputMask
                      type="tel"
                      aria-label="Credit Card First 4 Digits"
                      id="cc-1"
                      mask="9999 9999 9999 9999"
                      placeholder="1234 1234 1234 1234"
                      required
                      onChange={logoChange}
                    />
                  </div>
                </fieldset>
                <div className="input-row">
                  <fieldset className="form-group">
                    <legend>Expiration</legend>
                    <label for="expiration-month">Expiration</label>
                    <div className="horizontal-input-stack">
                      <select id="expiration-month" aria-label="Expiration Month" required>
                        <option>01</option>
                        <option>02</option>
                        <option selected>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </select>
                      <select
                        id="expiration-year"
                        aria-label="Expiration Year"
                        required
                        data-expiration-year
                      >
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2035</option>
                      </select>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="back">
                <div className="stripe"></div>
                <div className="form-group cvc-group">
                  <label for="cvc">CVC</label>
                  <input
                    className="cvc-input"
                    type="tel"
                    maxlength="3"
                    id="cvc"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </form>
            <button className="btn" style={{ background: "#f77d0a" }} id="btn-credit">
              Proceed
            </button>
          </div>
        </div>
      </div>

      <button onClick={togglePopupCredit}>Toggle</button>
    </div>
  );
}
