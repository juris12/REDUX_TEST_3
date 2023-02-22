import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const categorysAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = categorysAdapter.getInitialState()

export const categorysApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategorys: builder.query({
            query: () => ({
                url: '/category',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedCategorys = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return categorysAdapter.setAll(initialState, loadedCategorys)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Category', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Category', id }))
                    ]
                } else return [{ type: 'Category', id: 'LIST' }]
            }
        }),
        addNewNote: builder.mutation({
            query: initialNote => ({
                url: '/category',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: [
                { type: 'Category', id: "LIST" }
            ]
        }),
        updateNote: builder.mutation({
            query: initialNote => ({
                url: '/category',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: `/category`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCategorysQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = categorysApiSlice

// returns the query result object
export const selectCategorysResult = categorysApiSlice.endpoints.getCategorys.select()

// creates memoized selector
const selectCategorysData = createSelector(
    selectCategorysResult,
    categorysResult => categorysResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCategorys,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the categorys slice of state
} = categorysAdapter.getSelectors(state => selectCategorysData(state) ?? initialState)