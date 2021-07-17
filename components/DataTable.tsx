import { useTable, useSortBy } from 'react-table'
import { useMemo } from 'react'
import Download from '../components/Download'
import Delete from '../components/Delete'

//https://flatlogic.com/blog/react-table-guide-and-best-react-table-examples/#fourteen
const DataTable = (props) => {

  const columns = useMemo(
    () => [
      {
        Header: 'ファイル名',
        accessor: 'name',
        Cell: row => (
          <div style={{ textAlign: 'left' }}>{row.value}</div>
        )
      },
      {
        Header: 'ファイル種別',
        accessor: 'contentType',
        Cell: row => (
          <div style={{ textAlign: 'left' }}>{row.value}</div>
        )
      },
      {
        Header: 'ファイルサイズ',
        accessor: 'size',
        Cell: row => (
          <div style={{ textAlign: 'right' }}>{row.value}</div>
        )
      },
      {
        Header: '更新日',
        accessor: 'updated',
        Cell: row => (
          <div style={{ textAlign: 'center' }}>{row.value}</div>
        )
      },
      {
        Header: '有効期限',
        accessor: 'expireDate',
        Cell: row => (
          <div style={{ textAlign: 'center' }}>{row.value}</div>
        )
      },
      {
        Header: 'アップロードユーザー',
        accessor: 'user',
        Cell: row => (
          <div style={{ textAlign: 'left' }}>{row.value}</div>
        )
      },
      {
        Header: '',
        accessor: 'filePath',
        Cell:  v => (
          <div className='buttons'>
            <Download file={v.value} />
            <Delete file={v.value} changeState={props.changeState}/>
          </div>
        )
      }
    ],[]
  )

  const data = props.data
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ 
    columns,
    data,
    initialState: {
      sortBy: [
          {
              id: 'updated',
              desc: true
          }
      ]
    }
  }, useSortBy)

  return (
    <div>
      <table {...getTableProps()} style={{ borderColor: 'grey' }}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? '▼'
                      : '▲'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      borderColor: 'grey',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
