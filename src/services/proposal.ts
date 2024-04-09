import { post } from './fetcher'
import { VoteProposalOption } from '@/constants/resolution'
import { IProposal } from '@/stores/meeting/types'

const serviceProposal = {
    voteProposal: async (proposalId: number, option: VoteProposalOption) => {
        const response = await post<IProposal>(
            `/proposals/vote/${proposalId}?result=${option}`,
        )
        return response.data
    },
}

export default serviceProposal
