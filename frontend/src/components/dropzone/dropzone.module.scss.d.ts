declare namespace DropzoneModuleScssNamespace {
  export interface IDropzoneModuleScss {
    modal: string;
    modal__body: string;
    modal__col: string;
    modal__icon: string;
    'modal__icon--blue': string;
    'modal__icon-sdo10': string;
    'modal__icon-sdo14': string;
    'modal__icon-sdo69': string;
    sdo: string;
  }
}

declare const DropzoneModuleScssModule: DropzoneModuleScssNamespace.IDropzoneModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DropzoneModuleScssNamespace.IDropzoneModuleScss;
};

export = DropzoneModuleScssModule;
