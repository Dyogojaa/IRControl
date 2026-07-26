import type { ReactNode } from "react";

export interface SummaryItem {

    label: string;

    value: number;

    highlight?: boolean;

}

export interface SummaryCardProps {

    title: string;

    icon?: ReactNode;

    items: SummaryItem[];

}