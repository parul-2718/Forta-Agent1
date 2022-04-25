const createAgent = require("./create.function");

let findingsCount = 0;

function provideHandleTransaction(
  createAgent
) {
  return async function handleTransaction(txEvent) {
    // limiting this agent to emit only 5 findings so that the alert feed is not spammed
    if (findingsCount >= 5) return [];

    const findings = (
      await Promise.all([
        createAgent.handleTransaction(txEvent)
      ])
    ).flat();

    findingsCount += findings.length;
    return findings;
  };
}

module.exports = {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(
    createAgent
  ),
};