export async function Log(stack, level, packageName, message) {
  const res = await fetch("http://4.224.186.213/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stack,
      level,
      package: packageName,
      message,
    }),
  });
  const data = await res.json();
  console.log(data);
  if (res.status != 200) console.error("Error while logging");
  else console.log("Logged!");
}
