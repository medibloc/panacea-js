import Client from './Client';
import { APIS } from '../../config';

const { GOVERNANCE } = APIS;

class Governance extends Client {
  /**
   * GET
   * */
  getProposals(opts = { voter: '', depositor: '', status: '' }) {
    return this.getRequest(GOVERNANCE.proposals, null, opts);
  }

  getProposal(proposalId) {
    return this.getRequest(GOVERNANCE.proposal, [proposalId]);
  }

  getProposer(proposalId) {
    return this.getRequest(GOVERNANCE.proposer, [proposalId]);
  }

  getProposalDeposit(proposalId) {
    return this.getRequest(GOVERNANCE.proposalDeposit, [proposalId]);
  }

  getProposalDepositFromDepositor(proposalId, depositorAddr) {
    return this.getRequest(GOVERNANCE.proposalDepositFromDepositor, [proposalId, depositorAddr]);
  }

  getProposalVotes(proposalId) {
    return this.getRequest(GOVERNANCE.proposalVotes, [proposalId]);
  }

  getProposalVoteFromVoter(proposalId, voterAddr) {
    return this.getRequest(GOVERNANCE.proposalVoteFromVoter, [proposalId, voterAddr]);
  }

  getProposalTally(proposalId) {
    return this.getRequest(GOVERNANCE.proposalTally, [proposalId]);
  }

  getGovDepositParams() {
    return this.getRequest(GOVERNANCE.depositParams);
  }

  getGovTallyParams() {
    return this.getRequest(GOVERNANCE.tallyParams);
  }

  getGovVoteParams() {
    return this.getRequest(GOVERNANCE.voteParams);
  }

  /**
   * POST
   * */
  generateProposalTx(tx) {
    return this.postRequest(GOVERNANCE.proposals, null, tx);
  }

  generateDepositToProposalTx(proposalId, tx) {
    return this.postRequest(GOVERNANCE.proposalDeposit, [proposalId], tx);
  }

  generateVoteToProposalTx(proposalId, tx) {
    return this.postRequest(GOVERNANCE.proposalVotes, [proposalId], tx);
  }
}

export default Governance;
