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
    created_at: string;
    modified_at: string;
    size: number;
}

export type SortingPanelProps = {
  sorting: SortingParams;
  setSorting: React.Dispatch<React.SetStateAction<SortingParams>>;
}