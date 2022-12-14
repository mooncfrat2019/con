import React, {ReactElement} from 'react';

export interface Hooks {
    erase: (boolean | React.Dispatch<React.SetStateAction<boolean>>)[];
    edit: (boolean | React.Dispatch<React.SetStateAction<boolean>>)[];
    undefined: (boolean | (() => boolean))[];
}

export interface FunctionListForMenu {
    erase: () => void;
    edit: () => void;
    download: () => void;
    clear: () => void;
}

export interface IconList {
    erase: ReactElement<any, any>,
    edit: ReactElement<any, any>,
    download: ReactElement<any, any>,
    clear: ReactElement<any, any>,
}
