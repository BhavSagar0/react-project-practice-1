import styles from "./ResultTable.module.css";

const ResultTable = (props) => {
  if (props.yearlyTableData.length === 0) {
    return <h2 className={styles["no-data-text"]}>No data to show</h2>;
  }

  return (
    <table className={styles.result}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.yearlyTableData.map((tableEntry) => {
          return (
            <tr key={tableEntry.year}>
              <td>{tableEntry.year}</td>
              <td>{props.formatter.format(tableEntry.savingsEndOfYear)}</td>
              <td>{props.formatter.format(tableEntry.yearlyInterest)}</td>
              <td>
                {props.formatter.format(
                  tableEntry.savingsEndOfYear -
                    props.initialInvestment -
                    tableEntry.yearlyContribution * tableEntry.year
                )}
              </td>
              <td>
                {props.formatter.format(
                  props.initialInvestment +
                    tableEntry.yearlyContribution * tableEntry.year
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResultTable;
