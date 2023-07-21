import { useState } from "react";
import styles from "./CalculatorForm.module.css";

const CalculatorForm = (props) => {
  const [currentSavings, setCurrentSavings] = useState("");
  const [yearlySavings, setYearlySavings] = useState("");
  const [expectedInterest, setExpectedInterest] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");

  const resetClickHandler = () => {
    setCurrentSavings("");
    setYearlySavings("");
    setExpectedInterest("");
    setInvestmentDuration("");
  };

  const calculateSubmitHandler = (event) => {
    event.preventDefault();
    const userInput = {
      CurrentSavings: +currentSavings,
      YearlySavings: +yearlySavings,
      ExpectedInterest: +expectedInterest,
      InvestmentDuration: +investmentDuration,
    };
    props.calculateHandler(userInput);
  };

  const inputChangeHandler = (input, value) => {
    switch (input) {
      case "current-savings":
        setCurrentSavings(value);
        break;

      case "yearly-contribution":
        setYearlySavings(value);
        break;

      case "expected-return":
        setExpectedInterest(value);
        break;

      case "duration":
        setInvestmentDuration(value);
        break;

      default:
        break;
    }
  };


  return (
    <form className={styles.form} onSubmit={calculateSubmitHandler}>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            value={currentSavings}
            onChange={(event) => {
              inputChangeHandler("current-savings", event.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            value={yearlySavings}
            onChange={(event) => {
              inputChangeHandler("yearly-contribution", event.target.value);
            }}
          />
        </p>
      </div>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            value={expectedInterest}
            onChange={(event) => {
              inputChangeHandler("expected-return", event.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={investmentDuration}
            onChange={(event) => {
              inputChangeHandler("duration", event.target.value);
            }}
          />
        </p>
      </div>
      <p className={styles.actions}>
        <button
          type="reset"
          className={styles.buttonAlt}
          onClick={resetClickHandler}
        >
          Reset
        </button>
        <button type="submit" className={styles.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default CalculatorForm;
