const logEntries: string[] = [];
const maxLogEntries = 10;

function refreshLogList() {
  const logList = document.querySelector("#loglist");
  // console.log('current logs', logEntries);
  (logList as any).innerText = logEntries.join("\n");
  // console.log();
}

export function appendToLog(entry: string) {
  if (logEntries.length >= maxLogEntries) {
    logEntries.splice(0, 1);
  }
  logEntries.push(entry);
  refreshLogList();
}
