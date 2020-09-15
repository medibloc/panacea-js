import Client from './Client';
import { APIS } from '../config/default';

const { GOVERNANCE } = APIS;

export default class Governance extends Client {
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
  //TODO @youngjoon-lee: use a proper type for Promise
  getProposals(opts = { voter: '', depositor: '', status: '' }): Promise<any> {
    return this.getRequest(GOVERNANCE.proposals, null, opts);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getProposal(proposalId: string): Promise<any> {
    return this.getRequest(GOVERNANCE.proposal, [proposalId]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getProposer(proposalId: string): Promise<any> {
    return this.getRequest(GOVERNANCE.proposer, [proposalId]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getProposalDeposit(proposalId: string): Promise<any> {
    return this.getRequest(GOVERNANCE.proposalDeposit, [proposalId]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getProposalDepositFromDepositor(proposalId: string, depositorAddr: string): Promise<any> {
    return this.getRequest(GOVERNANCE.proposalDepositFromDepositor, [proposalId, depositorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getProposalVotes(proposalId: string): Promise<any> {
    return this.getRequest(GOVERNANCE.proposalVotes, [proposalId]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getProposalVoteFromVoter(proposalId: string, voterAddr: string): Promise<any> {
    return this.getRequest(GOVERNANCE.proposalVoteFromVoter, [proposalId, voterAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getProposalTally(proposalId: string): Promise<any> {
    return this.getRequest(GOVERNANCE.proposalTally, [proposalId]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getGovDepositParams(): Promise<any> {
    return this.getRequest(GOVERNANCE.depositParams);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getGovTallyParams(): Promise<any> {
    return this.getRequest(GOVERNANCE.tallyParams);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getGovVoteParams(): Promise<any> {
    return this.getRequest(GOVERNANCE.voteParams);
  }

  /**
   * POST
   * */
  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateProposalTx(tx: any): Promise<any> {
    return this.postRequest(GOVERNANCE.proposals, null, tx);
  }

  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateDepositToProposalTx(proposalId: string, tx: any): Promise<any> {
    return this.postRequest(GOVERNANCE.proposalDeposit, [proposalId], tx);
  }

  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateVoteToProposalTx(proposalId: string, tx: any): Promise<any> {
    return this.postRequest(GOVERNANCE.proposalVotes, [proposalId], tx);
  }
}
