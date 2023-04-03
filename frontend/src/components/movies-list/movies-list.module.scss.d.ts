declare namespace MoviesListModuleScssNamespace {
  export interface IMoviesListModuleScss {
    list: string;
    'list-wrapper': string;
    video: string;
  }
}

declare const MoviesListModuleScssModule: MoviesListModuleScssNamespace.IMoviesListModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MoviesListModuleScssNamespace.IMoviesListModuleScss;
};

export = MoviesListModuleScssModule;
