import { z } from 'zod'
import {useEffect, useState} from "react";

export const NoteScheme = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    userId: z.string(),
    createdAt: z.number()
})

export type Note = z.infer<typeof NoteScheme>

export const NoteList = z.array(NoteScheme)

export type NoteList = z.infer<typeof NoteList>

export const FetchNoteListScheme = z.object({
    list: NoteList
})
export type FetchNoteListResponse = z.infer<typeof FetchNoteListScheme>

export function fetchNoteList(): Promise<FetchNoteListResponse> {
    return fetch('/api/notes')
        .then((response) => response.json())
        .then((data) => FetchNoteListScheme.parse(data))
}

interface IdleRequestState {
    status: 'Idle'
}
interface LoadingRequestState {
    status: 'pending'
}
interface SuccessRequestState {
    status: 'success',
    data: NoteList
}
interface ErrorRequestState {
    status: 'error',
    error: unknown
}

type RequestState =
    | IdleRequestState
    | LoadingRequestState
    | SuccessRequestState
    | ErrorRequestState

export function useNoteList() {
    const [state, setState] = useState<RequestState>({ status: 'Idle' })

    useEffect(() => {
        if (state.status === 'pending') {
            fetchNoteList()
                .then((data) => {
                    setState({status: 'success', data: data.list})
                })
                .catch((error) => {
                    setState({status: 'error', error})
                })
        }

    }, [state])

    useEffect(() => {
        setState({status: 'pending'})
    }, []);

    const refetch = () => {
        setState({status: 'pending'})
    }

    return {
        state,
        refetch
    }
}