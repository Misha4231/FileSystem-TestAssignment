import type React from "react";

export type SortingParams = {
  sort: string;
  reverse: boolean;
}

export type FileBrowserProps = {
  path: string;
  sorting: SortingParams
}

export type File = {
    content: string;
    created_at?: string | undefined;
    modified_at?: string | undefined;
    size?: number | undefined;
}

export type SortingPanelProps = {
  sorting: SortingParams;
  setSorting: React.Dispatch<React.SetStateAction<SortingParams>>;
}