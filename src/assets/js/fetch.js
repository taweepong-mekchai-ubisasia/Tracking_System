export default function call(type, vm, url, obj, callback) {
  return type == "GET" ? GET(vm, url, callback) : SET(vm, url, obj, callback);
}

async function GET(vm, url, callback) {
  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vm.user_token}`,
      },
    });
    // console.log(resp);
    let total = resp.headers.get("content-length");
    let reader = await resp.body.getReader();
    const decoder = new TextDecoder();
    var bytesReceived = 0;
    const chunks = [];
    let res = await reader.read().then(function processResult(result) {
      if (result.done) {
        try {
          return JSON.parse(chunks.join(""));
        } catch (error) {
          console.log(error);
          return {
            success: false,
            errorMsg: "Invalid Response Format Error.",
          };
        }
      }
      bytesReceived += result.value.length;
      console.log(`Received ${bytesReceived} bytes of data so far`);
      const chunk = decoder.decode(result.value, { stream: true });
      chunks.push(chunk);
      vm.base.loading_percent =
        (parseFloat(bytesReceived) / parseFloat(total)) * 100;
      return reader.read().then(processResult);
    });
    callback({ ...res });
  } catch (err) {
    console.log(err);
    callback({
      success: false,
      errorMsg: err,
    });
  }
}

async function SET(vm, url, callback) {
  try {
    const resp = await fetch(url, {
      method: vm.base.controll == "create" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vm.user_token}`,
      },
      body: JSON.stringify(obj),
    });
    console.log(resp);
    let total = resp.headers.get("content-length");
    let reader = await resp.body.getReader();
    const decoder = new TextDecoder();
    var bytesReceived = 0;
    const chunks = [];
    let res = await reader.read().then(function processResult(result) {
      if (result.done) {
        try {
          return JSON.parse(chunks.join(""));
        } catch (error) {
          console.log(error);
          return {
            success: false,
            errorMsg: "Invalid Response Format Error.",
          };
        }
      }
      bytesReceived += result.value.length;
      console.log(`Received ${bytesReceived} bytes of data so far`);
      const chunk = decoder.decode(result.value, { stream: true });
      chunks.push(chunk);
      vm.base.loading_percent =
        (parseFloat(bytesReceived) / parseFloat(total)) * 100;
      return reader.read().then(processResult);
    });

    callback({ ...res });
  } catch (err) {
    console.log(err);
    callback({
      success: false,
      errorMsg: err,
    });
  }
}
