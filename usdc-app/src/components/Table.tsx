import 'bootstrap/dist/css/bootstrap.min.css';

interface TableProps {
  data: { [key: string]: number};
}
function Table(props: TableProps) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Total Supplied</th>
          <th>Supply APY %</th>
          <th>Total Borrowed</th>
          <th>Borrowed APY %</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.data.totalSupplied.toFixed(2)}</td>
          <td>{props.data.supplyAPY.toFixed(2)}</td>
          <td>{props.data.totalBorrowed.toFixed(2)}</td>
          <td>{props.data.borrowAPY.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table
