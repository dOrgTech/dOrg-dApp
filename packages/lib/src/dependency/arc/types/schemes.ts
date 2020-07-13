import { VotingMachine } from "./index";
import { Address } from "../../../dependency/web3";

export enum SchemeType {
  ContributionReward,
  SchemeFactory,
}

export interface Scheme {
  type: SchemeType;
  permissions: string;
}

export interface ProposalScheme extends Scheme {
  votingMachine: VotingMachine;
}

export class ContributionReward implements ProposalScheme {
  type = SchemeType.ContributionReward;
  permissions: string = "0x00000000";
  votingMachine: VotingMachine;

  constructor(votingMachine: VotingMachine) {
    this.votingMachine = votingMachine;
  }
}

export class SchemeFactory implements ProposalScheme {
  type = SchemeType.SchemeFactory;
  permissions: string = "0x0000001F";
  votingMachine: VotingMachine;

  constructor(votingMachine: VotingMachine) {
    this.votingMachine = votingMachine;
  }
}
