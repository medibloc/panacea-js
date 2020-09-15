import {Client} from './Client';
import { APIS } from '../config/default';
import {Transaction} from '../tx';

const { GOVERNANCE } = APIS;

export class Governance extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getProposals = this.getProposals.bind(this);
    this.getProposal = this.getProposal.bind(this);
    this.getProposer = this.getProposer.bind(this);
    this.getProposalDeposit = this.getProposalDeposit.bind(this);
    this.getProposalDepositFromDepositor = this.getProposalDepositFromDepositor.bind(this);
    this.getProposalVotes = this.getProposalVotes.bind(this);
    this.getProposalVoteFromVoter = this.getProposalVoteFromVoter.bind(this);
    this.getProposalTally = this.getProposalTally.bind(this);
    this.getGovDepositParams = this.getGovDepositParams.bind(this);
    this.getGovTallyParams = this.getGovTallyParams.bind(this);
    this.getGovVoteParams = this.getGovVoteParams.bind(this);
    this.generateProposalTx = this.generateProposalTx.bind(this);
    this.generateDepositToProposalTx = this.generateDepositToProposalTx.bind(this);
    this.generateVoteToProposalTx = this.generateVoteToProposalTx.bind(this);
  }

  /**
   * GET
   * */
  getProposals(opts = { voter: '', depositor: '', status: '' }): any {
    return this.getRequest(GOVERNANCE.proposals, [], opts);
  }

  getProposal(proposalId: string): any {
    return this.getRequest(GOVERNANCE.proposal, [proposalId]);
  }

  getProposer(proposalId: string): any {
    return this.getRequest(GOVERNANCE.proposer, [proposalId]);
  }

  getProposalDeposit(proposalId: string): any {
    return this.getRequest(GOVERNANCE.proposalDeposit, [proposalId]);
  }

  getProposalDepositFromDepositor(proposalId: string, depositorAddr: string): any {
    return this.getRequest(GOVERNANCE.proposalDepositFromDepositor, [proposalId, depositorAddr]);
  }

  getProposalVotes(proposalId: string): any {
    return this.getRequest(GOVERNANCE.proposalVotes, [proposalId]);
  }

  getProposalVoteFromVoter(proposalId: string, voterAddr: string): any {
    return this.getRequest(GOVERNANCE.proposalVoteFromVoter, [proposalId, voterAddr]);
  }

  getProposalTally(proposalId: string): any {
    return this.getRequest(GOVERNANCE.proposalTally, [proposalId]);
  }

  getGovDepositParams(): any {
    return this.getRequest(GOVERNANCE.depositParams);
  }

  getGovTallyParams(): any {
    return this.getRequest(GOVERNANCE.tallyParams);
  }

  getGovVoteParams(): any {
    return this.getRequest(GOVERNANCE.voteParams);
  }

  /**
   * POST
   * */
  generateProposalTx(tx: Transaction): any {
    return this.postRequest(GOVERNANCE.proposals, [], tx);
  }

  generateDepositToProposalTx(proposalId: string, tx: Transaction): any {
    return this.postRequest(GOVERNANCE.proposalDeposit, [proposalId], tx);
  }

  generateVoteToProposalTx(proposalId: string, tx: Transaction): any {
    return this.postRequest(GOVERNANCE.proposalVotes, [proposalId], tx);
  }
}
