import React from "react";
import {TableCoreProps} from "./types/TableCoreProps";
import {TableColumns} from "./types/TableColumns";


/**
 * Table rendering functional component
 * @type T: the data type going into the table row
 *  @param props: @type {TableCoreProps}
 */
export default function TableCore<T>(props: TableCoreProps<T>): JSX.Element {
    const {tableColumns, tableRows, table, header, footer} = props;

    let hasFooter = false;
    tableColumns.forEach((column) => {
        if (column.tableFooter) {
            hasFooter = true;
        }
    })
    // const footerStyle: CSSProperties = {borderTop: '0.125rem ridge black',}

    const RenderTableCell = (column: TableColumns<T>, data: T): React.ReactNode => {
        if (column.attribute) {
            // Devnote it just works
            return data[column.attribute]
        }
        if (column.cellRender) {
            return column.cellRender(data)
        }
        throw new Error("Didn't specify attribute or render for column.")
    }

    return (<table style={{border: '0.0625rem solid black', ...table?.style}} {...table?.props}>
        <thead>
        <tr key={"header"}>
            {tableColumns.map(column =>
                <th
                    key={"head" + column.headerTitle}
                    style={{
                        padding: '0.5rem 1rem',
                        borderBottom: '0.125rem ridge black',
                        ...column.column?.style,
                        ...header?.style,
                        ...column.header?.style,
                    }}
                    {...column.column?.props}
                    {...header?.props}
                    {...column.header?.props}
                >
                    {column.headerTitle}
                </th>
            )}
        </tr>
        </thead>
        <tbody>
        {tableRows.map((data, i) =>
            <tr key={"tr" + i} style={{backgroundColor: (i % 2 > 0) ? "#eee" : "inherit"}}>
                {tableColumns.map((column, j) =>
                    <td
                        key={"" + column.headerTitle + i + ":" + j}
                        style={{
                            padding: " 0.5rem",
                            ...column.column?.style,
                        }}
                        {...column.column?.props}
                    >
                        {RenderTableCell(column, data)}
                    </td>
                )}
            </tr>
        )}
        </tbody>
        {hasFooter && <tfoot>
        <tr key={"footer"}> {
            tableColumns.map((column, i) =>
                <td key={"foot" + i}
                    style={{
                        borderTop: '0.125rem ridge black',
                        ...column.column?.style,
                        ...footer?.style,
                        ...column.footer?.style,
                    }}
                    {...column.column?.props}
                    {...footer?.props}
                    {...column.footer?.props}
                >
                    {column.tableFooter &&
                    column.tableFooter(tableRows)}
                </td>
            )
        } </tr>
        </tfoot>}
    </table>)
}
