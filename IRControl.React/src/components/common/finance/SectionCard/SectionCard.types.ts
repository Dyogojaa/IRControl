import type { ReactNode } from "react";

export interface SectionCardProps {

    title: string;

    icon?: ReactNode;

    children: ReactNode;

    collapsible?: boolean;

    defaultExpanded?: boolean;

    actions?: ReactNode;

}