import { createApi } from '@reduxjs/toolkit/query/react';

import { getSocket } from '../../adapters/socket.adapter';
import { MOVIES_UPDATE } from '../../events/events.external';
import { IMovie } from '../../types/movie';
import { axiosBaseQuery } from '../../utils/rtk-axios';

export const moviesAPI = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.API_URL}/api` }),
  endpoints: (builder) => ({
    fetchMovies: builder.query<IMovie[], void>({
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on('connect', () => {
            console.log('on connect');
          });

          socket.on(MOVIES_UPDATE, (data: string) => {
            const movies = JSON.parse(data);
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...movies);
            });
          });

          await cacheEntryRemoved;
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
      providesTags: ['Movies'],
      query: () => ({
        method: 'GET',
        url: '/movies',
      }),
    }),
  }),
  reducerPath: 'moviesAPI',
  tagTypes: ['Movies'],
});

export const { useFetchMoviesQuery } = moviesAPI;
