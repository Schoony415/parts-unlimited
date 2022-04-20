import {TableColumns} from "./TableColumns";
import {CSSProperties, HTMLProps} from "react";
import {PropsAndStyle} from "./PropsAndStyle";

export type TableCoreProps<T> = {
    tableColumns: TableColumns<T>[];
    tableRows: T[];
    table?: PropsAndStyle;
    header?: PropsAndStyle;
    footer?: PropsAndStyle;
}
