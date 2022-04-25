const BigNumber = require("bignumber.js");
const {Finding, FindingSeverity, FindingType } = require("forta-agent");
const {
    Agent_ADDRESS,
  Create_Agent_FUNCTION,
} = require("./constants");

 function provideHandleTransaction() {
  return async function handleTransaction(txEvent) {
    const findings = [];

    // filter the transaction createAgent function calls
    const createAgentInvocations = txEvent.filterFunction(
      Create_Agent_FUNCTION,
      Agent_ADDRESS
    );

    // fire alerts for each function call
    createAgentInvocations.forEach((transferFromInvocation) => {
       
      findings.push(
        Finding.fromObject({
          name: "Agent detected",
          description: `Detects when another agent is created`,
          alertId: "FORTA-13",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          protocol: "forta",
          metadata: {
            // by: txEvent.from,
            // from: transferFromInvocation.args.from,
            // to: transferFromInvocation.args.to,
            // amount: formattedAmount,
            //agentId: txEvent.,
            owner: txEvent.from,
            // metadata: 
            
          },
        })
      );
    });

    return findings;
  };
}

module.exports =  {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};