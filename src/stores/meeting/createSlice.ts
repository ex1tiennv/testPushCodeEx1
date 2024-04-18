import { ResolutionType } from '@/constants/resolution'
import { ICreateMeeting, IMeetingResolution } from '@/stores/meeting/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ICreateMeeting = {
    title: '',
    meetingLink: '',
    note: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    endVotingTime: new Date().toISOString(),
    meetingMinutes: [],
    meetingInvitations: [],
    resolutions: [
        {
            title: '',
            description: '',
            files: [],
            type: ResolutionType.RESOLUTION,
        },
    ],
    amendmentResolutions: [
        {
            title: '',
            description: '',
            files: [],
            oldDescription: '',
            type: ResolutionType.AMENDMENT_RESOLUTION,
        },
    ],
    participants: [],
}

// export const getLastPriceList = createAsyncThunk<
//     LastPrice[],
//     { chainId: SupportedChainId },
//     {
//         rejectValue: FetchError
//     }
// >('price/getLastPriceList', async ({ chainId }, { rejectWithValue }) => {
//     try {
//         const lastPriceList = await servicePrice.getLastPrice(chainId)
//         return lastPriceList.map((lastPrice) => {
//             const token = getTokenFromLevelKey(lastPrice.token, chainId)
//             return {
//                 token: { ...token },
//                 price: lastPrice.price,
//                 time: lastPrice.time,
//             }
//         })
//     } catch (error) {
//         const err = error as AxiosError
//         return rejectWithValue({
//             errorMessage: err.response?.data.message,
//             errorCode: err.response?.data.code,
//         })
//     }
// })

export const meetingCreateSlice = createSlice({
    name: 'meetingCreateSlice',
    initialState,
    reducers: {
        updateCreateMeetingInformation: (
            state: ICreateMeeting,
            action: PayloadAction<ICreateMeeting>,
        ) => {
            // state.title = action.payload.title
            // state.link = action.payload.link]
            return action.payload
        },

        updateCreateMeetingResolution: (
            state: ICreateMeeting,
            action: PayloadAction<{ data: IMeetingResolution; index: number }>,
        ) => {
            // state.title = action.payload.title
            // state.link = action.payload.link]
            state.resolutions[action.payload.index] = action.payload.data
        },
        resetCreateMeetingData: () => {
            return initialState
        },
    },
})

export const {
    updateCreateMeetingInformation,
    updateCreateMeetingResolution,
    resetCreateMeetingData,
} = meetingCreateSlice.actions

export default meetingCreateSlice.reducer
