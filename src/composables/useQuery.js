// src/composables/useQuery.js
import { ref } from "vue";

let store = null;

export function configureQuery(storeInstance) {
  store = storeInstance;
}

export async function fetchQuery(
  obj,
  method,
  path,
  body = null,
  callback = null
) {
  if (!store) {
    throw new Error("Store is not configured");
  }

  const user_token = store.state.base.user_token;
  const serviceUrl = store.state.base.serviceUrl;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user_token}`,
  };

  const options = {
    method: method,
    headers: headers,
    ...(method.toLowerCase() !== "get" && body
      ? { body: JSON.stringify(body) }
      : {}),
  };

  try {
    const resp = await fetch(`${serviceUrl}${path}`, options);
    let total = resp.headers.get("content-length");
    let reader = await resp.body.getReader();
    const decoder = new TextDecoder();
    let bytesReceived = 0;
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

      if (
        obj.call &&
        obj[obj.call] &&
        obj[obj.call].loading_percent !== undefined
      ) {
        obj[obj.call].loading_percent =
          (parseFloat(bytesReceived) / parseFloat(total)) * 100;
      }

      return reader.read().then(processResult);
    });

    return callback ? callback({ ...res }) : res;
  } catch (err) {
    console.log(err);
    return callback
      ? callback({
          success: false,
          errorMsg: err,
        })
      : { success: false, errorMsg: err };
  }
}

export function buildPath(obj, path) {
  let queryParams = null;
  if (obj) {
    queryParams = new URLSearchParams();
    if (obj.page) queryParams.set("page", obj.page);
    if (obj.row) queryParams.set("rows", obj.row);

    if (obj.getTotal) queryParams.set("total", obj.getTotal);
    if (obj.current) queryParams.set("current", obj.current);
    if (obj.debug) queryParams.set("debug", obj.debug);
    if (obj.search)
      obj.search.forEach((v) => {
        // console.log(v);
        // v.value ? queryParams.set(v.id, encodeURIComponent(v.value)) : "";
        v.value ? queryParams.set(v.id, v.value) : "";
      });
    if (obj.q) queryParams.set("q", encodeURIComponent(obj.q));

    // inventory status
    if (obj.ubis) queryParams.set("ubis", obj.ubis);
    if (obj.code) queryParams.set("code", obj.code);

    // inventory status fix lot
    if (obj.ItemCode) queryParams.set("ItemCode", obj.ItemCode);

    // inventory status planning
    if (obj.planning) queryParams.set("planning", obj.planning);

    // employee & computer
    if (obj.emp) queryParams.set("emp", obj.emp);
    if (obj.group) queryParams.set("group", obj.group);
    if (obj.all) queryParams.set("all", obj.all);
    
    // WH retain
    if (obj.action) queryParams.set("action", obj.action);
    if (obj.forRetain) queryParams.set("forRetain", obj.forRetain);
    if (obj.dbwh) queryParams.set("dbwh", obj.dbwh);
    if (obj.wh) queryParams.set("wh", obj.wh);
    if (obj.type) queryParams.set("type", obj.type);
    if (obj.firstchar) queryParams.set("firstchar", obj.firstchar);
    if (obj.item_code) queryParams.set("item_code", obj.item_code);
    if (obj.short_code) queryParams.set("short_code", obj.short_code);
    if (obj.rack_layout) queryParams.set("rack_layout", obj.rack_layout);
    if (obj.rac_list) queryParams.set("rac_list", obj.rac_list);
    if (obj.item_list) queryParams.set("item_list", obj.item_list);
    if (obj.transref) queryParams.set("transref", obj.transref);
    if (obj.transref_type_null) queryParams.set("transref_type_null", obj.transref_type_null);
    if (obj.noStatus) queryParams.set("noStatus", obj.noStatus);
    if (obj.Order) queryParams.set("Order", obj.Order);
    if (obj.getOrder) queryParams.set("getOrder", obj.getOrder);
    if (obj.sumQuantitys) queryParams.set("sumQuantitys", obj.sumQuantitys);
    if (obj.groupBy) queryParams.set("groupBy", obj.groupBy);
    if (obj.customer) queryParams.set("customer", obj.customer);
    if (obj.batch) queryParams.set("batch", obj.batch);

    // TRR Visitor
    if (obj.findObject) queryParams.set("findObject", obj.findObject);
    if (obj.department) queryParams.set("department", obj.department);

    // ICM Report
    if (obj.descrip) queryParams.set("descrip", obj.descrip);

    // WH Indirect
    if (obj.fromReport) queryParams.set("fromReport", obj.fromReport);
    if (obj.fromItem) queryParams.set("fromItem", obj.fromItem);
    if (obj.fromRequest) queryParams.set("fromRequest", obj.fromRequest);
    if (obj.fromApprove) queryParams.set("fromApprove", obj.fromApprove);
    if (obj.fromIssue) queryParams.set("fromIssue", obj.fromIssue);
    if (obj.fromStock) queryParams.set("fromStock", obj.fromStock);
    if (obj.owner) queryParams.set("owner", obj.owner);
    if (obj.doc) queryParams.set("doc", obj.doc);
    if (obj.status) queryParams.set("status", obj.status);
    if (obj.approve) queryParams.set("approve", obj.approve);
    if (obj.noreject) queryParams.set("noreject", obj.noreject);
    if (obj.first_search) queryParams.set("first_search", obj.first_search);
    if (obj.su) queryParams.set("su", obj.su);
    if (obj.repurchase) queryParams.set("repurchase", obj.repurchase);

    // Expire Date Inspection Report
    if (obj.normal_total) queryParams.set("normal_total", obj.normal_total);
    if (obj.warning_total) queryParams.set("warning_total", obj.warning_total);
    if (obj.expire_total) queryParams.set("expire_total", obj.expire_total);
    if (obj.aging) queryParams.set("aging", obj.aging);
    if (obj.fg) queryParams.set("fg", obj.fg);
    if (obj.rm) queryParams.set("rm", obj.rm);
    if (obj.range) queryParams.set("range", obj.range);

    // WH Internal Management
    if (obj.form_id) queryParams.set("form_id", obj.form_id);
    if (obj.rack_id) queryParams.set("rack_id", obj.rack_id);
    if (obj.item_stock) queryParams.set("item_stock", obj.item_stock);
    if (obj.item_id) queryParams.set("item_id", obj.item_id);
    if (obj.item_owner) queryParams.set("item_owner", obj.item_owner);
    if (obj.not) queryParams.set("not", obj.not);
  }

  return `${path}${queryParams ? "?" + queryParams.toString() : ""}`;
}
