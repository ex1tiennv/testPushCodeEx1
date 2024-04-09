// import { Cookies } from 'react-cookie'
import { get } from './fetcher'
import {
    MeetingFileType,
    MeetingFileTypeToFolderName,
} from '@/constants/meeting'
import { IUploadResponse } from './response.type'
import axios from 'axios'
import {
    AccountFileType,
    AvatarFileTypeToFolderName,
} from '@/constants/account'
// const cookies = new Cookies()

const serviceUpload = {
    getPresignedUrl: async (
        files: File[],
        fileType: MeetingFileType,
    ): Promise<IUploadResponse> => {
        const response: { data: IUploadResponse } = await get('/s3', {
            meetingFiles: files.map((file) => ({
                fileName: file.name,
                fileType: MeetingFileTypeToFolderName[fileType],
            })),
        })
        return response.data
    },

    uploadFile: async (file: File, uploadUrl: string) => {
        const headers = {
            'Content-Type': file.type,
        }

        const axiosInstance = axios.create()
        const response = await axiosInstance.request({
            method: 'PUT',
            data: file,
            url: uploadUrl,
            headers,
        })

        return response.data
    },

    getPresignedUrlAvatar: async (
        files: File[],
        fileType: AccountFileType,
        userInfo: string,
    ): Promise<IUploadResponse> => {
        const response: { data: IUploadResponse } = await get('/s3', {
            meetingFiles: files.map((file) => ({
                fileName: userInfo + file.name,
                fileType: AvatarFileTypeToFolderName[fileType],
            })),
        })
        return response.data
    },
}

export default serviceUpload
