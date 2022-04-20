import {CSSProperties, HTMLProps, ReactNode} from "react";
import {PropsAndStyle} from "./PropsAndStyle";

export type TableColumns<T> = {
    headerTitle: string;
    attribute?: string;
    cellRender?: (tableRow: T) => ReactNode;
    tableFooter?: (tableRows: T[]) => ReactNode;
    header?: PropsAndStyle;
    column?: PropsAndStyle;
    footer?: PropsAndStyle;
}
